import UiKitTheme from '../UiKitTheme';

export default class DefaultTheme implements UiKitTheme {
  // eslint-disable-next-line class-methods-use-this
  divider = (): string => 'var(--divider)';

  // eslint-disable-next-line class-methods-use-this
  mainText = (): string => 'var(--main-text)';

  // eslint-disable-next-line class-methods-use-this
  fontFamily = (): string => 'var(--font-family)';

  //
  // eslint-disable-next-line class-methods-use-this
  caption = (): string => 'var(--caption)';

  // eslint-disable-next-line class-methods-use-this
  chatInput = (): string => 'var(--chat-input)';

  // eslint-disable-next-line class-methods-use-this
  disabledElements = (): string => 'var(--disabled-elements)';

  // eslint-disable-next-line class-methods-use-this
  dropdownBackground = (): string => 'var(--dropdown-background)';

  // eslint-disable-next-line class-methods-use-this
  error = (): string => 'var(--error)';

  // eslint-disable-next-line class-methods-use-this
  fieldBorder = (): string => 'var(--field-border)';

  // eslint-disable-next-line class-methods-use-this
  hightlight = (): string => 'var(--hightlight)';

  // eslint-disable-next-line class-methods-use-this
  incomingBackground = (): string => 'var(--incoming-background)';

  // eslint-disable-next-line class-methods-use-this
  inputElements = (): string => 'var(--input-elements)';

  // eslint-disable-next-line class-methods-use-this
  mainBackground = (): string => 'var(--main-background)';

  // eslint-disable-next-line class-methods-use-this
  mainElements = (): string => 'var(--main-elements)';

  // eslint-disable-next-line class-methods-use-this
  outgoingBackground = (): string => 'var(--outgoing-background)';

  // eslint-disable-next-line class-methods-use-this
  secondaryBackground = (): string => 'var(--secondary-background)';

  // eslint-disable-next-line class-methods-use-this
  secondaryElements = (): string => 'var(--secondary-elements)';

  // eslint-disable-next-line class-methods-use-this
  secondaryText = (): string => 'var(--secondary-text)';
}
