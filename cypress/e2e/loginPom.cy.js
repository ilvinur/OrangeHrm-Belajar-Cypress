import LoginPage from "../support/POM/loginPom";

describe('OrangeHRM Login Feature Automation with POM', () => {

    const login = new LoginPage();

    let data;

    beforeEach(() => {
        cy.fixture("dataLoginPom").then((jsonData) => {
            data = jsonData;
        });

        login.visit();
        cy.get(login.usernameField).should("be.visible");
    });

    // TEST CASE 1 - Login valid
    it('TestCase_001 - Login valid', () => {
        login.typeUsername(data.valid.username);
        login.typePassword(data.valid.password);
        login.clickLogin();
        login.assertDashboardVisible();
    });

    // TEST CASE 2 - Password salah
    it('TestCase_002 - Password salah', () => {
        login.typeUsername(data.wrongPassword.username);
        login.typePassword(data.wrongPassword.password);
        login.clickLogin();
        login.assertInvalidCredentials();
    });

    // TEST CASE 3 - Username salah
    it('TestCase_003 - Username salah', () => {
        login.typeUsername(data.wrongUsername.username);
        login.typePassword(data.wrongUsername.password);
        login.clickLogin();
        login.assertInvalidCredentials();
    });

    // TEST CASE 4 - Username kosong
    it('TestCase_004 - Username kosong', () => {
        login.typePassword(data.emptyUsername.password);
        login.clickLogin();
        login.assertRequiredField();
    });

    // TEST CASE 5 - Password kosong
    it('TestCase_005 - Password kosong', () => {
        login.typeUsername(data.emptyPassword.username);
        login.clickLogin();
        login.assertRequiredField();
    });

    // TEST CASE 6 - Username & Password kosong
    it('TestCase_006 - Username dan Password kosong', () => {
        login.clickLogin();
        cy.get(login.requiredMessage)
          .should("have.length", 2)
          .each((msg) => {
              expect(msg).to.contain("Required");
          });
    });

    // TEST CASE 7 - Case Sensitivity
    it('TestCase_007 - Case Sensitivity', () => {
        login.typeUsername(data.caseSensitivity.username);
        login.typePassword(data.caseSensitivity.password);
        login.clickLogin();
        login.assertInvalidCredentials();
    });

    // TEST CASE 8 - Password kurang dari 8 karakter
    it('TestCase_008 - Password kurang dari 8 karakter', () => {
        login.typeUsername(data.shortPassword.username);
        login.typePassword(data.shortPassword.password);
        login.clickLogin();
        login.assertInvalidCredentials();
    });

    // TEST CASE 9 - Special Character
    it('TestCase_009 - Special Character', () => {
        login.typeUsername(data.specialChar.username);
        login.typePassword(data.specialChar.password);
        login.clickLogin();
        login.assertInvalidCredentials();
    });

});
