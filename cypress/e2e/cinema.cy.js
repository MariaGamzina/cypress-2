
const selectors = require('../fixtures/selectors.json');

describe('main page spec', () => {
  it('main page', () => {
    cy.visit('/');
    cy.get(selectors.header).should('have.text', 'Идёмвкино');
    cy.get(selectors.days).should('have.length', 7);
    cy.get(selectors.movies).should('have.length', 4);
    cy.get(selectors.movietitle).should('be.visible');
    cy.get(selectors.halls).should('be.visible');
    cy.get(selectors.time).should('be.visible');
    cy.get(selectors.dayfive).click();
    cy.get(selectors.time).should('not.be.disabled');   
  })
});