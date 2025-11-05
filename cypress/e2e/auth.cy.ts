describe('Authentication', () => {
  it('should display login page', () => {
    cy.visit('/login');
    cy.contains('Sign In').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
  });

  it('should show validation errors for empty login', () => {
    cy.visit('/login');
    cy.contains('button', 'Sign In').click();
    cy.contains('Invalid email address').should('be.visible');
    cy.contains('Password is required').should('be.visible');
  });

  it('should navigate to register page', () => {
    cy.visit('/login');
    cy.contains('Sign up').click();
    cy.url().should('include', '/register');
    cy.contains('Create Account').should('be.visible');
  });

  it('should navigate to password reset page', () => {
    cy.visit('/login');
    cy.contains('Forgot password?').click();
    cy.url().should('include', '/reset-password');
    cy.contains('Reset Password').should('be.visible');
  });
});

