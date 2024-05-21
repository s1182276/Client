/// <reference types="cypress" />

describe('Client frontpage', () => {
  beforeEach(() => {
    // need to replace this with an envvar
    cy.visit('https://localhost:7280')
  })

  it('main app loads', () => {
    cy.get('main[role*=main]').should('exist')
  })
})
