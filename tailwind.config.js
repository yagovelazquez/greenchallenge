/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"Open Sans", ui-sans-serif', "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      display: ["Oswald"],
      body: ['"Open Sans"'],
    },
    extend: {
      screens: {
        tablet: "500px",
      },
      fontFamily: {
        garamond: ['"Cormorant Garamond"', "sans-serif"],
      },
      colors: {
        fighting: {
          dark: "#c44d61",
          light: "rgba(196, 79, 99, 0.24)",
        },
        normal: {
          dark: "#909090",
          light: "rgba(144, 144, 144, 0.1)",
        },
        flying: {
          dark: "#758CBD",
          light: "rgba(117, 140, 189, 0.1)",
        },
        poison: {
          dark: "#AC6ACA",
          light: "rgba(172, 106, 202, 0.1)",
        },
        ground: {
          dark: "#CE8056",
          light: "rgba(206, 128, 86, 0.1)",
        },

        psychic: {
          dark: "#EB8B85",
          light: "rgba(235, 139, 132, 0.1)",
        },

        rock: {
          dark: "#84BEB3",
          light: "rgba(132, 190, 179, 0.1)",
        },
        water: {
          dark: "#4F77BE",
          light: "rgba(79, 120, 190, 0.1)",
        },

        grass: {
          dark: "#73B861",
          light: "rgba(114, 184, 97, 0.1)",
        },

        steel: {
          dark: "#6594A1",
          light: "rgba(101, 148, 161, 0.1)",
        },
        bug: {
          dark: "#9BBA48",
          light: "rgba(156, 186, 72, 0.1)",
        },

        fire: {
          dark: "#E96303",
          light: "rgba(233, 99, 3, 0.1)",
        },

        ghost: {
          dark: "#616EB7",
          light: "rgba(97, 110, 183, 0.1)",
        },

        dark: {
          dark: "#595761",
          light: "rgba(89, 87, 97, 0.1)",
        },

        electric: {
          dark: "#D4BC34",
          light: "rgba(245, 209, 5, 0.1)",
        },

        ice: {
          dark: "#71BAAC",
          light: "rgba(113, 186, 171, 0.1)",
        },
        dragon: {
          dark: "#2C6AC1",
          light: "rgba(44, 106, 193, 0.1)",
        },
        fairy: {
          dark: "#E296E1",
          light: "rgba(226, 150, 225, 0.1)",
        },
      },
    },
  },
  safelist: [
    {
      pattern:
        /text-(fairy|dragon|ice|fire|grass|electric|dark|water|rock|poison|flying|bug|ghost|steel|normal|fighting|ground|psychic)-(dark|light)/,
    },
  ],
  plugins: [],
};
