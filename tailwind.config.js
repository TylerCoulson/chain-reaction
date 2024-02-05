module.exports = {
  content: ["./app/**/*.{html,js}"],
  plugins: [require("daisyui")],
  theme: {
    extend: {},
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
        "warning": "#f1c891",
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