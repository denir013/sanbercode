class LoginPage {

    url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

    social = {
        linkedin: 'https://www.linkedin.com/company/orangehrm/mycompany/',
        facebook: 'https://www.facebook.com/OrangeHRM/',
        twitter: 'https://twitter.com/orangehrm?lang=en',
        youtube: 'https://www.youtube.com/c/OrangeHRMInc'
    };

    forgotPasswordURL = '**/web/index.php/auth/requestPasswordResetCode';
                        
    forgotPasswordReset = '/web/index.php/auth/sendPasswordReset';
    
    elements = {
        username: () => cy.get('[name="username"]'),
        password: () => cy.get('[name="password"]'),
        loginBtn: () => cy.get('button[type="submit"]'),
        errorMsg: () => cy.get('.oxd-input-field-error-message'),
        invalidAlert: () => cy.get('.oxd-alert-content-text'),
        forgotPasswordLink: () => cy.get('.orangehrm-login-forgot-header'),
        resetBtn: () => cy.get('.orangehrm-forgot-password-button--reset'),
        cancelBtn: () => cy.get('.orangehrm-forgot-password-button--cancel'),
        socialIcon: (url) => cy.get(`a[href="${url}"]`).invoke('removeAttr','target').find('svg'),
        socialIconYT: (url) => cy.get(`a[href="${url}"]`).invoke('removeAttr').find('svg'),
        footerOrangeHRMText: () => cy.contains('a', 'OrangeHRM'),
        
    };

    visit() {
        cy.visit(this.url);
    }

    login(username, password) {
        if (username) this.elements.username().type(username);
        if (password) this.elements.password().type(password);
        this.elements.loginBtn().click();
    }

    

    fillUsername(username) {
        cy.get('input[name="username"]').type(username)
    }

    fillPassword(password) {
        cy.get('input[name="password"]').type(password)
    }

    submit() {
        cy.get('button[type="submit"]').click()
    }
}

export default new LoginPage();