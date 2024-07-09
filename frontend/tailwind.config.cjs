module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { primary: ["Roboto", "sans-serif"] },
      colors: {
        primary: "#81C784",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
