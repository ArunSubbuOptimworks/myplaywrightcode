import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import details from "../../fixtures/LeadCreationDetails.json";
import Q1details from "../../fixtures/ClientDashboardLeadCreationDetails.json"
import AdminHomePage from "../../Page-factory/page-methods/admin-dashboard/HomePageMethods"
import AdminLoginPage from "../../Page-factory/page-methods/admin-dashboard/LoginPageMethods"
import ClientDashboardQ1Page from "../../Page-factory/page-methods/client-dashboard/Q1PageMethods"
import dotenv from 'dotenv';
dotenv.config();

let page, adminHomePage: AdminHomePage, adminLoginPage: AdminLoginPage, context, clientQ1Page: ClientDashboardQ1Page


const url = process.env.admin_url;
const admin_email = process.env.admin_email_1;
const admin_password = process.env.admin_password_1;
const last_name = 'capitalRaising' + faker.word.sample() + Q1details.Capital_raising_Questions.last_name


test.describe("lead creation from clientdashboard ", () => {

  test.beforeEach(async ({ browser }, testInfo) => {
    context = await browser.newContext()
    page = await context.newPage();
    adminLoginPage = new AdminLoginPage(page);
    adminHomePage = new AdminHomePage(page);
    clientQ1Page = new ClientDashboardQ1Page(page);

  });

  test("Lead Creation from ClientDashboard with finance type Capital Raising ", async () => {
    await adminLoginPage.launchSite(url);
    await adminLoginPage.verifyAdminLoginPageIsDisplayed();
    await adminLoginPage.loginToApplication(admin_email, admin_password);
    await adminHomePage.verifyHomePageIsDisplayed();
    await adminHomePage.clickOnUserProfileDropDown();
    await adminHomePage.clickOnCustomLinksButton();
    await adminHomePage.verifyThatCustomLinksPageIsDisplayed();
    await page.waitForTimeout(20000);
    const companyOnboardingLink = await adminHomePage.copyTheCompanyInvitationLink();
    console.log(companyOnboardingLink);
    await adminLoginPage.launchSite(companyOnboardingLink);
    await clientQ1Page.changeLanguageToEnglish();
    await clientQ1Page.veifyThatQ1QuestionairePagedIsDisplayed();
    await clientQ1Page.verifyTheExpectedQuestionIsDisplayed(Q1details.Capital_raising_Questions.question1);
    await clientQ1Page.selectTheRequiredOptionForTheQuestion(Q1details.Capital_raising_Questions.question1Answer)
    await clientQ1Page.verifyTheExpectedQuestionIsDisplayed(Q1details.Capital_raising_Questions.question2);
    await clientQ1Page.selectTheRequiredOptionForTheQuestion(Q1details.Capital_raising_Questions.question2Answer)
    await clientQ1Page.verifyTheExpectedQuestionIsDisplayed(Q1details.Capital_raising_Questions.question3);
    await clientQ1Page.selectTheRequiredOptionForTheQuestion(Q1details.Capital_raising_Questions.question3Answer);
    // await clientQ1Page.verifyTheExpectedQuestionIsDisplayed(Q1details.Capital_raising_Questions.question4);
    //  await clientQ1Page.selectTheRequiredOptionForTheQuestion(Q1details.Capital_raising_Questions.question4Answer);
    await clientQ1Page.verifyTheExpectedQuestionIsDisplayed(Q1details.Capital_raising_Questions.question5);
    await clientQ1Page.enterTheZipCode(Q1details.Capital_raising_Questions.question5Answer)
    await clientQ1Page.clickOnNextButton()
    await clientQ1Page.verifyTheExpectedQuestionIsDisplayed(Q1details.Capital_raising_Questions.question6);
    await clientQ1Page.enterThePurchasePrice(Q1details.Capital_raising_Questions.question6Answer)
    await clientQ1Page.clickOnNextButton()

    await clientQ1Page.verifyTheExpectedQuestionIsDisplayed(Q1details.Capital_raising_Questions.question8);
    await clientQ1Page.enterTheMaximumDownpayment(Q1details.Capital_raising_Questions.question8Answer);
    await clientQ1Page.clickOnNextButton()
    await clientQ1Page.verifyTheExpectedQuestionIsDisplayed(Q1details.Capital_raising_Questions.question7);
    await clientQ1Page.selectThebrokerageFee(Q1details.Capital_raising_Questions.question7Answer)
    //await clientQ1Page.clickOnNextButton()
    await clientQ1Page.verifyTheExpectedQuestionIsDisplayed(Q1details.Capital_raising_Questions.question9);
    await clientQ1Page.selectTheApplyingAloneOrSomeoneElseQuestion(Q1details.Capital_raising_Questions.question9Answer)
    await clientQ1Page.verifyTheExpectedQuestionIsDisplayed(Q1details.Capital_raising_Questions.question10);
    await clientQ1Page.selectEmploymentStatus(Q1details.Capital_raising_Questions.question10Answer);
    await clientQ1Page.clickOnNextButton()
    await clientQ1Page.verifyTheExpectedQuestionIsDisplayed(Q1details.Capital_raising_Questions.question11);
    await clientQ1Page.enterTheMonthlyNetIncomeinHousehold(Q1details.Capital_raising_Questions.question11Answer);
    await clientQ1Page.clickOnNextButton()
    await clientQ1Page.selectTheSalutation(Q1details.Capital_raising_Questions.salutation);
    await clientQ1Page.enterTheFirstName(Q1details.Capital_raising_Questions.first_name);
    await clientQ1Page.enterTheLastName(Q1details.Capital_raising_Questions.last_name);
    await clientQ1Page.enterThePhoneNumber(Q1details.Capital_raising_Questions.phone_number)
    await clientQ1Page.clickOngeneralTermsCheckbox();
    await clientQ1Page.clickOngetMortgageAdviceButton();
    await clientQ1Page.enterThePasswordField(Q1details.Capital_raising_Questions.password);
    await clientQ1Page.enterThePasswordConfirmationField(Q1details.Capital_raising_Questions.password);
    await clientQ1Page.clickOnContinueButton();
  })


  test.afterEach(async () => {
    await page.close();
    //await context.close();
  });
})