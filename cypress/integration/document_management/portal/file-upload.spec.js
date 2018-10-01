describe('Portal Header Test', () => {
    beforeEach(function() {
      cy.viewport('macbook-13');
      cy.visit('/#/document-management/kaleidoscope');
     // cy.fixture('kaleidoscope/user').as('user');
     // cy.fixture('kaleidoscope/task-list').as('task-list');
      cy.server();
      // cy.route({
      //   method: 'GET',
      //   url: '**/getUserByEmailAddress**',
      //   response: '@user'
      // });
      // cy.route({
      //   method: 'GET',
      //   url: '**/taskList**',
      //   response: '@task-list'
      // })
      // cy.get('[data-cy=email-input]')
      //   .type('xiaoming.qin@fda.hhs.gov');
      // cy.get('[data-cy=submit]').click();
    });
    it.only('Build page should show document list', () => {
      cy.get('[data-cy=step-build]').click();
      cy.get('[data-cy=upload-button]').contains('Upload');
      cy.get('[data-cy=upload-button]').click();
    });
    //it.only('Concur page should show document information', () => {
     // cy.get('[cy-data=userName').contains('Xiaoming Qin');

      //cy.get('#cdk-step-label-0-0').click();
    // cy.get('.task-detail-card').last().should('have.class', 'task-detail-card-selected');
  //});
});
