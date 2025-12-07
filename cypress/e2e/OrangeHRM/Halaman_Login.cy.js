describe('template spec', () => {
    it('Login Valid', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('[name="username"]').type('admin')
        cy.get('[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()
    })

    it('Login Invalid', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('[name="username"]').type('adminn')
        cy.get('[name="password"]').type('admin1234')
        cy.get('button[type="submit"]').click()
        cy.get('.oxd-alert-content-text').should('be.visible').and('contain', 'Invalid credentials')
    })

    it('Input Text Required', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('button[type="submit"]').click()
        cy.get('.oxd-input-field-error-message').should('be.visible').and('contain', 'Required')
    })

    it('Login > Dasboard', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('[name="username"]').type('admin')
        cy.get('[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()
        cy.url().should('include','/dashboard')
    })
  
    it('Forget Password', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('.orangehrm-login-forgot-header').click()
        cy.get('[name="username"]').type('admin')
        cy.get('.orangehrm-forgot-password-button--reset').click()
    })

    it('URL Icon LinkedIn', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('a[href="https://www.linkedin.com/company/orangehrm/mycompany/"] svg').click();
    })

    it('URL Icon Facebook', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('a[href="https://www.facebook.com/OrangeHRM/"] svg').click();
    })

    it('URL Icon Twitter', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('a[href="https://twitter.com/orangehrm?lang=en"] svg').click();
    })

    it('URL Icon Youtube', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('a[href="https://www.youtube.com/c/OrangeHRMInc"] svg').click();
    })

    it('URL Text OrangeHRM, Inc', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('a[href="http://www.orangehrm.com"]').click();
    })
})
