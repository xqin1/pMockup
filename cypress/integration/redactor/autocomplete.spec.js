describe('Portal Header Test', () => {
    beforeEach(function() {
      cy.viewport('macbook-13');
      cy.visit('/#/redactor/5a6759c4002e1c45dcae42d5fe8fdaf6');
      cy.fixture('redactor/user').as('user');
      cy.fixture('redactor/task').as('task');
      cy.fixture('redactor/app-number-autocomplete').as('appnumber');
      cy.fixture('redactor/redactor-projects').as('redactor-projects');
      cy.server();
      cy.route({
        method: 'GET',
        url: '**/getUserBySessionId**',
        response: '@user'
      });
      cy.route({
        method: 'GET',
        url: '**/getRedactorTask**',
        response: '@task'
      });
      cy.route({
        method: 'GET',
        url: '**/getApplicationNumber**',
        response: '@appnumber'
      });
      cy.route({
        method: 'GET',
        url: '**/getPostApprovalProjects**',
        response: '@redactor-projects'
      });
      cy.get('#mat-input-0')
        .type('211253');
      cy.get('.mat-icon').click();
    });
    it('page header should has name for logged in user', () => {
      cy.get('.header').contains('ANDA-105678-ORIG-1 STAT-385');
    });
});
