import UiKitTheme from '../UiKitTheme';
export default class DefaultTheme implements UiKitTheme {
    divider: () => string;
    mainText: () => string;
    fontFamily: () => string;
    caption: () => string;
    chatInput: () => string;
    disabledElements: () => string;
    dropdownBackground: () => string;
    error: () => string;
    fieldBorder: () => string;
    hightlight: () => string;
    incomingBackground: () => string;
    inputElements: () => string;
    mainBackground: () => string;
    mainElements: () => string;
    outgoingBackground: () => string;
    secondaryBackground: () => string;
    secondaryElements: () => string;
    secondaryText: () => string;
}
