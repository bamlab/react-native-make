import colorParser from 'color-string';

export const getHexColor = (color: string) => {
  try {
    const RGBA = colorParser.get.rgb(color);
    return colorParser.to.hex(RGBA);
  } catch (err) {
    throw new Error('Could not parse your color');
  }
};
