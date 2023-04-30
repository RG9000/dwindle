import cypress from "cypress";

describe('home page default', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it('shows title', () => {
    cy.get('#home-title').should('have.text', 'DWINDLE');
  });
  it('shows subtitle', () => {
    cy.get('#home-subtitle').should('have.text', 'Habit Breaker');
  });
  it('can start', () => {
    cy.get('#home-start-button').should('have.text', 'Start').click();
    cy.url().should('include', '/new')
  });
});

describe('new habit', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get('#home-start-button').click();
  });
  it('shows title', () => {
    cy.get('#new-habit-title').should('have.text', 'What art thou trying to diminish?');
  });
  it('shows input', () => {
    cy.get('#habit-field').should('have.attr', 'placeholder', 'name thy sin');
  });
  it('can enter input', () => {
    cy.get('#habit-field').type('Test Habit').should('have.value', 'Test Habit');
  });
  it('cannot enter more that 15 chars', () => {
    cy.get('#habit-field').type('1234567890ABCDEFG').should('have.value', '1234567890ABCDE');
  });
  it('cannot enter 0 chars', () => {
    cy.get('#habit-field').clear().should('have.value', '');
    cy.get('#new-habit-next').click();
    cy.url().should('include', '/new')
  });
  it('can go back', () => {
    cy.get('#new-habit-back').should('have.text', 'Back').click();
    cy.url().should('not.include', '/new')
    cy.get('#home-title').should('have.text', 'DWINDLE');
  });
  it('can go forward', () => {
    cy.get('#habit-field').type('Test Habit');
    cy.get('#new-habit-next').should('have.text', 'Next').click();
    cy.url().should('include', '/setup')
  });
})

describe('setup habit', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.get('#home-start-button').click();
    cy.get('#habit-field').type('Test Habit');
    cy.get('#new-habit-next').should('have.text', 'Next').click();
  });
  it('cant put letters in frequency', () => {
    cy.get('#frequency-field').clear().type('a').should('have.value', '');
  });
  it('cant put letters in target', () => {
    cy.get('#target-field').clear().type('a').should('have.value', '');
  });
  it('can put numbers in frequency', () => {
    cy.get('#frequency-field').clear().type('1').should('have.value', '1');
  });
  it('can put numbers in target', () => {
    cy.get('#target-field').clear().type('1').should('have.value', '1');
  });
  it('can go back', () => {
    cy.get('#back-button').should('have.text', 'Back').click();
    cy.url().should('include', '/new')
    cy.get('#habit-field').should('have.value', 'Test Habit');
  });
  it('cant go forward with defaults', () => {
    cy.get('#next-button').should('have.text', 'Begin').click();
    cy.url().should('include', '/setup')
  });
})