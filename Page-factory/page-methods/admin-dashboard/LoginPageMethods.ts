import { expect, Page } from "@playwright/test";
import { AdminLoginPageLocators as locator } from "../../page-locators/admin-dashboard/LoginPageLocators";

export default class AdminLoginPage {

    constructor(public page: Page) { }

    /**
    * @description launches advisor's login page
    */
    async launchSite(url) {
        await this.page.goto(url);
        const get_url = await this.page.url();
        await this.page.waitForLoadState('domcontentloaded')
        await this.page.waitForLoadState('networkidle');
        await expect(get_url, { message: "Url not contains 'finlink' text" }).toContain("finlink");
    };

    /**
    * @description verifies finlink logo is displayed
    */
    async verifyAdminLoginPageIsDisplayed() {
        await expect(this.page.locator(locator.finlink_logo), { message: "login page is not displayed with finlink logo" }).toBeVisible();
        await expect(this.page.locator(locator.email_input), { message: "Email input field is not displayed" }).toBeVisible();
        await expect(this.page.locator(locator.password_input), { message: "Password input field is not displayed" }).toBeVisible();
        await expect(this.page.locator(locator.sign_in_button), { message: "Signin button is not displayed" }).toBeVisible();
    };

    /**
    * @description login as advisor or orgadmin or global admin
    */
    async loginToApplication(username, password) {
        await this.page.locator(locator.email_input).fill(username);
        await this.page.locator(locator.password_input).fill(password);
        await this.page.locator(locator.sign_in_button).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForLoadState('domcontentloaded')
    };
}
