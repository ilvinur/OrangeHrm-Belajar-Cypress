describe('OrangeHRM Login Feature Automation', () => {

    // URL global
    const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

    beforeEach(() => {
        cy.visit(url);
        cy.get('input[name="username"]').should('be.visible');
    });

    // TEST CASE 1 - Login valid
    it('TestCase_001 - Login dengan username dan password valid', () => {
        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();

        // Assertion harus masuk ke Dashboard
        cy.url().should('include', '/dashboard');
        cy.contains('Dashboard').should('be.visible');
    });

    // TEST CASE 2 Password salah
    it('TestCase_002 Login gagal dengan password salah', () => {
        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('123');
        cy.get('button[type="submit"]').click();

        cy.get('.oxd-alert-content-text')
          .should('contain', 'Invalid credentials');
    });

    // TEST CASE 3 Username salah
    it('TestCase_003 Login gagal dengan username salah', () => {
        cy.get('input[name="username"]').type('Ad');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();

        cy.get('.oxd-alert-content-text')
          .should('contain', 'Invalid credentials');
    });

    // TEST CASE 4 Username kosong
    it('TestCase_004 Login gagal dengan username kosong', () => {
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();

        cy.get('.oxd-input-field-error-message')
          .should('contain', 'Required');
    });

    // TEST CASE 5 Password kosong
    it('TestCase_005 Login gagal dengan password kosong', () => {
        cy.get('input[name="username"]').type('Admin');
        cy.get('button[type="submit"]').click();

        cy.get('.oxd-input-field-error-message')
          .should('contain', 'Required');
    });

    // TEST CASE 6 Username dan Password kosong
    it('TestCase_006 Login gagal dengan username dan password kosong', () => {
        cy.get('button[type="submit"]').click();
        cy.get('.oxd-input-field-error-message')
          .should('have.length', 2)
          .and((messages) => {
              expect(messages[0]).to.contain('Required');
              expect(messages[1]).to.contain('Required');
          });
    });

    // TEST CASE 7 - input case sensitivity
    it('TestCase_007 - Login gagal dengan username dan password case sensitivity', () => {
        cy.get('input[name="username"]').type('admin');
        cy.get('input[name="password"]').type('ADMIN123');
        cy.get('button[type="submit"]').click();
        cy.get('.oxd-alert-content-text')
          .should('contain', 'Invalid credentials');
    }); 

    // TEST CASE 8 - password kurang dari 8 karakter
    it('TestCase_008 - Login gagal dengan password kurang dari 8 karakter', () => {
        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('adm1n');
        cy.get('button[type="submit"]').click();
        cy.get('.oxd-alert-content-text')
          .should('contain', 'Invalid credentials');
    });

    // TEST CASE 9 - special characters di username dan password
    it('TestCase_009 - Login gagal dengan special characters di username dan password', () => {
        cy.get('input[name="username"]').type('Adm!n@123');
        cy.get('input[name="password"]').type('adm!n@123');
        cy.get('button[type="submit"]').click();
        cy.get('.oxd-alert-content-text')
          .should('contain', 'Invalid credentials');
    });

});
