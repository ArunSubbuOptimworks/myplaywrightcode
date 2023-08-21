export class AdminLoginPageLocators {
    static finlink_logo = "//img[contains(@src,'finlink-logo')]";
    static email_input = "//*[normalize-space(text())='E-Mail']/../../div//input";
    static password_input = "//*[normalize-space(text())='Password' or normalize-space(text())='Passwort']/../../div//input";
    static sign_in_button = "[class*='btn-lg btn btn-primary'] span";
};