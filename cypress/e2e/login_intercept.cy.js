describe('How to using Intercept in cypress', () => {
    const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

    beforeEach(() => {
        cy.visit(url);
        cy.get('input[name="username"]').should('be.visible');
    });

    // TEST CASE 1 - Login valid
    it('TestCase_001 - Login dengan username dan password valid & intercept action summary', () => {

        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('admin123');

        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSumary');
        cy.get('button[type="submit"]').click();

        cy.wait('@actionSumary').its('response.statusCode').should('eq',200);
    });

    // TEST CASE 2 Password salah
    it('TestCase_002 Login gagal dengan password salah & intercept messages', () => {
        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('messages');

        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('123');
        cy.get('button[type="submit"]').click();

        cy.wait('@messages').its('response.statusCode').should('be.oneOf', [200, 304]);
        cy.get('.oxd-alert-content-text')
          .should('contain', 'Invalid credentials');
    });

    // TEST CASE 3 LOGIN VALID & INTERCEPT SHORTCUTS WIDGET
    it("TestCase_003 Login valid & intercept shortcuts widget", () => {
        cy.intercept('GET','/web/index.php/api/v2/dashboard/shortcuts').as("shortcuts");

        cy.get("input[name='username']").type("Admin");
        cy.get("input[name='password']").type("admin123");
        cy.get("button[type='submit']").click();

        cy.wait('@shortcuts').its('response.statusCode').should('eq', 200);
    });

    // TEST CASE 4 Login valid & intercept subunit
    it("TestCase_004 Login valid & intercept time-at-work", () => {
        cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/subunit').as('subunit');

        cy.get("input[name='username']").type("Admin");
        cy.get("input[name='password']").type("admin123");
        cy.get("button[type='submit']").click();

        cy.wait('@subunit').its('response.statusCode').should('eq', 200);
    });

    // TEST CASE 5 login valid & intercept location
    it("TestCase_005 Login valid & intercept location", () => {
      cy.intercept('GET','https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/locations').as('location');

        cy.get("input[name='username']").type("Admin");
        cy.get("input[name='password']").type("admin123");
        cy.get("button[type='submit']").click();

        cy.wait('@location').its('response.statusCode').should('eq', 200);
    });

});