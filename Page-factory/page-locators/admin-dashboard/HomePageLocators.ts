export class HomePageLocators {
    static advisor_profile_section = "//*[@class='user-box']/.."
    static logout_button = "//span[normalize-space()='Logout']"
    static loading_skeleton = "(//div[@class='c-skeleton'])[6]"
    static search_box_loan_application_page = "//input[contains(@placeholder,'Search name')]"
    static search_button_loan_application_page="//span[normalize-space(text())='Search']"
    static custom_links_button="//span[normalize-space(text())='Custom links']"
    static custom_links_page_title ="//h1[normalize-space(text())='Custom links']"
    static company_invitation_link ="(//h3[text()='Company invitation link:']/../div)[5]"
    static personal_invitation_link ="//h3[normalize-space(text())='Personal invitation link:']/following-sibling::div//button"
    static next_page_pagination_arrow_icon ="//button[@aria-label='Next page']"
}