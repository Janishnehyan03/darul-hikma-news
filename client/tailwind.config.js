module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screen: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      fontfamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: "#FD3D57",
        secondary: "#5463FF",
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
  variants: {
    display: ["group-hover"],
    visibility: ["group-hover"],
  },
};
