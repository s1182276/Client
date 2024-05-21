/// <reference types="cypress" />

describe('Client frontpage', () => {
  beforeEach(() => {
    cy.visit(Cypress.config('baseUrl'))
  })

  it('main app loads', () => {
    cy.get('#app').should('exist')
  })

  it('semesters are visible upon resize of screen', () => {

    cy.get('#semester-chooser-1-1').should('be.visible')
    cy.viewport(320, 480)
    cy.get('#semester-chooser-1-1').should('be.visible')
  })

  it('semester can be opened and closed', () => {
    cy.get('#semester-chooser-1-1').click()
    cy.get('#closeModal').click();
  })

  it('navigation manager functions', () => {
    cy.clearAllLocalStorage()
    cy.get('#route_select').select('screen_3');
    cy.getAllLocalStorage().should(() => {
      expect(localStorage.getItem('route')).to.eq('screen_3')
    })
  })
})
