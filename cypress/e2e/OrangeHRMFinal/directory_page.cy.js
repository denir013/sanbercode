import LoginPage from "../../support/pageObjects/LoginPage2";
import DashboardPage from "../../support/pageObjects/DashboardPage";
import DirectoryPage from "../../support/pageObjects/DirectoryPage";
import loginData from "../../fixtures/loginData.json";

describe('Directory Page', () => {

    it('TC-001 Page Dashboard > Page Directory', () => {
        LoginPage.visit()
        DashboardPage.interceptDashboard()
        LoginPage.login(loginData.valid.username, loginData.valid.password);
        DashboardPage.assertDashboard()
        DirectoryPage.interceptDirectory()
        DirectoryPage.clickDirectory()
        DirectoryPage.assertDirectory()
    });

    it('TC-002 Hide Directory Form Search', () => {
        LoginPage.visit()
        DashboardPage.interceptDashboard()
        LoginPage.login(loginData.valid.username, loginData.valid.password);
        DashboardPage.assertDashboard()
        DirectoryPage.interceptDirectory()
        DirectoryPage.clickDirectory()
        DirectoryPage.assertDirectory()
        DirectoryPage.formFilterButton()
    });

    it('TC-003 Reset Button', () => {
        LoginPage.visit()
        DashboardPage.interceptDashboard()
        LoginPage.login(loginData.valid.username, loginData.valid.password);
        DashboardPage.assertDashboard()
        DirectoryPage.interceptDirectory()
        DirectoryPage.clickDirectory()
        DirectoryPage.assertDirectory()
        DirectoryPage.employeeName()
        DirectoryPage.resetDirectory()
    });

    it('TC-004 Invalid Employee Name', () => {
        LoginPage.visit()
        DashboardPage.interceptDashboard()
        LoginPage.login(loginData.valid.username, loginData.valid.password);
        DashboardPage.assertDashboard()
        DirectoryPage.interceptDirectory()
        DirectoryPage.clickDirectory()
        DirectoryPage.assertDirectory()
        DirectoryPage.invalidEemployeeName()
    });

    it('TC-005 Job Title Search', () => {
        LoginPage.visit()
        DashboardPage.interceptDashboard()
        LoginPage.login(loginData.valid.username, loginData.valid.password);
        DashboardPage.assertDashboard()
        DirectoryPage.interceptDirectory()
        DirectoryPage.clickDirectory()
        DirectoryPage.assertDirectory()
        DirectoryPage.jobTitle()
        DirectoryPage.searchDirectory()
    });

    it('TC-006 Location Search', () => {
        LoginPage.visit()
        DashboardPage.interceptDashboard()
        LoginPage.login(loginData.valid.username, loginData.valid.password);
        DashboardPage.assertDashboard()
        DirectoryPage.interceptDirectory()
        DirectoryPage.clickDirectory()
        DirectoryPage.assertDirectory()
        DirectoryPage.locationDirectory()
        DirectoryPage.searchDirectory()
    });
})