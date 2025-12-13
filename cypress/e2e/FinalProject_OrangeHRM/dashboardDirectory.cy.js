import LoginPageTest from "../../support/FinalProjectPOM_OrangeHRM/LoginPage";
import DasboardDirectory from "../../support/FinalProjectPOM_OrangeHRM/DasboardDirectoryPage";

describe('OrangeHRM Directory Feature Automation with POM & Intercept', () => {
    const login = new LoginPageTest();
    const directory = new DasboardDirectory();
    let data;

    beforeEach(() => {
        //INTERCEPT VIEW DIRECTORY
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory').as('viewDirectory');

        cy.fixture("dataLoginPom").then((data) => {
            // Login
            login.visit();
            login.typeUsername(data.valid.username);
            login.typePassword(data.valid.password);
            login.clickLogin();
            login.assertDashboardVisible();

            // Open Directory
            directory.openDirectoryFromDashboard();
            directory.assertDirectoryPageVisible();
        });
    });

    //TEST CASE 201 SEARCH EMPLOYEE VALID
    it('TestCase_201 Search employee valid', () => {
        directory.typeSearchEmployee('a');
        directory.clickSearch();

        cy.wait('@viewDirectory').its('response.statusCode').should('eq',200);
        directory.assertSearchResultVisible();
    });

    //TEST CASE 202 SEARCH TANPA INPUT KEYWORD
    it('TestCase_202 Search tanpa input keyword', () => {
        directory.clickSearch();

        cy.wait('@viewDirectory').its('response.statusCode').should('eq',200);
        directory.assertNoErrorAfterSearch();
    });

    //TEST CASE 203 SEARCH DENGAN DATA TIDAK DITEMUKAN
    it('TestCase_203 Search dengan data tidak ditemukan', () => {
        directory.typeSearchEmployee('zzqqqqwzzz');
        directory.clickSearch();

        cy.wait('@viewDirectory').its('response.statusCode').should('eq',200);
        directory.assertNoRecordFound();
    });

    //TEST CASE 204 SEARCH DENGAN KARAKTER SPESIAL
    it('TestCase_204 Search dengan karakter spesial', () => {
        directory.typeSearchEmployee('!@#%%');
        directory.clickSearch();

        cy.wait('@viewDirectory').its('response.statusCode').should('eq',200);
        directory.assertNoErrorAfterSearch();
    });

    //TEST CASE 205 SEARCH DENGAN ANGKA
    it('TestCase_205 Search dengan angka', () => {
        directory.typeSearchEmployee('123344');
        directory.clickSearch();

        cy.wait('@viewDirectory').its('response.statusCode').should('eq',200);
        directory.assertNoErrorAfterSearch();
    });

    //TEST CASE 206 RESET PENCARIAN
    it("TestCase_206 Reset pencarian", () => {
        directory.typeSearchEmployee('a');
        directory.clickReset();

        cy.wait('@viewDirectory').its('response.statusCode').should('eq',200);
        directory.assertDirectoryPageVisible();
    });

    //TEST CASE 207 REFRESH HALAMAN DIRECTORY
    it("TestCase_207 Refresh halaman Directory", () => {
        directory.typeSearchEmployee('a');
        directory.clickSearch();
        cy.reload();

        cy.wait('@viewDirectory').its('response.statusCode').should('eq',200);
        directory.assertDirectoryPageVisible();
    });
});