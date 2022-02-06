
describe('Unit testing the addPlantComponent', function () {
  
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



it('button not visible if form is not valid', function(){
    
    cy.visit('/garden/add');
    cy.get('[data-cy=addPlantButton]')        
        .should('be.disabled');
});


it('can submit a valid form & check if plant is added', function(){

    

    cy.visit('/garden/add');  

    cy.log('filling the form'); // if you really need this
    cy.get('[data-cy=plantNameInput]').type('Rose');
    cy.get('[data-cy=datePlantedInput]').type('1990-03-17');
    cy.get('[data-cy=borderInput]').type('Front Left');
    cy.get('[data-cy=bloomFromInput]').select('January');
    cy.get('[data-cy=bloomTillInput]').select('March');
    cy.get('[data-cy=winterGreenInput]').find('input').click({force:true});
    cy.get('[data-cy=colorFlowerInput]').type('Green');
    cy.get('[data-cy=colorLeavesInput]').type('Yellow');
    cy.get('[data-cy=maximumHeightInput]').type('20');
    cy.get('[data-cy=maximumWidthInput]').type('80');


    cy.log('submitting form'); // if you really need this
    cy.get('[data-cy=addPlantButton]').click();  

    cy.wait(5000);
  
    cy.request('/api/garden/all')
        .its('body')
        .its('length')
        .should('eq', totalItems + 1);


});




});



