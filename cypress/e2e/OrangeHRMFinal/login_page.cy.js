import LoginPage from "../../support/pageObjects/LoginPage2";
import loginData from "../../fixtures/loginData.json";

describe('Login Page', () => {

    it('TC-001 Login Valid', () => {
        LoginPage.visit();
        cy.intercept('GET', '**/web/index.php/api/v2/dashboard/shortcuts').as('loginValid');
        LoginPage.login(loginData.valid.username, loginData.valid.password);
        cy.wait('@loginValid').its('response.statusCode').should('eq', 200);
    });

    it('TC-002 Username not Registered', () => {
        LoginPage.visit();
        cy.intercept('POST', '**/auth/validate').as('loginRequest');
        LoginPage.login(loginData.invalid.username, loginData.valid.password);
        LoginPage.elements.invalidAlert().should('be.visible').and('contain', 'Invalid credentials');
        cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);
    });

    it('TC-003 Wrong Password', () => {
        LoginPage.visit();
        cy.intercept('POST', '**/auth/validate').as('loginRequest');
        LoginPage.login(loginData.valid.username, loginData.invalid.password);
        LoginPage.elements.invalidAlert().should('be.visible').and('contain', 'Invalid credentials');
        cy.wait('@loginRequest').its('response.statusCode').should('eq', 302);
    });

    it('TC-004 Input Text Login Required', () => {
        cy.intercept('GET','**/auth/login').as('pageLoad');
        LoginPage.visit();
        LoginPage.elements.loginBtn().click();
        LoginPage.elements.errorMsg().should('be.visible').and('contain','Required');
        cy.wait('@pageLoad');
    });

    it('TC-005 Input Text Username Required', () => {
        cy.intercept('GET','**/auth/login').as('pageLoad');
        LoginPage.visit();
        LoginPage.login(loginData.valid.password);
        LoginPage.elements.loginBtn().click();
        LoginPage.elements.errorMsg().should('be.visible').and('contain','Required');
        cy.wait('@pageLoad');
    });

    it('TC-006 Input Text Password Required', () => {
        cy.intercept('GET','**/auth/login').as('pageLoad');
        LoginPage.visit();
        LoginPage.login(loginData.valid.username);
        LoginPage.elements.loginBtn().click();
        LoginPage.elements.errorMsg().should('be.visible').and('contain','Required');
        cy.wait('@pageLoad');
    });

    it('TC-007 URL Text Forgot Password', () => {
        LoginPage.visit();
        cy.intercept('GET',`${LoginPage.forgotPasswordURL}`).as('resetPass');
        LoginPage.elements.forgotPasswordLink().click();
        cy.wait('@resetPass').its('response.statusCode').should('eq', 200);
    });

    it('TC-008 URL Icon LinkedIn', () => {
        LoginPage.visit();
        cy.intercept('GET', `${LoginPage.social.linkedin}**`).as('linkedin');
        LoginPage.elements.socialIcon(LoginPage.social.linkedin).click();
        cy.wait('@linkedin').its('response.statusCode').should('exist');
    });

    it('TC-009 URL Icon Facebook', () => {
        LoginPage.visit();
        cy.intercept('GET', `${LoginPage.social.facebook}**`).as('facebook');
        LoginPage.elements.socialIcon(LoginPage.social.facebook).click();
        cy.wait('@facebook').its('response.statusCode').should('exist');
    });

    it('TC-010 URL Icon Twitter', () => {
        LoginPage.visit();
        cy.intercept('GET', `${LoginPage.social.twitter}**`).as('twitter');
        LoginPage.elements.socialIcon(LoginPage.social.twitter).click();
        cy.wait('@twitter').its('response.statusCode').should('exist');
    });

    it('TC-011 URL Icon Youtube', () => {
        LoginPage.visit();
        cy.intercept('GET', `${LoginPage.social.youtube}**`).as('youtube');
        LoginPage.elements.socialIconYT(LoginPage.social.youtube).click();
        cy.wait('@youtube').its('response.statusCode').should('exist');
    });

    it('TC-012 URL Text OrangeHRM, Inc', () => {
        LoginPage.visit();
        LoginPage.elements.footerOrangeHRMText().then($a => {
            const url = $a.prop('href');
            cy.request(url).its('status').should('eq', 200);
        });
    });
});