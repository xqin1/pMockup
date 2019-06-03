describe('Portal Header Test', () => {
    beforeEach(function() {
      cy.viewport('macbook-13');
      cy.visit('/#/redactor/5a6759c4002e1c45dcae42d5fe8fdaf6');
      cy.fixture('user').as('user');
      cy.fixture('task').as('task');
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
      // cy.get('[data-cy=email-input]')
      //   .type('xiaoming.qin@fda.hhs.gov');
      // cy.get('[data-cy=submit]').click();
    });
    it('page header should has name for logged in user', () => {
      cy.get('.header-card')
      cy.get('.header-card').contains('ANDA-105678-ORIG-1 STAT-385');
    });
});
