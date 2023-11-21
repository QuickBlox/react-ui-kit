import UiKitTheme from './UiKitTheme';
import ThemeScheme from './ThemeScheme';

export default class DarkTheme implements UiKitTheme {
  // eslint-disable-next-line class-methods-use-this
  caption = (): string => ThemeScheme.secondary_100;

  // eslint-disable-next-line class-methods-use-this
  chatInput = (): string => ThemeScheme.secondary_800;

  // eslint-disable-next-line class-methods-use-this
  disabledElements = (): string => ThemeScheme.secondary_300;

  // eslint-disable-next-line class-methods-use-this
  divider = (): string => ThemeScheme.secondary_400;

  // eslint-disable-next-line class-methods-use-this
  dropdownBackground = (): string => ThemeScheme.secondary_400;

  // eslint-disable-next-line class-methods-use-this
  error = (): string => ThemeScheme.error_300;

  // eslint-disable-next-line class-methods-use-this
  fieldBorder = (): string => ThemeScheme.secondary_200;

  // eslint-disable-next-line class-methods-use-this
  hightlight = (): string => ThemeScheme.highlight;

  // eslint-disable-next-line class-methods-use-this
  incomingBackground = (): string => ThemeScheme.secondary_400;

  // eslint-disable-next-line class-methods-use-this
  inputElements = (): string => ThemeScheme.secondary_200;

  // eslint-disable-next-line class-methods-use-this
  mainBackground = (): string => ThemeScheme.secondary_500;

  // eslint-disable-next-line class-methods-use-this
  mainElements = (): string => ThemeScheme.primary_300;

  // eslint-disable-next-line class-methods-use-this
  mainText = (): string => ThemeScheme.primary_a_100;

  // eslint-disable-next-line class-methods-use-this
  outgoingBackground = (): string => ThemeScheme.primary_500;

  // eslint-disable-next-line class-methods-use-this
  secondaryBackground = (): string => ThemeScheme.secondary_800;

  // eslint-disable-next-line class-methods-use-this
  secondaryElements = (): string => ThemeScheme.primary_a_100;

  // eslint-disable-next-line class-methods-use-this
  secondaryText = (): string => ThemeScheme.secondary_200;

  // eslint-disable-next-line class-methods-use-this
  fontFamily = (): string => ThemeScheme.fontFamily;
}
