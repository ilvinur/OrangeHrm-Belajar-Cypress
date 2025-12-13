class ForgotPassword {
    
    forgotPasswordLink = "p.orangehrm-login-forgot-header";
    usernameField = "input[name='username']";
    resetButton = "button[type='submit']";
    successMessage = ".orangehrm-card-container";
    requiredMessage = ".oxd-input-field-error-message";

    clickForgotPasswordLink() {
        cy.get(this.forgotPasswordLink).click();
    }

    typeUsername(username) {
        cy.get(this.usernameField).type(username);
    }

    clickReset() {
        cy.get(this.resetButton).click();
    }

    assertResetSuccess() {
        cy.get(this.successMessage)
          .should("contain", "Reset Password link sent successfully");
    }

    assertRequiredField() {
        cy.get(this.requiredMessage)
          .should("contain", "Required");
    }

    assertVisible() {
        cy.contains("Required").should("be.visible");
    }

}

export default ForgotPassword;