
describe('Unit testing the plantTableComponent', function () {
  
    var username   = 'giom@giom.giom';
    var password   = 'Giom123!';
    var totalItems = 0;

beforeEach(function () {
    cy.visit('/');
    cy.get('[data-cy=login-email]')
        .clear()
        .should('be.empty')
        .type(username)
        .should('have.value',username);
    cy.get('[data-cy=login-password]')
        .should('be.empty')
        .type(password)
        .should('have.value',password);
    cy.get('[data-cy=login-button]')
        .click();

    cy.request('/api/garden/all')
    .its('body')
    .its('length')
    .then(($length) => {        
      totalItems = $length;
    });

    

});


it('on error should show error message', function() {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/garden',
      status: 500,
      response: 'ERROR'
    });
    cy.visit('/garden/table');
    cy.get('[data-cy=appError]').should('be.visible');
  });


it('test table get filled with 3 items using fixture', () => {
    cy.server({delay:1000});
    cy.route({
      method: 'GET',
      url: '/api/garden',
      status: 200,
      response: 'fixture:plants.json'
    });
  
    cy.visit('/garden/table');    
    cy.get('[data-cy=dataTable]') // table
    .get('[data-cy=dataRow]')
    .should('have.length', 3); // non-header rows
  });

it('test paginator total', () =>{ 

    cy.visit('/garden/table');
    
    cy.get('.mat-paginator')
  .find('.mat-paginator-range-label')
  .should('contain', `5 of ${totalItems}`);   

});

it('test paginator change range', () =>{ 

    cy.visit('/garden/table');

    cy.get('.mat-paginator')
    .find('.mat-select')
    .click()
    .get('mat-option')
    .contains('100')
    .click();
    
    cy.get('[data-cy=dataTable]') // table
    .get('[data-cy=dataRow]')
    .should('have.length', totalItems); // non-header rows

});


});