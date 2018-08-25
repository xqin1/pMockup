describe('Portal Header Test', () => {
    beforeEach(function() {
      cy.viewport('macbook-13');
      cy.visit('/#/document-management/portal');
      cy.fixture('portal/user').as('user');
      cy.fixture('portal/task-list').as('task-list');
      cy.server();
      cy.route({
        method: 'GET',
        url: '**/getUserByEmailAddress**',
        response: '@user'
      });
      cy.route({
        method: 'GET',
        url: '**/taskList**',
        response: '@task-list'
      })
      cy.get('[data-cy=email-input]')
        .type('xiaoming.qin@fda.hhs.gov');
      cy.get('[data-cy=submit]').click();
    });
    it('page header should has name for logged in user', () => {
      cy.get('[data-cy=task-item]').last().click();
      cy.get('.task-detail-card').last().should('have.class', 'task-detail-card-selected');
    });
});