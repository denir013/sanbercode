describe('Intercept', () => {
    it('Login Valid', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('[name="username"]').type('admin');
        cy.get('[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();
        cy.intercept('GET','**/web/index.php/api/v2/dashboard/shortcuts').as('loginValid');
        cy.wait('@loginValid').its('response.statusCode').should('eq',200);
    });

    it('Login Invalid', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('[name="username"]').type('adminn');
        cy.get('[name="password"]').type('admin1234');
        cy.intercept('POST','**/auth/validate').as('loginRequest');
        cy.get('button[type="submit"]').click();
        cy.get('.oxd-alert-content-text').should('be.visible').and('contain','Invalid credentials');
        cy.wait('@loginRequest').then((intercept) => {expect(intercept.response.statusCode).to.eq(302);
        });
    });

    it('Input Text Login Required', () => {
        cy.intercept('GET','**/auth/login').as('pageLoad');
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('button[type="submit"]').click();
        cy.get('.oxd-input-field-error-message')
            .should('be.visible')
            .and('contain','Required');
        cy.wait('@pageLoad')
    })

    it('Input Text Username Required', () => {
        cy.intercept('GET','**/auth/login').as('pageLoad');
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();
        cy.get('.oxd-input-field-error-message')
            .should('be.visible')
            .and('contain','Required');
        cy.wait('@pageLoad');
    });

    it('Input Text Password Required', () => {
        cy.intercept('GET','**/auth/login').as('pageLoad');
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('[name="username"]').type('admin');
        cy.get('button[type="submit"]').click();
        cy.get('.oxd-input-field-error-message')
            .should('be.visible')
            .and('contain','Required');
        cy.wait('@pageLoad');
    });

    it('Page Login > Page Dashboard', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('[name="username"]').type('admin');
        cy.get('[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();
        cy.url().should('include','/dashboard');
        cy.intercept('GET','**/dashboard/index').as('dashboard');
    });

    it('Forget Password', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.get('.orangehrm-login-forgot-header').click();
        cy.get('[name="username"]').type('admin');
        cy.intercept('GET','**/web/index.php/core/i18n/messages').as('resetPass');
        cy.get('.orangehrm-forgot-password-button--reset').click();
        cy.wait('@resetPass').its('response.statusCode').should('eq',304);
    });

    it('URL Icon LinkedIn', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.intercept('GET','https://www.linkedin.com/company/orangehrm/mycompany/**').as('linkedin');
        cy.get('a[href="https://www.linkedin.com/company/orangehrm/mycompany/"]')
            .invoke('removeAttr', 'target')
            .find('svg')
            .click();
        cy.wait('@linkedin').then((interception) => {
            expect(interception.response.statusCode).to.exist;
        });
    });

    it('URL Icon Facebook', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.intercept('GET','https://www.facebook.com/OrangeHRM/').as('facebook');
        cy.get('a[href="https://www.facebook.com/OrangeHRM/"]')
            .invoke('removeAttr','target')
            .find('svg')
            .click();
        cy.wait('@facebook').then((interception) => {
            expect(interception.response.statusCode).to.exist;
        });
    });

    it('URL Icon Twitter', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.intercept('GET','https://twitter.com/orangehrm?lang=en').as('twitter');
        cy.get('a[href="https://twitter.com/orangehrm?lang=en"]')
            .invoke('removeAttr','target')
            .find('svg')
            .click();
        cy.wait('@twitter').then((interception) => {
            expect(interception.response.statusCode).to.exist;
        });
    });

    it('URL Icon Youtube', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        cy.intercept('GET','https://www.youtube.com/c/OrangeHRMInc').as('youtube');
        cy.get('a[href="https://www.youtube.com/c/OrangeHRMInc"]')
            .invoke('removeAttr','target')
            .find('svg')
            .click();
        cy.wait('@youtube').then((interception) => {
            expect(interception.response.statusCode).to.exist;
        });
    });

    it('URL Text OrangeHRM, Inc', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    cy.contains('a','OrangeHRM')
        .then($a => {
            const url = $a.prop('href')
            cy.request(url).its('status').should('eq',200)
        });
    });
});