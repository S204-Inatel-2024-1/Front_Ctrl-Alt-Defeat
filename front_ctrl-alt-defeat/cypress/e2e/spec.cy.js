describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
  })
})
describe('App Component', () => {
  beforeEach(() => {
    // Visite a página inicial antes de cada teste
    cy.visit('http://localhost:3000/');
  });

  it('should render Navbar and Footer', () => {
    // Verifique se o Navbar e Footer são renderizados
    cy.get('#search-form').should('exist');
    cy.get('#footer').should('exist');
  });
  
  it('LoginAluno', () => {
    // Verifique a navegação para a página de LoginAluno
    cy.visit('http://localhost:3000/LoginAluno'),
    cy.get('input[type="email"][placeholder="Email"]').type('gabriel@inatel.br');
    cy.get('input[type="password"][placeholder="Senha"]').type('fetim2024');

    cy.get('input[type="submit"][value="Entrar"]').click();
  
  });

  it('LoginOrientador', () => {
    // Verifique a navegação para a página de LoginOrientador
    cy.visit('http://localhost:3000/LoginOrientador'),
    cy.get('input[type="email"][placeholder="Email"]').type('gabriel@inatel.br');
    cy.get('input[type="password"][placeholder="Senha"]').type('fetim2024');

    cy.get('input[type="submit"][value="Entrar"]').click();
  
  });

  it('LoginAdm', () => {
    // Verifique a navegação para a página de LoginAdm
    cy.visit('http://localhost:3000/LoginAdm'),
    cy.get('input[type="email"][placeholder="Email"]').type('gabriel@inatel.br');
    cy.get('input[type="password"][placeholder="Senha"]').type('fetim2024');

    cy.get('input[type="submit"][value="Entrar"]').click();
  
  });

  it('RegisterAluno', () => {
    // Verifique a navegação para a página de RegisterAluno
    cy.visit('http://localhost:3000/RegisterAluno'),
    cy.get('input[type="text"][placeholder="Nome Completo"]').type('gabriel henrique');
    cy.get('input[type="email"][placeholder="Email da instituicao"]').type('gabriel@inatel.br');
    cy.get('input[type="number"][placeholder="Matricula"]').type('130130');
    cy.get('input[type="password"][placeholder="Senha"]').type('fetim2024');
    cy.get('input[type="password"][placeholder="Confirme a senha"]').type('fetim2024');

    cy.get('input[type="submit"][value="Cadastrar"]').click();
  
  });

  it('RegisterOrientador', () => {
    // Verifique a navegação para a página de RegisterOrientador
    cy.visit('http://localhost:3000/RegisterOrientador'),
    cy.get('input[type="text"][placeholder="Nome Completo"]').type('gabriel henrique');
    cy.get('input[type="email"][placeholder="Email da instituicao"]').type('gabriel@inatel.br');
    cy.get('input[type="password"][placeholder="Senha"]').type('fetim2024');
    cy.get('input[type="password"][placeholder="Confirme a senha"]').type('fetim2024');

    cy.get('input[type="submit"][value="Cadastrar"]').click();
  
  });

  it('RegisterAdm', () => {
    // Verifique a navegação para a página de RegisterAdm
    cy.visit('http://localhost:3000/RegisterAdm'),
    cy.get('input[type="text"][placeholder="Nome Completo"]').type('gabriel henrique');
    cy.get('input[type="email"][placeholder="Email da instituicao"]').type('gabriel@inatel.br');
    cy.get('input[type="password"][placeholder="Senha"]').type('fetim2024');
    cy.get('input[type="password"][placeholder="Confirme a senha"]').type('fetim2024');

    cy.get('input[type="submit"][value="Cadastrar"]').click();
  
  });
});
