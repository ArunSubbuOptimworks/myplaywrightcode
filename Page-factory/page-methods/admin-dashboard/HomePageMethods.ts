import { expect, Page } from "@playwright/test";
import { HomePageLocators as locator } from "../../page-locators/admin-dashboard/HomePageLocators";
import Utilities from "../Utilities";
import OverviewPage from "../../page-methods/admin-dashboard/loan-applicant/OverviewPageMethods";

export default class HomePage {

    constructor(public page: Page) { }
    utilities = new Utilities(this.page)
    overviewPage = new OverviewPage(this.page)

    /**
    * @description verifies advisors profile section is displayed
    */
    async verifyHomePageIsDisplayed() {
        //expect(await this.page.waitForSelector(locator.advisor_profile_section), { message: "Unable to wait until advisor profile section is displayed" }).toBeTruthy();
        await this.page.waitForSelector(locator.next_page_pagination_arrow_icon)
        await expect(this.page.locator(locator.advisor_profile_section), { message: "Advisors profile section is not displayed" }).toBeVisible();
        
        await this.page.waitForLoadState('domcontentloaded')
        await this.page.waitForLoadState('networkidle')
    };

    /**
    * @description clicks on side menu link
    */
    async clickOnLeadsSideMenuLink() {
        await this.utilities.clickOnSideMenuLink('Leads');
        await this.page.waitForLoadState('networkidle')
        await this.page.waitForLoadState('domcontentloaded')
        const create_resume_element = await this.page.$(locator.loading_skeleton)
        if (create_resume_element)
            await await this.page.waitForSelector(locator.loading_skeleton, { state: 'detached' })
    };

    /**
    * @description Logout from advisor dashboard
    */
    async logout() {
        await this.page.locator(locator.advisor_profile_section).click();
        await this.page.waitForSelector(locator.logout_button, { state: 'visible' });
        await this.page.locator(locator.logout_button).click();
        await this.page.waitForSelector(locator.advisor_profile_section, { state: 'detached' });
        await this.page.waitForLoadState('domcontentloaded')
        await this.page.waitForLoadState('load');
        const login_url = await this.page.url();
        await expect(login_url, { message: "login page is not displayed" }).toContain("login");

    };

    /**
    * @description selects the first advisor from the showed loan and opens and deletes it
    */
    async openTheFirstLoanApplicationFromTheLoanApplicationListAndDeletesIt(applicant_first_name) {
       await this.page.locator(locator.search_box_loan_application_page).fill(applicant_first_name)
        this.clickOnSearchButtonInLoanApplicationsPage();
        this.clickOnTheFirstLoanApplicationAndDeleteTheOpenedLoanApplication()
    };

     /**
    * @description clicks on search button in loan applications page
    */
     async clickOnSearchButtonInLoanApplicationsPage() {
        await this.page.locator(locator.search_button_loan_application_page).click()
 
     };

      /**
    * @description open the first loan application and delete it
    */
      async clickOnTheFirstLoanApplicationAndDeleteTheOpenedLoanApplication() {
         const loanName ="(//div[@col-id='primary_applicant_name'])[2]";
         
        const booleanVal = await this.page.$(loanName);
        console.log("boolean value is  " + booleanVal)
        while(booleanVal){
       
        await this.page.locator(loanName).click();
        await this.overviewPage.verifyloadingSpinnerIsDisappeared();
        await this.overviewPage.clickOnApplicantMoreButton();
        await this.overviewPage.clickOndeleteCustomerDataButton();
        await this.overviewPage.verifyThatdeleteCustomerDataPopupIsDisplayed();
        await this.overviewPage.clickOnDeleteButtonInsideCustomerDataPopup();
        await this.overviewPage.verifyThatRecordDeletedSuccessfulySnackBarIsDisplayed();
     };

    };

      /**
    * @description clicks on custom links button
    */
      async clickOnCustomLinksButton() {
        await this.page.locator(locator.custom_links_button).click()
 
     };

       /**
    * @description clicks on custom links button
    */
       async verifyThatCustomLinksPageIsDisplayed() {
        expect(await this.page.locator(locator.custom_links_page_title), { message: "Unable to wait until advisor profile section is displayed" }).toBeVisible();
 
     };

      /**
    * @description copy company invitation link
    */
      async copyTheCompanyInvitationLink () {

        const element = await this.page.locator(locator.company_invitation_link);
        await element.click();
        const text = await element.textContent();
        console.log("actual text"+text);
        return text
 
     };

       /**
    * @description copy company invitation link
    */
       async copyThepersonalInvitationLink (){


        const element = await this.page.locator(locator.personal_invitation_link);
        await element.click();
        const text = await element.textContent();
        await console.log("actual text"+text);
 
     };


         /**
    * @description copy company invitation link
    */
         async clickOnUserProfileDropDown (){
         await this.page.waitForLoadState('domcontentloaded')
         await this.page.waitForLoadState('networkidle')
         await this.page.locator(locator.advisor_profile_section).click();
    
   
       };






}