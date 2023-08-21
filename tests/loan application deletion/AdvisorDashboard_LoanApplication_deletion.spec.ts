import {test} from '@playwright/test';
import details from "../../fixtures/LeadCreationDetails.json";
import AdminLoginPage from "../../Page-factory/page-methods/admin-dashboard/LoginPageMethods"
import HomePage from "../../Page-factory/page-methods/admin-dashboard/HomePageMethods"
import dotenv from 'dotenv';
dotenv.config();

let page, adminLoginPage : AdminLoginPage, adminHomePage: HomePage

const url = process.env.admin_url;
const admin_email = process.env.admin_email_1;
const admin_password = process.env.admin_password_1;
const advisor_email = process.env.advisor_email_1;
const advisor_password = process.env.advisor_password_1;
let context;

test.describe("Create a lead by using different financing types ", () => {

    test.beforeEach(async ({ browser }, testInfo) => {
        context = await browser.newContext()
        page = await context.newPage();
        adminLoginPage = new AdminLoginPage(page);
        adminHomePage = new HomePage(page);
    });

    test("delete all loan application ", async () => {
        test.setTimeout(500000);
        await adminLoginPage.launchSite(url);
        await adminLoginPage.verifyAdminLoginPageIsDisplayed();
        await adminLoginPage.loginToApplication(admin_email, admin_password);
        await adminHomePage.verifyHomePageIsDisplayed();
        await page.waitForTimeout(20000);
        await adminHomePage.clickOnTheFirstLoanApplicationAndDeleteTheOpenedLoanApplication();
         });

    test.afterEach(async () => {
        await page.close();
    });

});

