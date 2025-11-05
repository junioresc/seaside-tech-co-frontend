describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the homepage', () => {
    cy.contains('Welcome to Seaside Tech Co').should('be.visible');
  });

  it('should have navigation links', () => {
    cy.contains('Book Appointment').should('be.visible');
    cy.contains('Shop Products').should('be.visible');
  });

  it('should navigate to products page', () => {
    cy.contains('Shop Products').click();
    cy.url().should('include', '/products');
  });

  it('should navigate to booking page', () => {
    cy.contains('Book Appointment').click();
    cy.url().should('include', '/book');
  });

  it('should display services', () => {
    cy.contains('Our Services').should('be.visible');
    cy.contains('Phone Repair').should('be.visible');
    cy.contains('Computer Repair').should('be.visible');
  });
});

