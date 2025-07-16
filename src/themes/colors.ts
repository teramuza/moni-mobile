import { Leaves } from '@type/base.ts';

const Colors = {
  //blue purple color palette
  bluePurplePlus2: '#3d2c5d',
  bluePurplePlus1: '#624891',
  bluePurple: '#856cb7',
  bluePurpleMin1: '#a695cd',
  bluePurpleMin2: '#e5dcfd',
  bluePurpleMin3: '#f1edfc',

  //red ruby color palette
  redRubyPlus2: '#7c1926',
  redRubyPlus1: '#B72A3D',
  redRuby: '#ee485c',
  redRubyMin1: '#f18f96',
  redRubyMin2: '#f7c6c9',

  //royal blue color palette
  royalBluePlus2: '#1b2872',
  royalBluePlus1: '#3144B4',
  royalBlue: '#5868dd',
  royalBlueMin1: '#8891e8',
  royalBlueMin2: '#d4d7fa',

  //brown sugar color palette
  brownSugarPlus2: '#543624',
  brownSugarPlus1: '#80543b',
  brownSugar: '#af7453',
  brownSugarMin1: '#E0966C',
  brownSugarMin2: '#edc6b6',

  //moss green color palette
  mossGreenPlus2: '#2d410a',
  mossGreenPlus1: '#486515',
  mossGreen: '#658c21',
  mossGreenMin1: '#83B42D',
  mossGreenMin2: '#cce7d6',

  //grey
  greyPlus2: '#36353a',
  greyPlus1: '#57555d',
  grey: '#7a7880',
  greyMin1: '#9f9da3',
  greyMin2: '#c5c4c8',

  //eerieBlack
  eerieBlack: '#18171a',

  //neutral
  neutralMainText: '#222223',
  neutralSecondaryText: '#747474',
  neutralPlaceholder: '#AAABAD',
  neutralDisabledText: '#AAABAD',
  neutralBorder: '#E3E3E4',
  neutralBorder05: 'rgba(227, 227, 228, .05)',
  neutralBorder20: 'rgba(227, 227, 228, .2)',
  neutralDisabledBg: '#E3E3E4',
  neutralContainer: '#F3F5F6',
  neutralSecondaryBg: '#F3F5F6',
  neutralWhite: '#FFF',
  mintWhite: '#f6f9f9',
  neutralWhite20: 'rgba(255, 255, 255, .2)',

  // Translucent
  translucentOverlay70: 'rgba(34, 34, 35, .7)',
  translucentOverlay20: 'rgba(34, 34, 35, .2)',

  // ETC
  transparent: 'transparent',
  blackSolid: '#000000',
  blackSolid05: 'rgba(0, 0, 0, 0.05)',
  blackSolid15: 'rgba(0, 0, 0, 0.15)',
  blackSolid30: 'rgba(0, 0, 0, 0.3)',
  blackSolid50: 'rgba(0, 0, 0, 0.5)',
  blackSolid80: 'rgba(0, 0, 0, 0.8)',
};

export const ColorSchemes = {
  bluePurple: 'bluePurple',
  redRuby: 'redRuby',
  royalBlue: 'royalBlue',
  brownSugar: 'brownSugar',
  mossGreen: 'mossGreen',
  grey: 'grey',
};

export const ColorSchemeGradients = {
  Plus1: 'Plus1',
  Plus2: 'Plus2',
  Min1: 'Min1',
  Min2: 'Min2',
  '': '',
};

export type IColorSchemes = Leaves<typeof ColorSchemes>;

export type IColorSchemeGradients = Leaves<typeof ColorSchemeGradients>;

export type IColors =
  | Leaves<typeof Colors>
  | `${IColorSchemes}${IColorSchemeGradients}`;
export default Colors;
