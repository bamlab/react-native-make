import colorParser from 'color-string';

const BASE = 255;

export const getNormalizedRGBAColors = (color: string) => {
  try {
    const [red, green, blue, alpha] = colorParser.get.rgb(color);
    return {
      red: red / BASE,
      green: green / BASE,
      blue: blue / BASE,
      alpha,
    };
  } catch (err) {
    throw new Error('Could not parse your color');
  }
};

export const getHexColor = (color: string) => {
  try {
    const RGBA = colorParser.get.rgb(color);
    return colorParser.to.hex(RGBA);
  } catch (err) {
    throw new Error('Could not parse your color');
  }
};
