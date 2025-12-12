import LoginPage from "../../support/pageObjects/LoginPage";
import loginData from "../../fixtures/loginData.json";

describe('Login Page', () => {

    it('Login Valid', () => {
        LoginPage.visit();
        cy.intercept('GET', '**/web/index.php/api/v2/dashboard/shortcuts')
            .as('loginValid');
        LoginPage.login(loginData.valid.username, loginData.valid.password);
        cy.wait('@loginValid')
            .its('response.statusCode')
            .should('eq', 200);
    });

    it('Login Invalid', () => {
        LoginPage.visit();
        cy.intercept('POST', '**/auth/validate').as('loginRequest');
        LoginPage.login(loginData.invalid.username, loginData.invalid.password);
        LoginPage.elements.invalidAlert()
            .should('be.visible')
            .and('contain', 'Invalid credentials');
        cy.wait('@loginRequest')
            .its('response.statusCode')
            .should('eq', 302);
    });

    it('Input Text Login Required', () => {
        cy.intercept('GET','**/auth/login').as('pageLoad');
        LoginPage.visit();
        LoginPage.elements.loginBtn().click();
        LoginPage.elements.errorMsg()
            .should('be.visible')
            .and('contain','Required');
        cy.wait('@pageLoad');
    });

    it('Input Text Username Required', () => {
        cy.intercept('GET','**/auth/login').as('pageLoad');
        LoginPage.visit();
        LoginPage.login(loginData.valid.password);
        LoginPage.elements.loginBtn().click();
        LoginPage.elements.errorMsg()
            .should('be.visible')
            .and('contain','Required');
        cy.wait('@pageLoad');
    });

    it('Input Text Password Required', () => {
        cy.intercept('GET','**/auth/login').as('pageLoad');
        LoginPage.visit();
        LoginPage.login(loginData.valid.username);
        LoginPage.elements.loginBtn().click();
        LoginPage.elements.errorMsg()
            .should('be.visible')
            .and('contain','Required');
        cy.wait('@pageLoad');
    });

    it('Page Login > Page Dashboard', () => {
        LoginPage.visit();
        LoginPage.login(loginData.valid.username, loginData.valid.password);
        cy.url().should('include','/dashboard');
        cy.intercept('GET','**/dashboard/index').as('dashboard');
    });

    it('Forgot Password', () => {
        LoginPage.visit();
        LoginPage.elements.forgotPasswordLink().click();
        LoginPage.elements.username().type(loginData.valid.username);
        cy.intercept('GET','**/web/index.php/core/i18n/messages').as('resetPass');
        LoginPage.elements.resetBtn().click();
        cy.wait('@resetPass')
            .its('response.statusCode')
            .should('eq', 304);
    });

    it('URL Icon LinkedIn', () => {
        LoginPage.visit();
        cy.intercept('GET', `${LoginPage.social.linkedin}**`).as('linkedin');
        LoginPage.elements.socialIcon(LoginPage.social.linkedin).click();
        cy.wait('@linkedin').its('response.statusCode').should('exist');
    });

    it('URL Icon Facebook', () => {
        LoginPage.visit();
        cy.intercept('GET', `${LoginPage.social.facebook}**`).as('facebook');
        LoginPage.elements.socialIcon(LoginPage.social.facebook).click();
        cy.wait('@facebook').its('response.statusCode').should('exist');
    });

    it('URL Icon Twitter', () => {
        LoginPage.visit();
        cy.intercept('GET', `${LoginPage.social.twitter}**`).as('twitter');
        LoginPage.elements.socialIcon(LoginPage.social.twitter).click();
        cy.wait('@twitter').its('response.statusCode').should('exist');
    });

    it('URL Text OrangeHRM, Inc', () => {
        LoginPage.visit();
        LoginPage.elements.footerOrangeHRMText().then($a => {
            const url = $a.prop('href');
            cy.request(url).its('status').should('eq', 200);
        });
    });
});