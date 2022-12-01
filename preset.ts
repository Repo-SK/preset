/* eslint-disable multiline-ternary */

interface Options {
  i18n: boolean;
  autoImports: boolean;
  pest: boolean;
  icons: boolean;
}

export default definePreset<Options>({
  name: "laravel:hybridly",
  options: {
    i18n: false,
    autoImports: true,
    pest: true,
    icons: true,
  },
  handler: async ({ options }) => {
    if (options.pest) {
      await applyNestedPreset({
        title: "install Pest",
        preset: "laravel-presets/pest",
      });
    }

    await installBase(options);

    if (options.autoImports) {
      await group({
        title: "install auto-imports",
        handler: async () => await installAutoImports(options),
      });
    }

    if (options.i18n) {
      await group({
        title: "install i18n",
        handler: async () => await installI18n(),
      });
    }
  },
});

async function installBase({ autoImports, i18n, icons }: Options) {
  await deletePaths({
    title: "delete unused project files",
    paths: ["vite.config.js", "resources"],
  });

  await editFiles({
    title: "update .gitignore",
    files: ".gitignore",
    operations: {
      type: "add-line",
      position: "append",
      lines: [
        // Types and I18n
        "resources/types/*.d.ts",
        "!resources/types/hybridly.d.ts",
        "!resources/types/shims-*.d.ts",
        "resources/i18n/locales.json",
      ],
    },
  });

  await extractTemplates({
    title: "extract templates",
    from: "base",
  });

  await editFiles({
    title: "remove unused dependencies",
    files: "package.json",
    operations: {
      type: "edit-json",
      delete: ["devDependencies.lodash"],
    },
  });

  await installPackages({
    title: "add npm dependencies",
    for: "node",
    dev: true,
    packages: [
      "hybridly",
      "axios",
      // Other
      "@types/node",
      "typescript",
      "@headlessui/vue",
      "@heroicons/vue",
      // Vue
      "vue",
      "@vitejs/plugin-vue",
      "@vue/runtime-core",
      "@vueuse/core",
      "@vueuse/head",
      // Vite
      "laravel-vite-plugin",
      "vite-plugin-run",
      // Tailwind CSS
      "autoprefixer",
      "tailwindcss",
      "postcss",
      "@tailwindcss/forms",
      "color",
      // prettier
      "prettier",
      "prettier-plugin-tailwindcss",
      // Auto imports
      ...(autoImports
        ? ["unplugin-auto-import", "unplugin-vue-components"]
        : []),
      // Icons
      ...(icons ? ["unplugin-icons"] : []),
      // i18n
      ...(i18n ? ["@intlify/vite-plugin-vue-i18n", "vue-i18n"] : []),
    ],
  });

  await editFiles({
    title: "configure PostCSS",
    files: "package.json",
    operations: {
      type: "edit-json",
      merge: {
        postcss: {
          plugins: {
            autoprefixer: {},
            tailwindcss: {},
          },
        },
      },
    },
  });

  await editFiles({
    title: "change db driver to sqlite",
    files: ".env",
    operations: [
      {
        type: "update-content",
        update: (content) =>
          content.replace("DB_CONNECTION=mysql", "DB_CONNECTION=sqlite"),
      },
      {
        type: "remove-line",
        match: /DB_HOST/,
        count: 5,
      },
    ],
  });

  await installPackages({
    title: "add php dependencies",
    for: "php",
    packages: [
      "hybridly/laravel",
      "spatie/laravel-data",
      "spatie/laravel-typescript-transformer",
      "laravel/fortify",
    ],
  });

  await executeCommand({
    title: "install Hybridly",
    command: "php",
    arguments: ["artisan", "hybridly:install"],
  });

  await executeCommand({
    title: "publish typescript transformer config",
    command: "php",
    arguments: [
      "artisan",
      "vendor:publish",
      "--tag=typescript-transformer-config",
    ],
  });

  await editFiles({
    title: "update typescript transformer config",
    files: "config/typescript-transformer.php",
    operations: [
      {
        type: "remove-line",
        match:
          /Spatie\\TypeScriptTransformer\\Collectors\\DefaultCollector::class,/,
      },
      {
        type: "add-line",
        match: /'collectors' => \[/,
        position: "after",
        lines: [
          "Hybridly\\Support\\TypeScriptTransformer\\DataResourceTypeScriptCollector::class,",
          "Spatie\\LaravelData\\Support\\TypeScriptTransformer\\DataTypeScriptCollector::class,",
        ],
      },
      {
        type: "remove-line",
        match:
          /Spatie\\LaravelTypeScriptTransformer\\Transformers\\SpatieStateTransformer::class,/,
        count: 3,
      },
      {
        type: "add-line",
        match: /'transformers' => \[/,
        position: "after",
        lines: [
          "Spatie\\LaravelData\\Support\\TypeScriptTransformer\\DataTypeScriptTransformer::class,",
          "Spatie\\TypeScriptTransformer\\Transformers\\EnumTransformer::class,",
        ],
      },
    ],
  });

  await executeCommand({
    title: "publish fortify's resources",
    command: "php",
    arguments: [
      "artisan",
      "vendor:publish",
      "--provider=Laravel\\Fortify\\FortifyServiceProvider",
    ],
  });

  await editFiles({
    title: "add fortify service provider",
    files: "config/app.php",
    operations: {
      type: "add-line",
      match: /App\\Providers\\RouteServiceProvider::class,/,
      position: "after",
      lines: ["App\\Providers\\FortifyServiceProvider::class,"],
    },
  });

  await editFiles({
    title: "register fortify auth views",
    files: "app/Providers/FortifyServiceProvider.php",
    operations: {
      type: "add-line",
      match: /Fortify::createUsersUsing\(CreateNewUser::class\);/,
      position: "before",
      lines: [
        'Fortify::loginView(fn () => hybridly("auth.login"));',
        'Fortify::registerView(fn () => hybridly("auth.register"));',
        'Fortify::verifyEmailView(fn () => hybridly("auth.verify-email"));',
        'Fortify::confirmPasswordView(fn () => hybridly("auth.confirm-password"));',
        'Fortify::requestPasswordResetLinkView(fn () => hybridly("auth.forgot-password"));',
        'Fortify::resetPasswordView(fn () => hybridly("reset-password", [',
        '    "email" => request()->query("email"),',
        '    "token" => request()->route("token")',
        "]));",
      ],
    },
  });

  await executeCommand({
    title: "migrate database",
    command: "php",
    arguments: ["artisan", "migrate"],
  });

  await editFiles({
    title: "update home path in RouteServiceProvider",
    files: "app/Providers/RouteServiceProvider.php",
    operations: [
      {
        type: "update-content",
        update: (content) =>
          content.replace(
            "public const HOME = '/home';",
            "public const HOME = '/';"
          ),
      },
    ],
  });

  await editFiles({
    title: "setup hybridly shared properties",
    files: "app/Http/Middleware/HandleHybridRequests.php",
    operations: [
      {
        type: "add-line",
        match: /use Illuminate\\Http\\Request;/,
        position: "after",
        lines: [
          "use App\\Data\\SecurityData;",
          "use App\\Data\\SharedData;",
          "use App\\Data\\UserData;",
        ],
      },
      {
        type: "remove-line",
        match: /public function share\(Request \$request\): array/,
        count: 5,
        start: 1,
      },
      {
        type: "add-line",
        match: /public function share\(Request \$request\): array/,
        position: "after",
        lines: [
          "{",
          "    return SharedData::from([",
          '        "security" => SecurityData::from([',
          '            "user" => UserData::optional(auth()->user()),',
          "        ]),",
          '        "status" => session("status") // used by fortify',
          "    ]);",
          "}",
        ],
      },
      {
        type: "update-content",
        update: (content) =>
          content.replace(
            "public function share(Request $request): array",
            "public function share(Request $request): SharedData"
          ),
      },
    ],
  });
}

async function installAutoImports({ icons }: Options) {
  await editFiles({
    title: "update vite.config.ts",
    files: "vite.config.ts",
    operations: [
      // add imports
      {
        type: "add-line",
        match: /import hybridly from/,
        position: "after",
        lines: [
          "import hybridlyImports from 'hybridly/auto-imports'",
          "import hybridlyResolver from 'hybridly/resolver'",
          "import autoimport from 'unplugin-auto-import/vite'",
          "import components from 'unplugin-vue-components/vite'",
          ...(icons
            ? [
                "import iconsResolver from 'unplugin-icons/resolver'",
                "import { FileSystemIconLoader } from 'unplugin-icons/loaders'",
                "import icons from 'unplugin-icons/vite'",
              ]
            : []),
        ],
      },
      // configure `autoimport`
      {
        type: "add-line",
        match: /vue\(\)/,
        position: "after",
        lines: [
          "autoimport({",
          "	dts: 'resources/types/auto-imports.d.ts',",
          "	imports: [",
          "		'vue',",
          "		'@vueuse/core',",
          "		'@vueuse/head',",
          "		hybridlyImports,",
          "	],",
          "	vueTemplate: true,",
          "}),",
        ],
      },
      // configure `autoimport`
      {
        type: "add-line",
        match: /vue\(\)/,
        position: "after",
        lines: [
          "components({",
          "	dirs: [",
          "		'./resources/views/components',",
          "	],",
          "	resolvers: [",
          "		hybridlyResolver(),",
          ...(icons
            ? ["		iconsResolver({", "			customCollections: ['custom'],", "		}),"]
            : []),
          "	],",
          "	directoryAsNamespace: true,",
          "	dts: 'resources/types/components.d.ts',",
          "}),",
        ],
      },
      // configure `icons`
      {
        skipIf: () => !icons,
        type: "add-line",
        match: /vue\(\)/,
        position: "after",
        lines: [
          "icons({",
          "	autoInstall: true,",
          "	customCollections: {",
          "		custom: FileSystemIconLoader('./resources/icons'),",
          "	},",
          "}),",
        ],
      },
    ],
  });

  await editFiles({
    title: "add icons definition to tsconfig.json",
    files: "tsconfig.json",
    operations: [
      {
        skipIf: () => !icons,
        type: "add-line",
        match: /"vite\/client"/,
        position: "after",
        lines: '"unplugin-icons/types/vue"',
      },
      {
        skipIf: () => !icons,
        type: "update-content",
        update: (content) => content.replace('"vite/client"', '"vite/client",'),
      },
    ],
  });
}

async function installI18n() {
  await extractTemplates({
    title: "extract i18n scaffolding",
    from: "i18n",
  });

  await editFiles({
    title: "register Vue i18n plugin",
    files: "resources/application/main.ts",
    operations: [
      // add import
      {
        type: "add-line",
        match: /virtual:hybridly\/router/,
        position: "before",
        lines: "import i18n from './i18n'",
      },
      // add plugin
      {
        type: "add-line",
        match: /vue\.use\(/,
        position: "after",
        lines: "vue.use(i18n)",
      },
    ],
  });

  await editFiles({
    title: "register Vite i18n plugin",
    files: "vite.config.ts",
    operations: [
      // add import
      {
        type: "add-line",
        match: /import run from 'vite-plugin-run'/,
        position: "after",
        lines: "import i18n from '@intlify/vite-plugin-vue-i18n'",
      },
      // add plugin
      {
        type: "add-line",
        match: /vue\(/,
        position: "after",
        lines: [
          "i18n({",
          "	include: path.resolve(__dirname, './resources/i18n/locales.json'),",
          "}),",
        ],
      },
      // add automation
      {
        type: "add-line",
        match: /run\(\[/,
        position: "after",
        lines: [
          "	{",
          "		run: ['php', 'artisan', 'hybridly:i18n'],",
          "		condition: (file) => ['lang/'].some((kw) => file.includes(kw)),",
          "	},",
        ],
      },
    ],
  });
}
