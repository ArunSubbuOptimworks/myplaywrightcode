import { expect, Page } from "@playwright/test";
import { Q1PageLocators as locator } from "../../page-locators/Client-dashboard/Q1PageLocators";
import LeadsPage  from "../../page-methods/admin-dashboard/LeadsPageMethods";


export default class Q1PageMethods{

    constructor(public page: Page) {}
    
  
         /**
    * @description verifies that expected Q1 Question is displayed
    */
    async verifyTheExpectedQuestionIsDisplayed(question) {
      const questionObject = "//h2[normalize-space(text())='"+question+"']" 
      await expect(this.page.locator(questionObject), { message: "expected question: "+question+" is not displayed"  }).toBeVisible();
   };

           /**
    * @description verify that Q1 Questionaire page is opened
    */
    async veifyThatQ1QuestionairePagedIsDisplayed() {

        await this.page.waitForLoadState("networkidle")
        await this.page.waitForLoadState("domcontentloaded")
        await expect(this.page.locator(locator.q1_page_finlink_logo), { message: "Clientdashboard Q1  page was not displayed"  }).toBeVisible();
         };

           /**
    * @description select the option for a specific question
    */
           async selectTheRequiredOptionForTheQuestion(option) {
            const option_Object = "//div[normalize-space(text())='"+option+"']"
            await this.page.waitForLoadState("networkidle")
            await this.page.waitForLoadState("domcontentloaded")
            await this.page.locator(option_Object).click();
            
             };

             /**
    * @description changes the language to English,if content shows in any other language
    */
             async changeLanguageToEnglish(){
                await this.page.waitForLoadState("networkidle")
                await this.page.waitForLoadState("domcontentloaded")
                var language = await this.page.$(locator.existing_language_text_locator);
                var languageText = await language?.textContent();
                await console.log("boolean value is  " + languageText)
                if(languageText=='de'){
                 await this.page.locator(locator.existing_language_text_locator).hover();
                 await this.page.locator(locator.en_language_Option).waitFor({state:"visible"})
                 await this.page.locator(locator.en_language_Option).waitFor({state:"attached"})
                 await this.page.locator(locator.en_language_Option).click();
                 await this.page.waitForLoadState("networkidle")
                 await this.page.waitForLoadState("domcontentloaded")
                 language = await this.page.$(locator.existing_language_text_locator);
                 languageText = await language?.textContent();
                 await expect(languageText,{ message: "language was not changed to english"  }).toBe("en");
                }

                
            };

            
               /**
    * @description enters the zipcode
    */

        async enterTheZipCode(zip_input){
            const zip_object ="//span[normalize-space(text())='"+zip_input+"']"
            await this.selectTheOptionFromAutoCompleteField(locator.zip_field,zip_object,zip_input)
            }

        

       async enterThePurchasePrice(purchase_price){
        const input_field_object="//input[@id='Q1.questions.property_meta.listed_price']"
        //const input_field_object ="#Q1.questions.property_meta.listed_price"
        await this.enterInInputfield(input_field_object,purchase_price)
       }

       async selectThebrokerageFee(brokerage_fee){
        await this.selectTheRequiredOptionForTheQuestion(brokerage_fee)
       }

       async enterTheMaximumDownpayment(maximum_down_payment){
        const input_field_object ="//input[@id='Q1.questions.applicant_meta.bank_savings_amount_towards_down_payment']"
        await this.enterInInputfield(input_field_object,maximum_down_payment)
       }

       async selectTheApplyingAloneOrSomeoneElseQuestion(applying_alone_or_someone_else){
        await this.selectTheRequiredOptionForTheQuestion(applying_alone_or_someone_else)
       }

       
       async selectEmploymentStatus(employment_status_option){
        await this.selectDropdownOption(locator.employment_status_dropdown,employment_status_option)
       }

       async enterTheMonthlyNetIncomeinHousehold(monthly_net_income){
            const input_field_object ="//input[@id='Q1.questions.applicant_meta.monthly_net_income']"
            await this.enterInInputfield(input_field_object,monthly_net_income)
       }

      async selectTheSalutation(saluation_Option){
        await this.selectDropdownOption(this.page.locator(locator.salutationDropDown),saluation_Option)

      }

      async enterTheFirstName(first_name){
         await this.enterInInputfield(this.page.locator(locator.firstName_field),first_name)
       } 

       async enterTheLastName(last_name){
        await this.enterInInputfield(this.page.locator(locator.lastName_field),last_name)
      } 

      async enterTheEmail(email){
        await this.enterInInputfield(this.page.locator(locator.email_Field),email)
      } 

      async enterThePhoneNumber(phone_number){
        await this.enterInInputfield(this.page.locator(locator.phoneNumber_Field),phone_number)
      } 


      async clickOngeneralTermsCheckbox(){
        await this.page.locator(locator.general_Terms_checkbox).click();
      }

      async clickOngetMortgageAdviceButton(){
        await this.page.locator(locator.get_mortgage_advice).click();
      }

      async enterThePasswordField(password){
        await this.enterInInputfield(this.page.locator(locator.password_field),password)
      } 

      async enterThePasswordConfirmationField(password){
        await this.enterInInputfield(this.page.locator(locator.password_confirmation_field),password)
      } 


      
      async clickOnContinueButton(){
        await this.page.locator(locator.continue_Button).focus();
        await this.page.locator(locator.continue_Button).scrollIntoViewIfNeeded();
        await this.page.locator(locator.continue_Button).click();
      } 

      async clickOnNextButton(){
        await this.page.locator(locator.next_Button).scrollIntoViewIfNeeded();
        await this.page.locator(locator.next_Button).focus();
        await this.page.locator(locator.next_Button).click();
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
    * @description selects dropdown option
    */
     async selectDropdownOption(dropdown_object, option) {
        //const option_object ="//option[normalize-space(text())='"+option+"']"
        //await this.page.locator(dropdown_object).click({ force: true });
        this.page.locator(dropdown_object).selectOption(option);
       /* await this.page.getByRole(dropdown_object).dispatchEvent('click');
        await this.page.waitForSelector(option_object)
        await this.page.locator(option_object).click({ force: true });*/
    };



}