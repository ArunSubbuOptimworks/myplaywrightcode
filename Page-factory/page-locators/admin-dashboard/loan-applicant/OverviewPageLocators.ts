export class OverviewPageLocators {
    static email_text = "#loan_applicant_email"
    static phone_number_text = "#loan_applicant_phone_number"
    static financing_project_text = "#loan_applicant_financing_project"
    static applicant_more_button = "//button[@id='loan_applicant_more_btn']"
    static delete_customer_data = "#loan_applicant_delete_customer_data_btn"
    static delete_customer_data_popup_header_text ="#dialog_confirmation_delete_title_h2"
    static delete_button_delete_customer_data_popup = "//button[@id='dialog_confirmation_delete_btn']"
    static record_deleted_snack_bar = "//span[normalize-space(text())='This record will be deleted shortly.']"
    static loading_progress_circle ="//mat-spinner[@role='progressbar']"
}