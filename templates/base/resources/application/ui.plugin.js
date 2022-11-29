const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");
const Color = require("color");

// --------------------------------------------------------
// Extract RGB channels from a color
// --------------------------------------------------------

function getRgbChannels(color) {
  return Color(color).rgb().array().join(" ");
}

// --------------------------------------------------------
// Helper function to convert variable to css color string
// --------------------------------------------------------

const c = (color, opacity = true) => {
  return `rgb(var(${color})${opacity ? " / <alpha-value>" : ""})`;
};

// --------------------------------------------------------
// Themes definition
// --------------------------------------------------------

const themes = [
  {
    name: "root",
    colors: {
      "bg-page": colors.gray[50],
      "bg-card": "#ffffff",
      "bg-card-feature": "#f3f3f3",
      "bg-input": "#ffffff",

      "text-base": "#0e0e0e",
      "text-muted": "#344054",
      "text-light": "#667085",
      "text-soft": "#9A9FAB",

      "bd-base": "#f0f0f2",
      "bd-strong": "#D0D5DD",

      accent: colors.blue[700],
      "accent-hover": colors.blue[800],
      "accent-active": colors.blue[900],

      success: colors.green[500],
      danger: colors.red[500],

      "bg-badge-green": colors.green[100],
      "text-badge-green": colors.green[800],
      "bg-badge-red": colors.red[100],
      "text-badge-red": colors.red[800],
      "bg-badge-blue": colors.blue[100],
      "text-badge-blue": colors.blue[800],
      "bg-badge-gray": colors.gray[100],
      "text-badge-gray": colors.gray[800],
    },
  },
  {
    name: "dark",
    colors: {
      "bg-page": "#101112",
      "bg-card": "#1a1c1e",
      "bg-card-feature": "#282a2e",
      "bg-input": "#282a2e",

      "text-base": "#e1e1e2",
      "text-muted": "#797d86",
      "text-light": "#797d86",
      "text-soft": "#797d86",

      "bd-base": "#25282d",
      "bd-strong": colors.neutral[700],

      accent: "#4181E8",
      "accent-hover": colors.blue[700],
      "accent-active": colors.blue[800],

      success: colors.green[500],
      danger: colors.red[400],

      "bg-badge-green": colors.green[800],
      "text-badge-green": colors.green[100],
      "bg-badge-red": colors.red[800],
      "text-badge-red": colors.red[100],
      "bg-badge-blue": colors.blue[800],
      "text-badge-blue": colors.blue[100],
      "bg-badge-gray": colors.gray[800],
      "text-badge-gray": colors.gray[100],
    },
  },
];

// --------------------------------------------------------
// Tailwind CSS plugin
// --------------------------------------------------------

module.exports = plugin(
  function ({ addBase, addComponents, addUtilities }) {
    addUtilities({
      ".flex-center": {
        "@apply flex items-center justify-center": {},
      },
      ".focus-base": {
        "@apply outline-none duration-100": {},
        "&:focus": {
          "@apply ring-4 transition-all": {},
        },
      },
      ".focus-ring": {
        "@apply focus-base": {},
        "&:focus": {
          "@apply ring-theme-accent ring-opacity-20 border-theme-accent": {},
        },
      },
      ".focus-ring-neutral": {
        "@apply focus-base": {},
        "@apply ring-black ring-opacity-20 border-neutral-900": {},
      },
      ".main-container": {
        "@apply relative mx-auto w-full max-w-screen-2xl py-5 px-5 sm:px-8 md:px-12 lg:px-10 2xl:px-0":
          {},
      },
    });

    addComponents({
      ".button": {
        "@apply relative focus-ring-neutral dark:focus-ring ring-neutral-700 flex-center px-4 py-[10px] text-sm rounded-lg border cursor-pointer select-none":
          {},
        "@apply bg-black text-white dark:bg-theme-accent": {},
        "&:focus,&:hover": {
          "@apply bg-neutral-800 dark:bg-theme-accent-hover": {},
        },
        "&:active": {
          "@apply bg-neutral-700 dark:bg-theme-accent-active": {},
        },
        "&.loading": {
          "&:before": {
            "@apply mr-2 h-4 w-4 rounded-full border-2 animate-spin": {},
            content: '""',
            "border-top-color": "transparent",
            "border-left-color": "transparent",
            "border-bottom-color": "currentColor",
            "border-right-color": "currentColor",
          },
        },
        "&.loading-absolute": {
          "&:before": {
            "@apply absolute left-5 h-4 w-4 rounded-full border-2 animate-spin":
              {},
            content: '""',
            "border-top-color": "transparent",
            "border-left-color": "transparent",
            "border-bottom-color": "currentColor",
            "border-right-color": "currentColor",
          },
        },
      },
      ".button-accent": {
        "@apply button focus-ring": {},
        "@apply bg-theme-accent text-white dark:bg-theme-accent border-none font-semibold text-base":
          {},
        "&:focus,&:hover": {
          "@apply bg-theme-accent-hover": {},
        },
        "&:active": {
          "@apply bg-theme-accent-active": {},
        },
      },
      ".button-outline": {
        "@apply button focus-ring": {},
        "@apply bg-transparent dark:bg-transparent text-theme-base": {},
        "@apply border-[#d5d5db] dark:border-[#3a3f49]": {},
        "&:focus,&:hover": {
          "background-color": "rgb(var(--bd-base)) !important",
        },
      },
      ".button-light": {
        "@apply button-outline": {},
        "@apply border-transparent dark:border-transparent": {},
        "background-color": "rgb(var(--bd-base)) !important",
      },
      ".button-ghost": {
        "@apply button-outline": {},
        "@apply border-transparent dark:border-transparent": {},
        "&:focus,&:hover": {
          "background-color": "rgb(var(--bd-base)) !important",
        },
      },
      ".button-link": {
        "@apply underline text-sm text-theme-muted hover:text-theme-base": {},
      },
      ".button-danger": {
        "@apply button": {},
        "@apply text-theme-danger bg-theme-badge-red/50 dark:bg-theme-badge-red/20":
          {},
        "@apply border-transparent dark:border-transparent": {},
        "&:focus,&:hover": {
          "@apply bg-theme-badge-red dark:bg-theme-badge-red/40": {},
        },
        "@apply focus-base": {},
        "&:focus": {
          "@apply ring-theme-danger dark:ring-theme-danger ring-opacity-20 dark:ring-opacity-10 border-theme-danger dark:border-theme-danger":
            {},
        },
      },
      ".input": {
        "@apply bg-theme-input focus-ring appearance-none block w-full px-[14px] py-[10px] border border-theme-strong rounded-lg shadow-sm placeholder:text-theme-light sm:text-base":
          {},
      },
      ".checkbox": {
        "@apply input": {},
        "@apply w-3 h-3 p-2 rounded-md text-theme-accent": {},
        "--tw-ring-offset-color": "transparent !important",
      },
      ".radio": {
        "@apply input": {},
        "@apply w-3 h-3 rounded-full p-2 text-theme-accent": {},
        "--tw-ring-offset-color": "transparent !important",
      },
      ".table-container": {
        "@apply overflow-hidden md:rounded-lg ring-1 ring-theme-border-strong ring-opacity-40":
          {},
      },
      ".table": {
        "@apply min-w-full divide-y divide-theme-border-strong": {},
        "tbody > tr": {
          "@apply border-t border-theme-base": {},
        },
        "tbody > tr:hover": {
          "@apply bg-gray-50 dark:bg-neutral-900": {},
        },
      },
      ".table-striped": {
        "@apply table": {},
        thead: {
          "@apply bg-gray-50 dark:bg-neutral-900": {},
        },
        "tbody > tr:nth-child(even)": {
          "@apply bg-gray-50 dark:bg-neutral-900": {},
        },
      },
      ".badge": {
        "@apply inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0":
          {},
      },
      ".badge-green": {
        "@apply badge": {},
        "@apply bg-theme-badge-green text-theme-badge-green": {},
      },
      ".badge-red": {
        "@apply badge": {},
        "@apply bg-theme-badge-red text-theme-badge-red": {},
      },
      ".badge-blue": {
        "@apply badge": {},
        "@apply bg-theme-badge-blue text-theme-badge-blue": {},
      },
      ".badge-gray": {
        "@apply badge": {},
        "@apply bg-theme-badge-gray text-theme-badge-gray": {},
      },
    });

    themes.forEach((theme) => {
      const { colors, name } = theme;
      const propertiesObj = {};

      Object.keys(colors).forEach((color) => {
        propertiesObj[`--${color}`] = getRgbChannels(colors[color]);
      });

      addBase({
        [name === "root" ? ":root" : `.${name}`]: propertiesObj,
      });
    });

    addBase({
      ["body"]: {
        "background-color": c("--bg-page", false),
        color: c("--text-base", false),
      },
    });
  },

  // --------------------------------------------------------
  // Add semantic color names to Tailwind's color palette
  // --------------------------------------------------------

  {
    theme: {
      extend: {
        colors: {
          theme: {
            accent: c("--accent"),
            "accent-hover": c("--accent-hover"),
            "accent-active": c("--accent-active"),
            "border-base": c("--bd-base"),
            "border-strong": c("--bd-strong"),
            "bg-card": c("--bg-card"),
            success: c("--success"),
            danger: c("--danger"),
          },
        },
        textColor: {
          theme: {
            base: c("--text-base"),
            muted: c("--text-muted"),
            light: c("--text-light"),
            soft: c("--text-soft"),
            "badge-green": c("--text-badge-green"),
            "badge-red": c("--text-badge-red"),
            "badge-blue": c("--text-badge-blue"),
            "badge-gray": c("--text-badge-gray"),
          },
        },
        backgroundColor: {
          theme: {
            page: c("--bg-page"),
            card: c("--bg-card"),
            "card-feature": c("--bg-card-feature"),
            input: c("--bg-input"),
            button: c("--bg-button"),
            "badge-green": c("--bg-badge-green"),
            "badge-red": c("--bg-badge-red"),
            "badge-blue": c("--bg-badge-blue"),
            "badge-gray": c("--bg-badge-gray"),
          },
        },
        borderColor: {
          theme: {
            base: c("--bd-base"),
            strong: c("--bd-strong"),
          },
        },
      },
    },
  }
);
