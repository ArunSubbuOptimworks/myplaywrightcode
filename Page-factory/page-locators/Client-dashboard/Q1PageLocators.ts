export class Q1PageLocators {
    static q1_page_finlink_logo = "(//a[contains(@class,'navbar-brand')]/img)[1]"
    static existing_language_text_locator ="//div[@class='navbar-item text-uppercase']" 
    static en_language_Option ="#q1_language__opt_1"
    static zip_field ="#q1_zip_code_txt"
    static employment_status_dropdown ="#q1_employment_status_sel"
    static salutationDropDown = "#q1_contact_salutation_sel"
    static firstName_field ="#Q1.questions.user_meta.first_name"
    static lastName_field ="#Q1.questions.user_meta.last_name"
    static email_Field ="#Q1.questions.email"
    static phoneNumber_Field ="#_Q1.questions.user_meta.phone_number_internal_txt"
    static general_Terms_checkbox ="//input[@type='checkbox']"
    static get_mortgage_advice ="//div[normalize-space(text())='Get mortgage advice']"
    static password_field ="#q1_register_password_txt"
    static password_confirmation_field ="#q1_register_password_confirmation_txt"
    static continue_Button ="#q1_navigation_continue_btn>button"
    static next_Button ="//button//div[normalize-space(text())='Next']"
}