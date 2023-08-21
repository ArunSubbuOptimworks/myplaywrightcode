import { expect, Page } from "@playwright/test";
import { OverviewPageLocators as locator } from "../../../page-locators/admin-dashboard/loan-applicant/OverviewPageLocators";

export default class OverviewPage {

    constructor(public page: Page) { }

    /**
    * @description verifies Applicant name is displayed in overview page
    */
    async verifyApplicantNameIsDisplayedInOverviewPage(first_name, last_name) {
        const applicant_name = "//*[normalize-space()='" + first_name + " " + last_name + "']";
        expect(await this.page.waitForSelector(applicant_name, { state: 'attached' }), { message: "Applicant name is not displayed in overview page - " + first_name + " " + last_name }).toBeTruthy();
        await expect(this.page.locator(applicant_name), { message: "Applicant name is not displayed in overview page - " + first_name + " " + last_name }).toBeVisible();
    };

    /**
    * @description verifies details in overview page
    */
    async verifyDetailsInOverviewPage(locator, text) {
        await expect(this.page.locator(locator), { message: text + " - is not displayed in overview page" }).toHaveText(text);
    };

    /**
    * @description verifies email address is displayed in overview page
    */
    async verifyEmailAddressIsDisplayed(email) {
        await this.verifyDetailsInOverviewPage(locator.email_text, email)
    };

    /**
    * @description verifies phone number is displayed in overview page
    */
    async verifyPhoneNumberIsDisplayed(phone_number) {
        await this.verifyDetailsInOverviewPage(locator.phone_number_text, "+49" + phone_number)
    };

    /**
    * @description verifies financing project is displayed in overview page
    */
    async verifyFinancingProjectIsDisplayed(financing_type) {
        await this.verifyDetailsInOverviewPage(locator.financing_project_text, financing_type)
    };

    /**
    * @description clicks on more ellipses button
    */
    async clickOnApplicantMoreButton() {
        await this.page.locator(locator.applicant_more_button).click();
    };

    /**
   * @description clicks on delete customer data button in the ellipses popup
   */
    async clickOndeleteCustomerDataButton() {
        await this.page.locator(locator.delete_customer_data).click();
    };


    /**
    * @description verify that delete customer Data Popup should be Displayed
    */
    async verifyThatdeleteCustomerDataPopupIsDisplayed() {
        await expect(this.page.locator(locator.delete_customer_data_popup_header_text), { message: " customer data popup is not displayed" }).toBeVisible();
        // await this.page.locator(locator.delete_customer_data_popup_header_text).isVisible
    };

    /**
    * @description clicks on delete button inside the delete customer data popup
    */
    async clickOnDeleteButtonInsideCustomerDataPopup() {
        await this.page.locator(locator.delete_button_delete_customer_data_popup).click();
    };


    /**
   * @description verify That record deleted snackbar is displayed
   */
    async verifyThatRecordDeletedSuccessfulySnackBarIsDisplayed() {
        await expect(this.page.locator(locator.record_deleted_snack_bar), { message: " record deleted snackbar is not displayed" }).toBeVisible();
    };


    /**
  * @description verify That applicant name is displayed
  */
    async verifyApplicantNameDisplayedInOverviewPage(applicant_name) {
        const application_name = "//*[normalize-space()='" + applicant_name + "']";
        expect(await this.page.waitForSelector(application_name, { state: 'attached' }), { message: "Applicant name is not displayed in overview page - " + application_name }).toBeTruthy();
        await expect(this.page.locator(applicant_name), { message: "Applicant name is not displayed in overview page - " + application_name }).toBeVisible();
    };

    /**
   * @description verifies loading spinner is not displayed
   */
    async verifyloadingSpinnerIsDisappeared() {
       await this.page.waitForSelector(locator.loading_progress_circle,{state:"attached"}) 
       await this.page.waitForSelector(locator.loading_progress_circle,{state:"detached"}) 
    };













}