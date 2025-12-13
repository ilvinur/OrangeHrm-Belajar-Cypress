import LoginPageTest from "../../support/FinalProjectPOM_OrangeHRM/LoginPage";
import ForgotPassword from "../../support/FinalProjectPOM_OrangeHRM/ForgotPasswordPage";

const login = new LoginPageTest();
const password = new ForgotPassword();
let data;

describe('OrangeHRM Forgot Password with POM & intercept', () => {
    beforeEach(() => {
        login.visit();
        cy.fixture("userFP").then((jsonData) => {
            data = jsonData;
        });

        //INTERCEPT SEND PASSWORD RESET
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/sendPasswordReset').as('sendPasswordReset');
    })

    //TEST CASE 101 RESET PASSWORD BERHASIL
    it('TestCase_101 - Reset password berhasil', () => {
        password.clickForgotPasswordLink();
        password.typeUsername(data.emptyPassword.username);
        password.clickReset();

        cy.wait('@sendPasswordReset').its('response.statusCode').should('eq',200);

        password.assertResetSuccess();
    });

    //TEST CASE 102 RESET PASSWORD TANPA USERNAME
    it('TestCase_102 - Reset password gagal tanpa username', () => {
        password.clickForgotPasswordLink();
        password.clickReset();

        cy.wait('@sendPasswordReset').its('response.statusCode').should('eq',200);

        password.assertVisible();
    });

    //TEST CASE 103 RESET PASSWORD DENGAN USERNAME TIDAK TERDAFTAR
    it('TestCase_103 - Reset password dengan username tidak terdaftar', () => {
        password.clickForgotPasswordLink();
        password.clickReset();

        cy.wait('@sendPasswordReset').its('response.statusCode').should('eq',200);

        password.assertResetSuccess();
    });

    //TEST CASE 104 RESET PASSWORD DENGAN KARAKTER SPECIAL
    it('Reset password dengan karakter spesial', () => {
        password.clickForgotPasswordLink();
        password.typeUsername(data.specialChar.username);
        password.clickReset();

        cy.wait('@sendPasswordReset').its('response.statusCode').should('eq',200);

        password.assertResetSuccess();
    });
});