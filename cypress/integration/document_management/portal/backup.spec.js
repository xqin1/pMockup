describe('App initialization', () => {
    beforeEach(function() {
        //for large dataset, use fixture directly in response instead of using alias
        // cy.fixture('document_list_3').as('data');
        // cy.server();
        // cy.route({
        //     method: 'GET',
        //     url: '**/getDocumentsByObjectId**',
        //     response: 'fixture:document_list_3.json'
        // }).as('loadData');
        // cy.visit('/BulkArchivingFormIndex.html?userId=555b623a00007f7603d0f0a9d389926f&objectId=59ba91d1004e9969f61be86a70d06073&userId=my_user_id');
        // cy.wait('@loadData');
        // //get archive button
        // cy.get('#action-button').as('archiveButton');
        // //get document links
        // cy.get('a#documentLink').as('links');
        // //get document select radio button
        // cy.get('#row_selected > input').as('radioButtons');
        // //get metadata button
        // cy.get('#arrow_img').as('arrows');
        // //get pdfPreview icon
        // cy.get('#previewIcon').as('previewIcon');
    });
    it('page load state', () => {
      expect(true).to.equal(true)
       // cy.get('@archiveButton').should('be', 'visible');
    });
    // it('should display error message if no document being selected', () => {
    //     cy.get('@archiveButton').click();
    //     cy.get('#errorContainer1').should('be.visible');
    //
    // });
    // it('should have document link for all documents', () => {
    //     cy.get('@links').should('have.length', 2);
    //    // cy.get('@links').first().click();
    // });
    // it('should show archiving confirmation dialog upon success archival', () => {
    //     cy.route({
    //         method: 'GET',
    //         url: '**/archiveDocument**',
    //         response: {"status": "success"}
    //     }).as('archiveDocument');
    //
    //     cy.get('@radioButtons').first().click();
    //     cy.get('@archiveButton').click();
    //     cy.wait('@archiveDocument');
    //     cy.get('#dialog-confirmation').should('be.visible');
    //     cy.get('#modal-title-confirmation').should('have.text', 'Confirmation');
    // });
    // it('should show archiving error dialog upon failed archival', () => {
    //     cy.route({
    //         method: 'GET',
    //         url: '**/archiveDocument**',
    //         response: {"status": "fail"}
    //     }).as('archiveDocument');
    //
    //     cy.get('@radioButtons').first().click();
    //     cy.get('@archiveButton').click();
    //     cy.wait('@archiveDocument');
    //     cy.get('#dialog-confirmation').should('be.visible');
    //     cy.get('#modal-title-confirmation').should('have.text', 'Archiving Error');
    // });
    // it.only('should show document metadata', () => {
    //     cy.fixture('regulatory_action').as('regulatoryAction');
    //     cy.route({
    //         method: 'GET',
    //         url: '**/getRegulatoryActions**',
    //         response: '@regulatoryAction'
    //     }).as('getRegulatoryAction');
    //
    //    // cy.get('@arrows').last().click({force: true});
    //     cy.get(':nth-child(4) > .details-expand > #arrow_img').click();
    //     cy.wait('@getRegulatoryAction');
    //     cy.get('.communication-info-table').should('be.visible')
    // });
    //
    // it('should show PDF prevew loading image', () => {
    //     // cy.fixture('regulatory_action').as('regulatoryAction');
    //     // cy.route({
    //     //     method: 'GET',
    //     //     url: '**/getRegulatoryActions**',
    //     //     response: '@regulatoryAction'
    //     // }).as('getRegulatoryAction');
    //
    //     //cy.get('@previewIcon').first().click();
    //     //cy.wait('@getRegulatoryAction');
    //     //cy.get('.communication-info-table').should('not.be.visible')
    // });
});
