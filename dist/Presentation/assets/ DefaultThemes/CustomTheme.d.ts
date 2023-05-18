import DefaultTheme from './DefaultTheme';
export default class CustomTheme extends DefaultTheme {
    divider: () => string;
    mainText: () => string;
    fontFamily: () => string;
}
