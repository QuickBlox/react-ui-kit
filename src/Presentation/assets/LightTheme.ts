import Theme from './Theme';
import ThemeScheme from './ThemeScheme';

export default class LightTheme implements Theme {
  // eslint-disable-next-line class-methods-use-this
  caption = (): string => ThemeScheme.secondary_200;

  // eslint-disable-next-line class-methods-use-this
  chatInput = (): string => ThemeScheme.primary_a_200;

  // eslint-disable-next-line class-methods-use-this
  disabledElements = (): string => ThemeScheme.secondary_100;

  // eslint-disable-next-line class-methods-use-this
  divider = (): string => ThemeScheme.primary_50;

  // eslint-disable-next-line class-methods-use-this
  dropdownBackground = (): string => ThemeScheme.primary_a_100;

  // eslint-disable-next-line class-methods-use-this
  error = (): string => ThemeScheme.error_500;

  // eslint-disable-next-line class-methods-use-this
  fieldBorder = (): string => ThemeScheme.secondary_200;

  // eslint-disable-next-line class-methods-use-this
  hightlight = (): string => ThemeScheme.highlight;

  // eslint-disable-next-line class-methods-use-this
  incomingBackground = (): string => ThemeScheme.secondary_50;

  // eslint-disable-next-line class-methods-use-this
  inputElements = (): string => ThemeScheme.secondary_500;

  // eslint-disable-next-line class-methods-use-this
  mainBackground = (): string => ThemeScheme.primary_a_100;

  // eslint-disable-next-line class-methods-use-this
  mainElements = (): string => ThemeScheme.primary_500;

  // eslint-disable-next-line class-methods-use-this
  mainText = (): string => ThemeScheme.secondary_900;

  // eslint-disable-next-line class-methods-use-this
  outgoingBackground = (): string => ThemeScheme.primary_50;

  // eslint-disable-next-line class-methods-use-this
  secondaryBackground = (): string => ThemeScheme.primary_50;

  // eslint-disable-next-line class-methods-use-this
  secondaryElements = (): string => ThemeScheme.secondary_500;

  // eslint-disable-next-line class-methods-use-this
  secondaryText = (): string => ThemeScheme.secondary_300;

  // eslint-disable-next-line class-methods-use-this
  fontFamily = (): string => ThemeScheme.fontFamily;
}
