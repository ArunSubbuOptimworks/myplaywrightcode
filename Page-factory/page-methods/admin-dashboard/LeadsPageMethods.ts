import { expect, Page } from "@playwright/test";
import { LeadsPageLocators as locator } from "../../page-locators/admin-dashboard/LeadsPageLocators";

export default class LeadsPage {

    constructor(public page: Page) { }

    /**
    * @description verifies leads is opened or not
    */
    async verifyHomePageIsDisplayed() {
        await expect(this.page.locator(locator.leads_title), { message: "leads page is not opened" }).toBeVisible();
    };

    /**
    * @description enters the details in input field
    */
    async clickOnAddButton() {
        await this.page.waitForSelector(locator.add_button), { state: "visible" }, { message: "Selector is not visible" };
        await this.page.locator(locator.add_button).click();
    }

    /**
    * @description enters the details in input field
    */
    async clickOnSaveAsApplication() {
        await this.page.waitForSelector(locator.save_as_application), { state: "visible" }, { message: "Selector is not visible" };
        await this.page.locator(locator.save_as_application).click();
        await this.page.waitForLoadState('domcontentloaded')
    }

    /**
    * @description enters the details in input field
    */
    async clickOnSendEmailButton() {
        await this.page.waitForLoadState('domcontentloaded')
        await this.page.waitForLoadState('networkidle')
        await this.page.waitForSelector(locator.send_email_button), { state: "visible" }, { message: "Selector is not visible" };
        await this.page.locator(locator.send_email_button).click();
        await this.page.waitForLoadState('domcontentloaded')
        await this.page.waitForSelector(locator.leads_title),{state:"detached"},{message:"Selector is still visible"};
    }

    /**
    * @description enters the details in input field
    */
    async enterInInputfield(locator, details) {
        await this.page.waitForSelector(locator), { state: "visible" }, { message: "Selector is not visible" };
        await this.page.locator(locator).focus();
        await this.page.locator(locator).clear();
        await this.page.locator(locator).fill(details);
    };

    /**
    * @description selects dropdown option
    */
    async selectDropdownOption(dropdown_object, option) {
        const option_locator = "//span[normalize-space(text())='" + option + "'][@class='mat-option-text']";
        await this.page.locator(dropdown_object).click();
        await this.page.locator(option_locator).waitFor({ state: 'visible' });
        await this.page.locator(option_locator).click();
    };

    /**
    * @description selects the option from auto complete field
    */
    async selectTheOptionFromAutoCompleteField(auto_complete_field, option_object, option) {
        await this.page.waitForSelector(auto_complete_field, { state: 'visible' });
        await this.page.locator(auto_complete_field).scrollIntoViewIfNeeded();
        await this.page.fill(auto_complete_field, option);
        await this.page.waitForSelector(option_object, { state: 'attached' });
        await this.page.waitForSelector(option_object, { state: 'visible' });
        await this.page.locator(option_object).scrollIntoViewIfNeeded();
        await this.page.locator(option_object).focus();
        await this.page.click(option_object);
    };

    /**
    * @description enters the first name
    */
    async enterFirstName(first_name) {
        await this.enterInInputfield(locator.first_name_input, first_name);
    };

    /**
    * @description enters the last name
    */
    async enterLastName(last_name) {
        await this.enterInInputfield(locator.last_name_input, last_name);
    };

    /**
    * @description enters the email address
    */
    async enterEmail(email) {
        await this.enterInInputfield(locator.email_input, email);
    };

    /**
    * @description enters the phone number
    */
    async enterPhoneNumber(phone_number) {
        await this.enterInInputfield(locator.phone_number_input, phone_number);
    };

    /**
    * @description enters the monthly income
    */
    async enterMonthlyIncome(monthly_income) {
        await this.enterInInputfield(locator.monthly_income_input, monthly_income);
    };

    /**
    * @description enters the external id
    */
    async enterExternalId(external_id) {
        await this.enterInInputfield(locator.external_id_input, external_id);
    };

    /**
    * @description enters the capital rasing amount
    */
    async enterCapitalRasingAmount(capital_rasing_amount) {
        await this.enterInInputfield(locator.capital_raising_amount_input, capital_rasing_amount);
    };

    /**
    * @description enters the downpayment
    */
    async enterDownpayment(downpayment) {
        await this.enterInInputfield(locator.downpayment_input, downpayment);
    };

    /**
    * @description enters the property value
    */
    async enterPropertyValue(property_value) {
        await this.enterInInputfield(locator.property_value_input, property_value);
    };

    /**
    * @description selects saluation dropdown option
    */
    async selectSalutation(option) {
        await this.selectDropdownOption(locator.salutation_dropdown, option);
    };

    /**
    * @description selects employment status dropdown option
    */
    async selectEmploymentStatus(option) {
        await this.selectDropdownOption(locator.employment_status_dropdown, option);
    };

    /**
    * @description selects applying alone dropdown option
    */
    async selectApplyingAlone(option) {
        await this.selectDropdownOption(locator.applying_alone_dropdown, option);
    };

    /**
    * @description selects rsidency status dropdown option
    */
    async selectResidencyStatus(option) {
        await this.selectDropdownOption(locator.residency_status_dropdown, option);
    };

    /**
    * @description selects financing type dropdown option
    */
    async selectFinancingType(option) {
        await this.selectDropdownOption(locator.financing_type_dropdown, option);
    };

    /**
    * @description selects source from auto complete dropdown
    */
    async selectSource(source) {
        const source_object = "//div[contains(text(),'" + source + "')]";
        await this.selectTheOptionFromAutoCompleteField(locator.source_input, source_object, source);
    };

    /**
    * @description selects zipcode from auto complete dropdown
    */
    async selectZipAndCity(zip, city) {
        const zip_object = "//span[normalize-space(text())='" + zip + ", " + city + "']";
        await this.selectTheOptionFromAutoCompleteField(locator.zip_input, zip_object, zip);
    };

    /**
    * @description Verifies Lead was successfully converted snackbar message is displayed 
    */
    async verifyLeadConvertedSnackbarMessageIsDisplayed() {
        //expect(await this.page.waitForSelector(locator.lead_converted_message), { message: "Lead was successfully converted snackbar message is not displayed" }).toBeTruthy();
        await expect(this.page.locator(locator.lead_converted_message), { message: "Lead was successfully converted snackbar message is not displayed" }).toBeVisible();
        await this.page.waitForSelector(locator.lead_converted_message, { state: 'detached' });
    };

     /**
    * @description enters the purchase price amount
    */
     async enterPurchasePriceAmount(purchase_price_amount) {
        await this.enterInInputfield(locator.purchase_price_amount_input, purchase_price_amount);
    };

    /**
    * @description enters the max downpayment amount
    */
    async enterTheMaxDownPaymentAmount(max_down_payment_amount) {
        await this.enterInInputfield(locator.downpayment_input, max_down_payment_amount);
    };

    /**
    * @description selects found property dropdown option
    */
    async selectFoundProperty(option) {
        await this.selectDropdownOption(locator.found_property_dropdown, option);
    };

    /**
    * @description selects property type dropdown option
    */
    async selectPropertyType(option) {
        await this.selectDropdownOption(locator.property_type_dropdown, option);
    };

     /**
    * @description enters real estate agent fees 
    */
     async enterRealEstateAgentFees(option) {
        await this.enterInInputfield(locator.real_estate_agent_fees, option);
    };

     /**
    * @description Verifies Lead page is opened successfully
    */
     async verifyLeadsPageIsDisplayed() {
        //expect(await this.page.waitForSelector(locator.lead_converted_message), { message: "Lead was successfully converted snackbar message is not displayed" }).toBeTruthy();
        await this.page.waitForSelector(locator.leads_title, { state: 'attached'});
        await expect(this.page.locator(locator.leads_title), { message: "Leads title page is not displayed" }).toBeVisible();
        
    };





    


}