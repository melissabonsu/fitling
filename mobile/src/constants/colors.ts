// Sourced from the Fitling Figma file's "Logos & Icons" palette swatches.
export const Colors = {
  primary: '#FC7B10',
  primaryPressed: '#FA6404',
  /** Top-to-bottom wash used behind every screen. */
  backgroundGradient: ['#FFF3E7', '#FFDCBB'] as const,
  /** Face of the raised "Create Account" style buttons. */
  buttonGradient: ['#FDA23A', '#F8730A'] as const,
  /** Darker lip drawn under a button to give it depth. */
  buttonShadow: '#D95E02',
  card: '#FEFBFA',
  inputBackground: '#FFFCF8',
  inputBorder: '#F3DDC7',
  border: '#FFD0A9',
  text: '#11100E',
  textMuted: 'rgba(17, 16, 14, 0.55)',
  placeholder: '#B9A08C',
  /** Deep cocoa used for outlines and headings on the brand art. */
  brown: '#5A2D0C',
  pink: '#FEADAD',
  danger: '#D14343',
} as const;

export const Radii = {
  input: 16,
  button: 28,
  card: 32,
} as const;
