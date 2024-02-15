const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "primary": "#FF865B",
        "primary-content": "#131616",
        "secondary": "#1C4E80",
        "accent": "#ffbe34",
        "neutral": "1b262c",
        "neutral-content": "94a0a9",
        "base": {
          "100": "#121c22",
          "200": "#0e171e",
          "300": "#091319",
          "content": "#9fb9d0"
        },
        "info": "#89e0eb",
        "success": "#0e6e31",
        "warning": "#553b87",
        "error": "#cf0202",
      },
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
        "scale-up": {
          '0%': { transform: 'scale(1);'},
          '50%': { transform: 'scale(1.1);'},
          '100%': { transform: 'scale(1);'},
        },
        "scale-down": {
          '0%': { transform: 'scale(1);'},
          '50%': { transform: 'scale(0.9);'},
          '100%': { transform: 'scale(1);'},
        },
        "appear": {
          '0%': { opacity: '0;'},
          '25%': { opacity: '1;'},
          '75%': { opacity: '1;'},
          '100%': { opacity: '0;'},
        },
        "shake":{
          "0%": {left: "0%"},
          "20%": {left: "0.5%"},
          "40%": {left: "-0.5%"},
          "60%": {left: "0.5%"},
          "80%": {left: "-0.5%"},
          "100%": {left: "0%"},
        },
      },
      animation: {
        'flip': 'flip 1s linear forwards',
        'scale-up': 'scale 0.5s ease-in-out forwards',
        'scale-down': 'scale-down 0.5s ease-in-out forwards',
        'appear': 'appear 1s linear forwards',
        'shake': "shake 1s linear forwards"
      },
    },
  },
}