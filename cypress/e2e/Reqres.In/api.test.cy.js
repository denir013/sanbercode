describe('API', () => {
    it('List Users per Page', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users?page=1',
            headers: {
                'x-api-key': 'reqres_4f443f3c6bb745e18372e6cf0e7dad38'
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data).to.be.an('array')
            expect(response.body.page).to.equal(1)
        })
    }) 

    it('Single User', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users/3',
            headers: {
                'x-api-key': 'reqres_4f443f3c6bb745e18372e6cf0e7dad38'
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('data')
            expect(response.body.data.email).to.contain('@')
        })
    }) 

    it('Single User not Found', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users/999',
            headers: {
                'x-api-key': 'reqres_4f443f3c6bb745e18372e6cf0e7dad38'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404)
            expect(response.body).to.be.an('object')
            expect(Object.keys(response.body)).to.have.length.of.at.most(0)
        })
    }) 

    it('List Resource', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/unknown',
            headers: {
                'x-api-key': 'reqres_4f443f3c6bb745e18372e6cf0e7dad38'
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('total')
            expect(response.body.data).to.be.an('array')
        })
    }) 

    it('Single Resource', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/unknown/5',
            headers: {
                'x-api-key': 'reqres_4f443f3c6bb745e18372e6cf0e7dad38'
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('data')
            expect(response.body.data.id).to.eq(5)
        })
    })

    it('Single Resource not Found', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/unknown/777',
            headers: {
                'x-api-key': 'reqres_4f443f3c6bb745e18372e6cf0e7dad38'
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404)
            expect(response.body).to.be.an('object')
            expect(Object.keys(response.body)).to.have.length.of.at.most(0)
        })
    })

    it('Delayed Response', () => {
        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users?delay=1',
            headers: {
                'x-api-key': 'reqres_4f443f3c6bb745e18372e6cf0e7dad38'
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.duration).to.be.lessThan(2000)
        })
    })

    it('Create User', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/users',
            headers: {
                'x-api-key': 'reqres_4f443f3c6bb745e18372e6cf0e7dad38'},
            body:{
                    "name": "Deni Ramdani",
                    "job": "QA"
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body).to.have.property('name')
            expect(response.body).to.have.property('createdAt')      
        })
    }) 

    it('Register Succes', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/register',
            headers: {
                'x-api-key': 'reqres_4f443f3c6bb745e18372e6cf0e7dad38'},
            body:{
                "email": "eve.holt@reqres.in",
                "password": "pistol"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.duration).to.be.lessThan(1000)
            expect(response.body).to.have.property('token')
        })
    }) 

    it('Register Failed', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/register',
            headers: {
                'x-api-key': 'reqres_4f443f3c6bb745e18372e6cf0e7dad38'},
            body:{
                "email": "eve.holt@reqres.in"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('error')
            expect(response.body.error).to.have.eq('Missing password')
        })
    }) 

    it('Login Succes', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/login',
            headers: {
                'x-api-key': 'reqres_4f443f3c6bb745e18372e6cf0e7dad38'},
            body:{
                "email": "eve.holt@reqres.in",
                "password": "cityslicka"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.duration).to.be.lessThan(1000)
            expect(response.body).to.have.property('token')
        })
    }) 

    it('Login Failed', () => {
        cy.request({
            method: 'POST',
            url: 'https://reqres.in/api/login',
            headers: {
                'x-api-key': 'reqres_4f443f3c6bb745e18372e6cf0e7dad38'},
            body:{
                "email": "peter@klaven"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body).to.have.property('error')
            expect(response.body.error).to.have.eq('Missing password')
        })
    }) 

    it('Update Put User', () => {
        cy.request({
            method: 'PUT',
            url: 'https://reqres.in/api/users/2',
            headers: {
                'x-api-key': 'reqres_4f443f3c6bb745e18372e6cf0e7dad38'},
            body:{
                "name": "Deni Ramdani",
                "job": "Tester"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('job')
            expect(response.body.name).to.contain('Deni')
        })
    })

    it('Update Patch User', () => {
        cy.request({
            method: 'PATCH',
            url: 'https://reqres.in/api/users/2',
            headers: {
                'x-api-key': 'reqres_4f443f3c6bb745e18372e6cf0e7dad38'},
            body:{
                "name": "Ramdani",
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('name')
            expect(response.body.name).to.eq('Ramdani')
        })
    })

    it('Delete User', () => {
        cy.request({
            method: 'DELETE',
            url: 'https://reqres.in/api/users/3',
            headers: {
                'x-api-key': 'reqres_4f443f3c6bb745e18372e6cf0e7dad38'},
        }).then((response) => {
            expect(response.status).to.eq(204)
            expect(response.duration).to.be.lessThan(1000)
            expect(response.body.data).to.not.be.null
        })
    })
})