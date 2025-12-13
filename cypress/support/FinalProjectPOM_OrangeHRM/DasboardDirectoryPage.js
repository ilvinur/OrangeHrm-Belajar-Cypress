class DashboardDirectory {
    directoryMenu = 'a[href="/web/index.php/directory/viewDirectory"]';

    searchInput = 'input[placeholder="Type for hints..."]';
    searchButton = 'button[type="submit"]';
    resetButton = 'button[type="reset"]';

    employeeCard = '.oxd-grid-item';
    pageHeader = 'h6.oxd-text--h6';

    openDirectoryFromDashboard() {
        cy.get(this.directoryMenu)
          .should("be.visible")
          .click();
    }

    typeSearchEmployee(value) {
        cy.get(this.searchInput)
          .clear()
          .type(value);
    }

    clickSearch() {
        cy.get(this.searchButton).click();
    }

    clickReset() {
        cy.get(this.resetButton).click();
    }
    assertDirectoryPageVisible() {
        cy.url().should("include", "/directory");
        cy.contains("Directory").should("be.visible");
    }

    assertSearchResultVisible() {
        cy.get(this.employeeCard).should("exist");
    }

    assertNoErrorAfterSearch() {
        cy.get(this.pageHeader).should("be.visible");
    }
    assertNoRecordFound() {
        cy.contains("No Records Found")
          .should("be.visible");
    }
}

export default DashboardDirectory;
