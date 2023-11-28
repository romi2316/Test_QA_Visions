/// <reference types="cypress" />

describe('Todos API enpoint', () => {
  let todoIds = []; // Initialiser un tableau pour stocker les ID

  it('should creat todos', () => {
    cy.request('POST', 'http://localhost:3000/todos', { title: 'Faire les courses' }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('_id');
      expect(response.body).to.have.property('title', 'Faire les courses');
      expect(response.body).to.have.property('completed', false);
      expect(response.body).to.have.property('createdAt');
      todoIds.push(response.body._id);// Ajouter l'ID au tableau
    }); 
  
    cy.request('POST', 'http://localhost:3000/todos', { title: 'Vider la lave vaisselle' }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('_id');
      expect(response.body).to.have.property('title', 'Vider la lave vaisselle');
      expect(response.body).to.have.property('completed', false);
      expect(response.body).to.have.property('createdAt');
      todoIds.push(response.body._id);
    }); 

    cy.request('POST', 'http://localhost:3000/todos', { title: 'Faire du sport' }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('_id');
      expect(response.body).to.have.property('title', 'Faire du sport');
      expect(response.body).to.have.property('completed', false);
      expect(response.body).to.have.property('createdAt');
      todoIds.push(response.body._id); 
      expect(todoIds).to.have.lengthOf(3);
    });
  });

  it('should get all todos', () => {
    cy.request('GET', 'http://localhost:3000/todos').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body[0]).to.have.property('_id');
      expect(response.body[0]).to.have.property('title');
      expect(response.body[0]).to.have.property('completed');
      expect(response.body[0]).to.have.property('createdAt');
    });
  });

  it('should get a specific todo', () => {
    const todo1 = todoIds[0];
    cy.request('GET', `http://localhost:3000/todos/${todo1}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('_id', todo1);
      expect(response.body).to.have.property('title', 'Faire les courses');
      expect(response.body).to.have.property('completed', false);
      expect(response.body).to.have.property('createdAt');
    });
  });

  it('should update a title of todo', () => {
    const todo1 = todoIds[0];
    cy.request('PUT', `http://localhost:3000/todos/${todo1}`, { title: 'Faire les courses chez Aldi', completed: false }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('_id', todo1);
      expect(response.body).to.have.property('title', 'Faire les courses chez Aldi');
      expect(response.body).to.have.property('completed', false);
    });
  });
 
  it('should update a statut of todo', () => {
    const todo1 = todoIds[0];
    cy.request('PUT', `http://localhost:3000/todos/${todo1}`, { title: 'Faire les courses chez Aldi', completed: true }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('_id', todo1);
      expect(response.body).to.have.property('title', 'Faire les courses chez Aldi');
      expect(response.body).to.have.property('completed', true);
    });
  }); 

  it('should delete a todo', () => {
    const todo2 = todoIds[1];
    cy.request('DELETE', `http://localhost:3000/todos/${todo2}`).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  ///Gestion des erreurs

  it('should not allow creation of todo with an empty title', () => {
    cy.request({method: 'POST',url: 'http://localhost:3000/todos',body: { title: '',
      },failOnStatusCode: false,}).then((response) => {expect(response.status).to.eq(500);
    });
  }); 

  it('should not creat a todo with only numbers in the title ', () => {
  cy.request('POST', 'http://localhost:3000/todos', { title: '222' }).then((response) => {
    expect(response.status).to.eq(500);
  });
});

it('should not creat a todo with only characters in the title ', () => {
  cy.request('POST', 'http://localhost:3000/todos', { title: '!!!!' }).then((response) => {
      expect(response.status).to.eq(500);
  })
});

it('should not creat a duplicate todo', () => {
  cy.request({method: 'POST',url: `http://localhost:3000/todos`,body: { title: 'Faire du sport' },failOnStatusCode: false}).then((response) => {
    expect(response.status).to.eq(500);
  });
});

it('should not get a deleted todo', () => {
  const todo2 = todoIds[1];
  cy.request({method: 'GET',url: `http://localhost:3000/todos/${todo2}`,body: { title: 'Vider la lave vaisselle', completed: true },failOnStatusCode: false}).then((response) => {
    expect(response.status).to.eq(500);
  });
});

  it('should not update a deleted todo', () => {
    const todo2 = todoIds[1];
    cy.request({method: 'PUT',url: `http://localhost:3000/todos/${todo2}`,body: { title: 'Vider la lave vaisselle', completed: true },failOnStatusCode: false}).then((response) => {
      expect(response.status).to.eq(500);
    });
  });

  it('should not delete a deleted todo', () => {
    const todo2 = todoIds[1];
    cy.request({method: 'DELETE',url: `http://localhost:3000/todos/${todo2}`,body: { title: 'Vider la lave vaisselle', completed: true },failOnStatusCode: false}).then((response) => {
      expect(response.status).to.eq(500);
    });
  });
  

  // Nettoyez la base de données après tous les tests (si besoin :décommentez !)
  /* it('should delete each todo individually', () => {
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
  });  */
});
