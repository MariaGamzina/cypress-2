const happy = require('../fixtures/validLogin.json');
const sad = require('../fixtures/invalidLogin.json');
const seats = require('../fixtures/seats.json');
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

describe('login admin spec', () => {

  it('successful authorization ', () => {    
    cy.login(happy.email,happy.password);
    cy.get(selectors.firsttitle).should('have.text', 'Управление залами');    
  });

  it('should not login ', () => {
    sad.forEach(({email, password}) => {
      cy.login(`${email}`,`${password}`);
    });  
    cy.get(selectors.error).should('have.text', 'Ошибка авторизации!');        
  });
});

describe.only('Book tickets admin', () => {

  it('successful booking tickets ', () => {    
    cy.login(happy.email,happy.password);
    cy.get(selectors.firsttitle).should('have.text', 'Управление залами');
    
    cy.get(selectors.stalker)
    .then(($el) => $el.textContent).should('have.text','"Сталкер(1979)"');

    cy.get(selectors.stalker)
    .invoke('text').then((text) => {
    cy.visit('qamid.tmweb.ru');
    cy.get(selectors.daythree).click();
    cy.get(selectors.moviestalker).should('have.text', text)
  });

    cy.get(selectors.timeseance).click();
    cy.contains('Забронировать').should('be.disabled');
    const seats = require('../fixtures/seats.json');
    seats.forEach(({row, seat}) => {
    cy.get(`.buying-scheme :nth-child(${row}) > :nth-child(${seat})`).click();
    });
    cy.contains('Забронировать').should('not.be.disabled').click();
    cy.contains('Получить код бронирования').should('be.visible').should('not.be.disabled');
    cy.get(selectors.bookseats).should('have.text', 'Ряд/Место: 4/3, 4/4, 4/5, 4/6');    
  });


});