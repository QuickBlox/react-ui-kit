import DefaultTheme from './DefaultTheme'


export default class CustomTheme extends DefaultTheme {
  // eslint-disable-next-line class-methods-use-this
  divider = (): string => 'var(--divider)';

  // eslint-disable-next-line class-methods-use-this
  mainText = (): string => '#FFFFFF';

  // eslint-disable-next-line class-methods-use-this
  fontFamily = (): string => 'Roboto';
}
