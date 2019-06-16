export const getActiveEmail = () =>
    Session.getActiveUser().getEmail();

/**
 * sends email to the user himself
 **/
export function sendEmail(email, subject, html) {
    MailApp.sendEmail({
        to: email,
        subject: subject,
        htmlBody: html
    });
}
