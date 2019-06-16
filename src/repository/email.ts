/**
 * returns active user's email
 */
export function getActiveEmail() {
    return Session.getActiveUser().getEmail();
}

/**
 * sends email
 *
 * @param email
 * @param subject
 * @param html
 */
export function sendEmail(email: string, subject: string, html: string) {
    MailApp.sendEmail({
        to: email,
        subject: subject,
        htmlBody: html
    });
}


export function sendBulkEmail(emails: string[], subject, html) {
    emails.forEach(email =>
        sendEmail(email, subject, html)
    )
}
