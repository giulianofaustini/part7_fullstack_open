

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log into the blog application')
    cy.contains('username')
    cy.contains('login')
  })
})

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user2 = {
      name: 'Mina e Adamo',
      username: 'mina',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2) 
    
    const user = {
      name: 'Giliola Cinguetti',
      username: 'gili',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:5173')

  })

  it('Login form is shown', function() {
    cy.contains('Log into the blog application')
    cy.contains('username')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get( '[data-cy="username"]').type('gili')
      cy.get( '[data-cy="password"]').type('salainen')
      cy.get( '[data-cy="login"]').click()

      cy.contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get( '[data-cy="username"]').type('moli')
      cy.get( '[data-cy="password"]').type('salainen')
      cy.get( '[data-cy="login"]').click()

      cy.contains('The username or password you inserted is not valid.')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
   
      cy.get( '[data-cy="username"]').type('gili')
      cy.get( '[data-cy="password"]').type('salainen')
      cy.get( '[data-cy="login"]').click()
      cy.contains('Add your favorite blog and share it with other users')
    })

    it('A blog can be created', function() {
      cy.get('[data-cy="clickForNewBlog"]').click()
      cy.get('[data-cy="write title"]').type('here we go again with a new bog in testing')
      cy.get('[data-cy="write author"]').type('Giacomino')
      cy.get('[data-cy="write url"]').type('www.giacomino.com')
      cy.get('[data-cy="create"]').click()
      cy.contains('Title: here we go again with a new bog in testing.')
      cy.get('[data-cy="view info"]').click()
      cy.get('[data-cy="likeButton"]').click()
      cy.get('[ data-cy="deleteBlog"]').click()
    })
  })


  describe('When logged and then logged out and then logged in with a different user to check if delete button shows with the second user', function() {
    
    it('A blog is created by GILIOLA and the she is logged out and MINA is logged in to check if delete is in there', function() {
      cy.get( '[data-cy="username"]').type('gili')
      cy.get( '[data-cy="password"]').type('salainen')
      cy.get( '[data-cy="login"]').click()
      cy.contains('Add your favorite blog and share it with other users')
      cy.get('[data-cy="clickForNewBlog"]').click()
      cy.get('[data-cy="write title"]').type('here we go again with a new bog in testing')
      cy.get('[data-cy="write author"]').type('Giacomino')
      cy.get('[data-cy="write url"]').type('www.giacomino.com')

      cy.get('[data-cy="create"]').click()

      cy.contains('Title: here we go again with a new bog in testing.')
      cy.get('[data-cy="view info"]').click()
      cy.get('[data-cy="likeButton"]').click()
      cy.get('[  data-cy="logOutButton" ]').click()

      cy.get( '[data-cy="username"]').type('mina')
      cy.get( '[data-cy="password"]').type('salainen')
      cy.get( '[data-cy="login"]').click()
      cy.contains('Add your favorite blog and share it with other users')
      
      cy.get('[data-cy="view info"]').click()
      cy.get('[data-cy="likeButton"]').click()
      cy.get('[ data-cy="deleteBlog"]').should('not.exist')
    })   
  })


  describe.only('Create multiple blogs and arrange them in order of likes', function () {

    let likeCount = 0

    cy.request('POST', 'http://localhost:3001/api/login', {
      username: 'gili', password: 'salainen'
    }).then(response => {
      localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
      cy.visit('http://localhost:5173')
    })
  
    it('Create blogs', function () {
      cy.get('[data-cy="username"]').type('gili');
      cy.get('[data-cy="password"]').type('salainen');
      cy.get('[data-cy="login"]').click();
     
      cy.get('[data-cy="clickForNewBlog"]').click();
      cy.get('[data-cy="write title"]').type('The title with the second most likes');
      cy.get('[data-cy="write author"]').type('Author 1');
      cy.get('[data-cy="write url"]').type('www.example.com/blog1');
      cy.get('[data-cy="create"]').click();
    
      cy.get('[data-cy="write title"]').type('The title with the most likes');
      cy.get('[data-cy="write author"]').type('Author 2');
      cy.get('[data-cy="write url"]').type('www.example.com/blog2');
      cy.get('[data-cy="create"]').click()
      cy.get('[data-cy="create"]').click()
      cy.get('[data-cy="create"]').click()
      cy.wait(2000)
    
      likeCount += 1

      cy.get('[data-cy="likeButton"]').eq(1).click({ force: true }).wait(4000)
      .get('[data-cy="likesCount"]')
      .should('exist')
      .should('contain', `Likes: ${likeCount}`);
      
      cy.get('[data-cy="view info"]').eq(0).click();
  
      cy.contains('Blog title: The title with the most likes.');
    });
  });
  

})
