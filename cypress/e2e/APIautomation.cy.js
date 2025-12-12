
describe('API Automation ReqRes (Uniform Headers)', () => {

  const headers = {
    'x-api-key': 'reqres_0702a8f6bbed4e42b7199dce597263c2'
  };

  // GET LIST USERS
  it('GET - List Users', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users?page=2',
      headers
    })
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.an('array');
    });
  });

  // GET SINGLE USER
  it('GET - Single User', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users/2',
      headers
    })
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.have.property('id', 2);
    });
  });

  // POST CREATE USER
  it('POST - Create User', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/users',
      headers,
      body: {
        name: "Hanif",
        job: "QA Automation"
      }
    })
    .then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('name', "Hanif");
      expect(response.body).to.have.property('job', "QA Automation");
    });
  });

  // PUT UPDATE USER
  it('PUT - Update User', () => {
    cy.request({
      method: 'PUT',
      url: 'https://reqres.in/api/users/10',
      headers,
      body: {
        name: "Rizky",
        job: "Senior QA"
      }
    })
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('name', "Rizky");
      expect(response.body).to.have.property('job', "Senior QA");
    });
  });

  // PATCH PARTIAL UPDATE USER
  it('PATCH - Update Job Only', () => {
    cy.request({
      method: 'PATCH',
      url: 'https://reqres.in/api/users/10',
      headers,
      body: {
        job: "Lead Engineer"
      }
    })
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('job', "Lead Engineer");
    });
  });

  // DELETE USER
  it('DELETE - Delete User', () => {
    cy.request({
      method: 'DELETE',
      url: 'https://reqres.in/api/users/10',
      headers
    })
    .then((response) => {
      expect(response.status).to.eq(204);
    });
  });

  // POST LOGIN SUCCESS
  it('POST - Login Success', () => {
    cy.request({
      method: 'POST',
      url: 'https://reqres.in/api/login',
      headers,
      body: {
        email: "eve.holt@reqres.in",
        password: "cityslicka"
      }
    })
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('token');
    });
  });

  // GET DELAYED RESPONSE
  it('GET - Delayed Response', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users?delay=2',
      headers
    })
    .then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data).to.be.an('array');
    });
  });

});
