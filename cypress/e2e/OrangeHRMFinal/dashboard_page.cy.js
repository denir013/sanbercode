import LoginPage from "../../support/pageObjects/LoginPage2";
import DashboardPage from "../../support/pageObjects/DashboardPage";
import loginData from "../../fixtures/loginData.json";

describe('Dashboard Page', () => {

    it('TC-001 Page Login > Page Dashboard', () => {
        LoginPage.visit();
        LoginPage.login(loginData.valid.username, loginData.valid.password);
        DashboardPage.interceptDashboard()
    });

    it('TC-002 Collapsed Sidebar', () => {
        LoginPage.visit();
        LoginPage.login(loginData.valid.username, loginData.valid.password);
        DashboardPage.collapseButton().click()
        DashboardPage.sidebar().should('have.class', 'toggled')
    })

    it('TC-003 Content Displayed', () => {
        LoginPage.visit();
        LoginPage.login(loginData.valid.username, loginData.valid.password);
        cy.get('.oxd-layout-context')
    })

    it('TC-004 Help Button', () => {
        LoginPage.visit();
        LoginPage.login(loginData.valid.username, loginData.valid.password);
        cy.get('button[title="Help"]').should('be.visible').click()
    })

    it('TC-005 User Dropdown > About', () => {
        LoginPage.visit();
        LoginPage.login(loginData.valid.username, loginData.valid.password);
        DashboardPage.userDropdown().click()
        cy.contains('About').click()
        cy.contains('OrangeHRM').should('be.visible')
    })

    it('TC-006 User Dropdown > Support', () => {
        LoginPage.visit();
        LoginPage.login(loginData.valid.username, loginData.valid.password);
        DashboardPage.userDropdown().click()
        cy.contains('Support').click()
        cy.url().should('include', 'support')
    })

    it('TC-007 User Dropdown > Change Password', () => {
        LoginPage.visit();
        LoginPage.login(loginData.valid.username, loginData.valid.password);
        DashboardPage.userDropdown().click()
        cy.contains('Change Password').click()
        cy.url().should('include', 'updatePassword')
    })

    it('TC-008 My Actions > Click Widgets Pending', () => {
        LoginPage.visit();
        LoginPage.login(loginData.valid.username, loginData.valid.password);
        cy.intercept('GET','**/web/index.php/performance/searchEvaluatePerformanceReview').as('WidgetsList');
        cy.get('.oxd-icon-button--danger').should('be.visible').click()
        cy.wait('@WidgetsList').its('response.statusCode').should('eq',200);
    })
   
    it('TC-009 My Actions > Click Widgets Candidates', () => {
        LoginPage.visit();
        LoginPage.login(loginData.valid.username, loginData.valid.password);
        cy.intercept('GET','**/web/index.php/recruitment/viewCandidates?statusId=4').as('WidgetsCandidates');
        cy.get('.oxd-icon-button--info').should('be.visible').click()
        cy.wait('@WidgetsCandidates').its('response.statusCode').should('eq',200);
    })

    it('TC-010 Quick Launch Menu', () => {
        LoginPage.visit();
        LoginPage.login(loginData.valid.username, loginData.valid.password);
        DashboardPage.quickLaunch('Assign Leave').should('be.visible')
        DashboardPage.quickLaunch('Leave List').should('be.visible')
        DashboardPage.quickLaunch('Timesheets').should('be.visible')
        DashboardPage.quickLaunch('Apply Leave').should('be.visible')
        DashboardPage.quickLaunch('My Leave').should('be.visible')
        DashboardPage.quickLaunch('My Timesheet').should('be.visible')
    })

    it('TC-011 Buzz Latest Posts > Buzz Newsfeed', () => {
        LoginPage.visit();
        LoginPage.login(loginData.valid.username, loginData.valid.password);
        cy.contains('Buzz Latest Posts').should('be.visible')
    })

    it('TC-012 Employee Distribution charts', () => {
        LoginPage.visit();
        LoginPage.login(loginData.valid.username, loginData.valid.password);
        cy.contains('Employee Distribution by Sub Unit').should('be.visible')
        cy.contains('Employee Distribution by Location').should('be.visible')
    })

})