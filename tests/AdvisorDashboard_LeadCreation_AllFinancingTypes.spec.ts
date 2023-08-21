import { test} from '@playwright/test';
import details from "../fixtures/LeadCreationDetails.json";
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import AdminLoginPage from "../Page-factory/page-methods/admin-dashboard/LoginPageMethods";
import HomePage from "../Page-factory/page-methods/admin-dashboard/HomePageMethods";
import LeadsPage from "../Page-factory/page-methods/admin-dashboard/LeadsPageMethods";
import OverviewPage from "../Page-factory/page-methods/admin-dashboard/loan-applicant/OverviewPageMethods";
dotenv.config();

let page, adminLoginPage : AdminLoginPage, adminHomePage: HomePage, leadsPage: LeadsPage, overviewPage: OverviewPage

const url = process.env.admin_url;
const admin_email = process.env.admin_email_1;
const admin_password = process.env.admin_password_1;
const advisor_email = process.env.advisor_email_1;
const advisor_password = process.env.advisor_password_1;
const email_address_1 = details.basic_details.email + '+cr' + faker.word.sample() + details.basic_details.extension;
const email_address_2 = details.basic_details.email + '+md' + faker.word.sample() + details.basic_details.extension;
const email_address_3 = details.basic_details.email + '+be' + faker.word.sample()+details.basic_details.extension;
const last_name_3 = 'buyanexistingproperty'+ faker.word.sample() +details.basic_details.last_name
let context
let currentTestName: string = '';

test.describe("Create a lead by using different financing types ", () => {

    test.beforeEach(async ({ browser }, testInfo) => {
        currentTestName = testInfo.title;
        context = await browser.newContext({
            recordVideo: {
                dir: "test-results/videos/" + currentTestName,
            }
        });
        page = await context.newPage();
        adminLoginPage = new AdminLoginPage(page);
        adminHomePage = new HomePage(page);
        leadsPage = new LeadsPage(page);
        overviewPage = new OverviewPage(page);
    });

    test("Lead creation with Capital raising finance type", async () => {
        await adminLoginPage.launchSite(url);
        await adminLoginPage.verifyAdminLoginPageIsDisplayed();
        await adminLoginPage.loginToApplication(admin_email, admin_password);
        await adminHomePage.verifyHomePageIsDisplayed();
        await adminHomePage.clickOnLeadsSideMenuLink();

        await leadsPage.clickOnAddButton();
        await leadsPage.selectSalutation(details.basic_details.salutation);
        await leadsPage.enterFirstName(details.basic_details.first_name);
        await leadsPage.enterLastName(details.basic_details.last_name);
        await leadsPage.enterEmail(email_address_1);
        await leadsPage.enterPhoneNumber(details.basic_details.phone_number);
        await leadsPage.selectEmploymentStatus(details.basic_details.employment_status);
        await leadsPage.enterMonthlyIncome(details.basic_details.monthly_income);
        await leadsPage.selectApplyingAlone(details.basic_details.applying_alone);
        await leadsPage.selectResidencyStatus(details.basic_details.residency_status);
        await leadsPage.enterExternalId(details.basic_details.external_id);
        await leadsPage.selectFinancingType(details.Capital_raising_details.financing_type);
        await leadsPage.enterCapitalRasingAmount(details.Capital_raising_details.capital_raising_amount);
        await leadsPage.enterDownpayment(details.Capital_raising_details.max_downpayment);
        await leadsPage.enterPropertyValue(details.Capital_raising_details.property_value);
        await leadsPage.selectZipAndCity(details.Capital_raising_details.zip, details.Capital_raising_details.city);
        await leadsPage.clickOnSaveAsApplication();
        await leadsPage.verifyLeadConvertedSnackbarMessageIsDisplayed();
        await leadsPage.clickOnSendEmailButton();

        await overviewPage.verifyApplicantNameIsDisplayedInOverviewPage(details.basic_details.first_name, details.basic_details.last_name);
        await overviewPage.verifyEmailAddressIsDisplayed(email_address_1);
        await overviewPage.verifyPhoneNumberIsDisplayed(details.basic_details.phone_number);
        await overviewPage.verifyFinancingProjectIsDisplayed(details.Capital_raising_details.financing_type);
        await adminHomePage.logout()
    });

    test("Lead creation with Modernization finance type", async () => {
        await adminLoginPage.launchSite(url);
        await adminLoginPage.verifyAdminLoginPageIsDisplayed();
        await adminLoginPage.loginToApplication(advisor_email, advisor_password);
        await adminHomePage.verifyHomePageIsDisplayed();
        await adminHomePage.clickOnLeadsSideMenuLink();

        await leadsPage.clickOnAddButton();
        await leadsPage.selectSalutation(details.basic_details.salutation);
        await leadsPage.enterFirstName(details.basic_details.first_name);
        await leadsPage.enterLastName(details.basic_details.last_name);
        await leadsPage.enterEmail(email_address_2);
        await leadsPage.clickOnSaveAsApplication();
        await leadsPage.verifyLeadConvertedSnackbarMessageIsDisplayed();
    });

    test.only("Lead creation with Buy an existing", async ()=>{
        await adminLoginPage.launchSite(url);
        await adminLoginPage.verifyAdminLoginPageIsDisplayed();
        await adminLoginPage.loginToApplication(advisor_email, advisor_password);
        await adminHomePage.clickOnLeadsSideMenuLink();

        await leadsPage.clickOnAddButton();
        await leadsPage.selectSalutation(details.basic_details.salutation);
        await leadsPage.enterFirstName(details.basic_details.first_name);
        await leadsPage.enterLastName(last_name_3);
        await leadsPage.enterEmail(email_address_3);
        await leadsPage.enterPhoneNumber(details.basic_details.phone_number);
        await leadsPage.selectEmploymentStatus(details.basic_details.employment_status);
        await leadsPage.enterMonthlyIncome(details.basic_details.monthly_income);
        await leadsPage.selectApplyingAlone(details.basic_details.applying_alone);
        await leadsPage.selectResidencyStatus(details.basic_details.residency_status);
        await leadsPage.enterExternalId(details.basic_details.external_id);
        await leadsPage.selectFinancingType(details.Buy_an_existing_property_details.financing_type);
        await leadsPage.enterPurchasePriceAmount(details.Buy_an_existing_property_details.purchase_price);
        await leadsPage.enterTheMaxDownPaymentAmount(details.Buy_an_existing_property_details.max_downpayment);
        await leadsPage.selectFoundProperty(details.Buy_an_existing_property_details.found_property);
        await leadsPage.selectPropertyType(details.Buy_an_existing_property_details.property_type);
        await leadsPage.selectZipAndCity(details.Buy_an_existing_property_details.zip, details.Buy_an_existing_property_details.city);
        await leadsPage.enterRealEstateAgentFees(details.Buy_an_existing_property_details.real_estate_agent_fees);
        await leadsPage.clickOnSaveAsApplication();
        await leadsPage.verifyLeadConvertedSnackbarMessageIsDisplayed();
        await leadsPage.clickOnSendEmailButton();
        await overviewPage.verifyApplicantNameIsDisplayedInOverviewPage(details.basic_details.first_name, last_name_3);
        await overviewPage.verifyEmailAddressIsDisplayed(email_address_3);
        await overviewPage.verifyPhoneNumberIsDisplayed(details.basic_details.phone_number);
        await overviewPage.verifyFinancingProjectIsDisplayed(details.Buy_an_existing_property_details.financing_type);
        await adminHomePage.logout()

    })


    test.afterEach(async () => {
        await page.close();
        //await context.close();
    });
});