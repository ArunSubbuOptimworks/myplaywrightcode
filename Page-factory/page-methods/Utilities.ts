import { expect, Page } from "@playwright/test";

export default class Utilities {

    constructor(public page: Page) { }

    /**
    * @description Clicks on side menu link
    */
    async clickOnSideMenuLink(menu_name) {
        const menu_name_locator = "//fl-sidebar//*[normalize-space(text())='" + menu_name + "']";
        await this.page.click(menu_name_locator)
    };
}
