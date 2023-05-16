// import ThemeScheme from './ThemeScheme';
/*
export default class Theme {
  private static readonly _main_elements = ThemeScheme.primary_500;

  static get mainElements(): string {
    return this._main_elements;
  }

  static get secondaryElements(): string {
    return this._secondary_elements;
  }

  static get inputElements(): string {
    return this._input_elements;
  }

  static get disabledElements(): string {
    return this._disabled_elements;
  }

  static get fieldBorder(): string {
    return this._field_border;
  }

  static get mainText(): string {
    return this._main_text;
  }

  static get secondaryText(): string {
    return this._secondary_text;
  }

  static get caption(): string {
    return this._caption;
  }

  static get mainBackground(): string {
    return this._main_background;
  }

  static get secondaryBackground(): string {
    return this._secondary_background;
  }

  static get incomingBackground(): string {
    return this._incoming_background;
  }

  static get outgoingBackground(): string {
    return this._outgoing_background;
  }

  static get dropdownBackground(): string {
    return this._dropdown_background;
  }

  static get chatInput(): string {
    return this._chat_input;
  }

  static get divider(): string {
    return this._divider;
  }

  static get error(): string {
    return this._error;
  }

  static get hightlight(): string {
    return this._hightlight;
  }

  private static readonly _secondary_elements = ThemeScheme.secondary_500;

  private static readonly _input_elements = ThemeScheme.secondary_500;

  private static readonly _disabled_elements = ThemeScheme.secondary_100;

  private static readonly _field_border = ThemeScheme.secondary_200;

  private static readonly _main_text = ThemeScheme.secondary_900;

  private static readonly _secondary_text = ThemeScheme.secondary_300;

  private static readonly _caption = ThemeScheme.secondary_200;

  private static readonly _main_background = ThemeScheme.primary_a_100;

  private static readonly _secondary_background = ThemeScheme.primary_50;

  private static readonly _incoming_background = ThemeScheme.secondary_50;

  private static readonly _outgoing_background = ThemeScheme.primary_50;

  private static readonly _dropdown_background = ThemeScheme.primary_a_100;

  private static readonly _chat_input = ThemeScheme.primary_a_200;

  private static readonly _divider = ThemeScheme.primary_50;

  private static readonly _error = ThemeScheme.error_500;

  private static readonly _hightlight = ThemeScheme.highlight;
}
*/
export default interface Theme {
  mainElements(): string;

  secondaryElements(): string;

  inputElements(): string;

  disabledElements(): string;

  fieldBorder(): string;

  mainText(): string;

  secondaryText(): string;

  caption(): string;

  mainBackground(): string;

  secondaryBackground(): string;

  incomingBackground(): string;

  outgoingBackground(): string;

  dropdownBackground(): string;

  chatInput(): string;

  divider(): string;

  error(): string;

  hightlight(): string;

  fontFamily(): string;
}
