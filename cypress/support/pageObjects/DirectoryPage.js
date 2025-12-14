
class DirectoryPage {

    interceptDirectory(){
        cy.intercept('GET','**/directory/viewDirectory').as('directory')
    }
    
    clickDirectory() {
        cy.get('.oxd-main-menu-item-wrapper')
        cy.contains('Directory').click()
    }

    assertDirectory(){
        cy.url().should('include','/directory')
    }

    formFilterButton() {
        cy.get('.oxd-table-filter-header')
        cy.get('.oxd-icon-button')
        cy.get('.bi-caret-up-fill').click()
    } 

    employeeName() {
        cy.get('.oxd-autocomplete-text-input--active').type("admin")
    }

    resetDirectory() {
        cy.get('.oxd-table-filter').click()
        cy.get('.oxd-button--ghost').click()
    }

    invalidEemployeeName() { 
        cy.get('.oxd-autocomplete-text-input--active').type("admin")
        cy.get('.oxd-table-filter').click()
        cy.get('.oxd-input-field-error-message').should('be.visible').and('contain','Invalid');
    }

    jobTitle() {
        cy.get('.oxd-select-text').eq(0).click()
        cy.get('.oxd-select-dropdown').contains('QA Engineer').click()
    }

    searchDirectory() {
        cy.get('.oxd-button--secondary').click()
    }

    locationDirectory() {
        cy.get('.oxd-select-text').eq(1).click()
        cy.get('.oxd-select-dropdown').contains('Texas R&D').click()
    }

}

export default new DirectoryPage