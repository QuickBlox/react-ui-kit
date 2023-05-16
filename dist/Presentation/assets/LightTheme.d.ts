import Theme from './Theme';
export default class LightTheme implements Theme {
    caption: () => string;
    chatInput: () => string;
    disabledElements: () => string;
    divider: () => string;
    dropdownBackground: () => string;
    error: () => string;
    fieldBorder: () => string;
    hightlight: () => string;
    incomingBackground: () => string;
    inputElements: () => string;
    mainBackground: () => string;
    mainElements: () => string;
    mainText: () => string;
    outgoingBackground: () => string;
    secondaryBackground: () => string;
    secondaryElements: () => string;
    secondaryText: () => string;
    fontFamily: () => string;
}
