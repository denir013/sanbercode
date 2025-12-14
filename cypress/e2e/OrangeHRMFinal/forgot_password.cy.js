import LoginPage from "../../support/pageObjects/LoginPage2";
import loginData from "../../fixtures/loginData.json";

describe('Forgot Password', () => {

    it('TC-001 Forgot Password Page', () => {
        LoginPage.visit();
        cy.intercept('GET',`${LoginPage.forgotPasswordURL}`).as('resetPass');
        LoginPage.elements.forgotPasswordLink().click();
        cy.wait('@resetPass').its('response.statusCode').should('eq', 200);
    });

    it('TC-002 Valid Username', () => {
        LoginPage.visit();
        LoginPage.elements.forgotPasswordLink().click();
        LoginPage.elements.username().type(loginData.valid.username);
        cy.intercept('GET',`${LoginPage.forgotPasswordReset}`).as('resetPass');
        LoginPage.elements.resetBtn().click();
        cy.wait('@resetPass').its('response.statusCode').should('eq', 200);
    });

    it('TC-003 Invalid Username', () => {
        LoginPage.visit();
        LoginPage.elements.forgotPasswordLink().click();
        LoginPage.elements.username().type(loginData.invalid.username);
        cy.intercept('GET',`${LoginPage.forgotPasswordReset}`).as('resetPass');
        LoginPage.elements.resetBtn().click();
        cy.wait('@resetPass').its('response.statusCode').should('eq', 200);
    });

    it('TC-004 Required Username', () => {
        cy.intercept('GET',`${LoginPage.url}`).as('pageLoad');
        LoginPage.visit();
        LoginPage.elements.forgotPasswordLink().click();
        LoginPage.elements.resetBtn().click();
        LoginPage.elements.errorMsg().should('be.visible').and('contain','Required');
        cy.wait('@pageLoad');
    });

    it('TC-005 Cancel Button', () => {
        LoginPage.visit();
        LoginPage.elements.forgotPasswordLink().click();
        cy.intercept('GET',`${LoginPage.url}`).as('resetPass');
        LoginPage.elements.cancelBtn().click();
        cy.wait('@resetPass').its('response.statusCode').should('eq', 200);
    });
});