import {
  MantineProvider,
  createTheme,
  MantineColorsTuple,
  MantineThemeOverride,
  MantineTheme,
  MantineThemeColors,
} from "@mantine/core";

const commonThemeProperties: MantineThemeOverride = {
  fontFamily: [
    "Montserrat",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  colors: {
    primary: [
      "#F1FBE9",
      "#D8F4C3",
      "#BFED9C",
      "#A7E675",
      "#8EDE4E",
      "#75D728",
      "#5DAC20",
      "#468118",
      "#2F5610",
      "#172B08",
    ],
  },
  black: "#626262",
  primaryColor: "primary",
  defaultRadius: 6,
  headings: {
    fontFamily: [
      "Montserrat",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
};

const refineColors = {
  Blue: {
    colors: [
      "#E7F5FF",
      "#D0EBFF",
      "#A5D8FF",
      "#74C0FC",
      "#4DABF7",
      "#339AF0",
      "#228BE6",
      "#1C7ED6",
      "#1971C2",
      "#1864AB",
    ],
  },
  Purple: {
    colors: [
      "#F3F0FF",
      "#E5DBFF",
      "#D0BFFF",
      "#B197FC",
      "#9775FA",
      "#845EF7",
      "#7950F2",
      "#7048E8",
      "#6741D9",
      "#5F3DC4",
    ],
  },
  Magenta: {
    colors: [
      "#FFF0F6",
      "#FFDEEB",
      "#FCC2D7",
      "#FAA2C1",
      "#F783AC",
      "#F06595",
      "#E64980",
      "#D6336C",
      "#C2255C",
      "#A61E4D",
    ],
  },
  Red: {
    colors: [
      "#FFF5F5",
      "#FFE3E3",
      "#FFC9C9",
      "#FFA8A8",
      "#FF8787",
      "#FF6B6B",
      "#FA5252",
      "#F03E3E",
      "#E03131",
      "#C92A2A",
    ],
  },
  Orange: {
    colors: [
      "#FFF4E6",
      "#FFE8CC",
      "#FFD8A8",
      "#FFC078",
      "#FFA94D",
      "#FF922B",
      "#FD7E14",
      "#F76707",
      "#E8590C",
      "#D9480F",
    ],
  },
  Yellow: {
    colors: [
      "#FFF9DB",
      "#FFF3BF",
      "#FFEC99",
      "#FFE066",
      "#FFD43B",
      "#FCC419",
      "#FAB005",
      "#F59F00",
      "#F08C00",
      "#E67700",
    ],
  },
  Green: {
    colors: [
      "#EBFBEE",
      "#D3F9D8",
      "#B2F2BB",
      "#8CE99A",
      "#69DB7C",
      "#51CF66",
      "#40C057",
      "#37B24D",
      "#2F9E44",
      "#2B8A3E",
    ],
  },
} as const;

export const defaultTheme: MantineThemeOverride = createTheme(
  commonThemeProperties,
);

export const LightTheme: MantineThemeOverride = createTheme({
  ...commonThemeProperties,
});

// TODO
// export const DarkTheme: MantineThemeOverride = createTheme({
//colorScheme: "dark",
// ...commonThemeProperties
// });

const RefineThemes: Record<string, MantineThemeOverride> = Object.keys(
  refineColors,
).reduce((acc, key) => {
  const themeName = key as keyof typeof refineColors;

  return {
    ...acc,
    [themeName]: createTheme({
      ...commonThemeProperties,
      colors: {
        primary: refineColors[themeName].colors as MantineColorsTuple,
      },
      primaryColor: "primary",
    }),
  };
}, {});

export { RefineThemes };
