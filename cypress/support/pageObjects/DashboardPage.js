
class DashboardPage {
    url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
    sidebar() {
        return cy.get('.oxd-sidepanel')
    }

    collapseButton() {
        return cy.get('.oxd-main-menu-button')
    }   
    
    formFilterButton() {
        cy.get('.oxd-table-filter-header')
        cy.get('.oxd-icon-button')
        cy.get('.bi-caret-up-fill').click()
    } 

   

    clickDirectory() {
        cy.get('.oxd-main-menu-item-wrapper')
        cy.contains('Directory').click()
    }

    resetDirectory() {
        cy.get('.oxd-table-filter').click()
        cy.get('.oxd-button--ghost').click()
    }


    searchDirectory() {
        cy.get('.oxd-button--secondary').click()
    }


    employeeName() {
        cy.get('.oxd-autocomplete-text-input--active').type("admin")
    }


    invalidEemployeeName() { 
        cy.get('.oxd-autocomplete-text-input--active').type("admin")
        cy.get('.oxd-table-filter').click()
        cy.get('.oxd-input-field-error-message')
        .should('be.visible')
            .and('contain','Invalid');
    }


    jobTitle() {
        cy.get('.oxd-select-text').eq(0).click()
        cy.get('.oxd-select-dropdown').contains('QA Engineer').click()
    }

    locationDirectory() {
        cy.get('.oxd-select-text').eq(1).click()
        cy.get('.oxd-select-dropdown').contains('Texas R&D').click()
    }

    
    userDropdown() {
        return cy.get('.oxd-userdropdown-tab')
    }


    assertDashboard(){
        cy.url().should('include','/dashboard');
    }

    interceptDashboard(){
        cy.intercept('GET','**/dashboard/index').as('dashboard')
    }

    interceptDirectory(){
         cy.intercept('GET','**/directory/viewDirectory').as('directory')
    }

    assertDirectory(){
        cy.url().should('include','/directory');
    }

    quickLaunch(title) {
        return cy.contains('.oxd-text', title)
    }


    login(username, password) {
        if (username) this.elements.username().type(username);
        if (password) this.elements.password().type(password);
        this.elements.loginBtn().click();
    }

   dashboardLogin() {
        cy.visit(this.url);
        cy.login(this.username,password);
    }



    social = {
        help: 'https://starterhelp.orangehrm.com/hc/en-us'
    };
    
}

export default new DashboardPage