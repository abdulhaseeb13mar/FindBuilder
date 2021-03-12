import {Dimensions, Platform, PixelRatio} from 'react-native';

export const colors = {
  primary: '#eae400',
  secondary: '#000000',
  lightBackground: '#eeeff0',
  lightGrey1: '#d0d0d0',
  lightGrey2: '#edeef0',
  lightGrey3: '#bcbcbc',
  lightGrey4: '#f4f4f4',
  darkGray: '#666565',
  blueGray: '#f7f7ff',
  darkPink: '#866766',
  orange: '#fa6c1c',
  lightBackground2: '#d9e0e3',
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const metrics = {
  width: width,
  height: height,
  defaultMargin: width * 0.05,
  smallMargin: width * 0.03,
  largeMargin: width * 0.08,
};

export const scaleFont = (size) => size * PixelRatio.getFontScale();

export const fonts = {
  primary: Platform.select({
    android: '',
    ios: '',
  }),
  primaryBold: Platform.select({
    android: '',
    ios: '',
  }),
  secondary: Platform.select({
    android: '',
    ios: '',
  }),
  secondaryBold: Platform.select({
    android: '',
    ios: '',
  }),
};

export const text = {
  largeheading: {
    fontSize: 25,
    fontWeight: '700',
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
  },
  subheading: {
    fontSize: 18,
    color: colors.primary,
    fontWeight: 'bold',
  },
};
