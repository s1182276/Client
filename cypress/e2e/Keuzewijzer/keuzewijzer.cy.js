/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
  // we need to supress errors on test because we got a lot of invisible errors 
  return false
});

describe('Client frontpage', () => {
  beforeEach(() => {
    cy.visit(Cypress.config('baseUrl'));
  })

  it('main app loads', () => {
    cy.get('#newLearningRouteBtn').should('exist');
  })

  it('can open semester-chooser', () => {
    cy.get('#newLearningRouteBtn').click({force: true});

    cy.get('.semester-chooser').first().click({multiple: true, force: true});
    // fetch is slow on tst
    cy.wait(5000)
    cy.get('module-card').first();
  })

  it('semesters are visible upon resize of screen', () => {
    cy.get('#newLearningRouteBtn').click({force: true});

    cy.get('leerroute-year').should('be.visible');
    cy.viewport(320, 480);
    cy.get('leerroute-year').should('be.visible');
    cy.viewport(800, 600);
    cy.get('leerroute-year').should('be.visible');
    cy.viewport(1920, 1080);
    cy.get('leerroute-year').should('be.visible');
  })

  it('can add a module to schoolyear', () => {
    cy.get('#newLearningRouteBtn').click({force: true});
    cy.get('.semester-chooser').first().click({multiple: true, force: true});
    // fetch is slow on tst
    cy.wait(5000);
    cy.get('#blockContainer').find('module-card').first().click({force: true});
    cy.get('.semester-chooser').first().find('module-card').should('exist');
  })

  it('can open module info', () => {
    cy.get('#newLearningRouteBtn').click({force: true});
    cy.get('.semester-chooser').first().click({multiple: true, force: true});
    // fetch is slow on tst
    cy.wait(5000);
    cy.get('#blockContainer').find('#moreInfo').first().click({force: true});
    cy.wait(5000);
    cy.get('#blockContainerInfo').first().find('module-info').should('exist');
    // test if we can actually close the modal
    cy.wait(5000);
    cy.get('#blockContainerInfo').first().find('module-info').click({force: true});
    cy.wait(5000);
    cy.get('#blockContainerInfo').should('be.hidden');
  })


  it('navigation manager functions', () => {
    cy.get('#menu-header').click({force: true});
    cy.get('#feedback-button').click({force: true});
    cy.get('#content').should('not.be.empty');
    cy.get('#disclaimer-button').click({force: true});
    cy.get('#content').should('not.be.empty');
  })
})