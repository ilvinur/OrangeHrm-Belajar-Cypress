class LoginPage {

    url = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";

    usernameField = "input[name='username']";
    passwordField = "input[name='password']";
    loginButton = "button[type='submit']";
    errorMessage = ".oxd-alert-content-text";
    requiredMessage = ".oxd-input-field-error-message";

    visit() {
        cy.visit(this.url);
    }

    typeUsername(username) {
        cy.get(this.usernameField).type(username);
    }

    typePassword(password) {
        cy.get(this.passwordField).type(password);
    }

    clickLogin() {
        cy.get(this.loginButton).click();
    }

    assertDashboardVisible() {
        cy.url().should("include", "/dashboard");
        cy.contains("Dashboard").should("be.visible");
    }

    assertInvalidCredentials() {
        cy.get(this.errorMessage)
          .should("contain", "Invalid credentials");
    }

    assertRequiredField() {
        cy.get(this.requiredMessage)
          .should("contain", "Required");
    }
}

export default LoginPage;
