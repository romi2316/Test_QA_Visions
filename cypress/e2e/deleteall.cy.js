/// <reference types="cypress" />


describe('Nettoyer la base de donnée', () => {
  it('should delete each todo individually', () => {
    // Obtenir la liste des todos
    cy.request('GET', 'http://localhost:3000/todos').then((response) => {
      expect(response.status).to.eq(200);
      const todos = response.body;

      // Supprimer chaque todo individuellement
      todos.forEach((todo) => {
        cy.request('DELETE', `http://localhost:3000/todos/${todo._id}`).then((deleteResponse) => {
          expect(deleteResponse.status).to.eq(200);
        });
      });

      // Vérifier que la suppression a bien été effectuée
      cy.request('GET', 'http://localhost:3000/todos').then((finalResponse) => {
        expect(finalResponse.status).to.eq(200);
        expect(finalResponse.body).to.have.lengthOf(0);
      });
    });
  });
});
