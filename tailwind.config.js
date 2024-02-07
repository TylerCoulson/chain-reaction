const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./app/**/*.{html,js}"],
  plugins: [require("daisyui"), plugin(({ matchUtilities, theme }) => {
    matchUtilities(
      {
        "animation-delay": (value) => {
          return {
            "animation-delay": value,
          };
        },
      },
      {
        values: theme("transitionDelay"),
      }
    );
  }),],
  theme: {
    extend: {
      keyframes: {
        flip: {
          '0%': { transform: 'rotateX(0.0deg)',
                  "background-color":"transparent",
                  "border-color": "--border-color"
                },
          '45%': { transform: 'rotateX(90deg)',
                  "background-color":"transparent",
                  "border-color": "--border-color"},
          '55%': { transform: 'rotateX(90deg)',
                    "background-color":"--background"},
          '100%': { transform: 'rotateX(0.0deg)',
                    "background-color":"--background"},
        },
        scale: {
          '0%': { transform: 'scale(1);'},
          '45%': { transform: 'scale(1.1);'},
          '55%': { transform: 'scale(1.1);'},
          '100%': { transform: 'scale(1);'},
        }
      },
      animation: {
        'flip': 'flip 1s linear forwards',
        'scale': 'scale 0.5s ease-in-out forwards',
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme:{"color-scheme": "dark",
        "primary": "#FF865B",
        "secondary": "#1C4E80",
        "accent": "#ffbe34",
        "neutral": "1b262c",
        "neutral-content": "94a0a9",
        "base-100": "#121c22",
        "base-200": "#0e171e",
        "base-300": "#091319",
        "base-content": "#9fb9d0",
        "info": "#89e0eb",
        "success": "#0e6e31",
        "warning": "#553b87",
        "error": "#cf0202",
        "--rounded-box": "1.2rem",
        "--rounded-btn": "0.8rem",
        "--rounded-badge": "0.4rem",
        "--tab-radius": "0.7rem"
      }
      }
    ]
  }
}