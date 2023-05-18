export default interface UiKitTheme {
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
