describe('App Component', () => {
  beforeEach(() => {
    // Visite a página inicial antes de cada teste
    cy.visit('https://front-ctrl-alt-defeat.vercel.app/')
  });

  
  it('LoginAluno', () => {
    // Verifique a navegação para a página de LoginAluno
    cy.visit('https://front-ctrl-alt-defeat.vercel.app/LoginAluno'),
    cy.get('[type="email"]').clear()
    cy.get('[type="password"]').clear()
    cy.get('[type="email"]').type("humbertogfs55@gmail.com")
    cy.get('[type="password"]').type("123456")
    cy.get('input[type="submit"][value="Entrar"]').click();
  });

  it('LoginOrientador', () => {
    // Verifique a navegação para a página de LoginOrientador
    cy.visit('https://front-ctrl-alt-defeat.vercel.app/LoginOrientador'),
    cy.get('[type="email"]').clear()
    cy.get('[type="password"]').clear()
    cy.get('input[type="email"]').type('gabriel@inatel.br');
    cy.get('input[type="password"]').type('fetim2024');

    cy.get('input[type="submit"][value="Entrar"]').click();
  
  });

  it('LoginAdm', () => {
    // Verifique a navegação para a página de LoginAdm
    cy.visit('https://front-ctrl-alt-defeat.vercel.app/LoginAdm'),
    cy.get('[type="email"]').clear()
    cy.get('[type="password"]').clear()
    cy.get('input[type="email"]').type('gabriel@inatel.br');
    cy.get('input[type="password"]').type('fetim2024');

    cy.get('input[type="submit"][value="Entrar"]').click();
  
  });

  it('RegisterAluno', () => {
    // Verifique a navegação para a página de RegisterAluno
    const email = generateRandomEmail();
    const password = generateRandomPassword();

    cy.visit('https://front-ctrl-alt-defeat.vercel.app/RegisterAluno'),
    cy.get('input[type="text"]').type('gabriel henrique');
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="number"]').type('130130');
    cy.get('[placeholder="Senha"]').type(password);
    cy.get('[placeholder="Confirme a senha"]').type(password);

    cy.get('input[type="submit"][value="Cadastrar"]').click();
  
  });

  it('RegisterOrientador', () => {
    // Verifique a navegação para a página de RegisterOrientador
    const email = generateRandomEmail();
    const password = generateRandomPassword();

    cy.visit('https://front-ctrl-alt-defeat.vercel.app/RegisterOrientador'),
    cy.get('input[type="text"]').type('gabriel henrique');
    cy.get('input[type="email"]').type(email);
    cy.get('[placeholder="Senha"]').type(password);
    cy.get('[placeholder="Confirme a senha"]').type(password);

    cy.get('input[type="submit"][value="Cadastrar"]').click();
  
  });

  it('RegisterAdm', () => {
    // Verifique a navegação para a página de RegisterAdm
    const email = generateRandomEmail();
    const password = generateRandomPassword();

    cy.visit('https://front-ctrl-alt-defeat.vercel.app/RegisterAdm'),
    cy.get('input[type="text"]').type('gabriel henrique');
    cy.get('input[type="email"]').type(email);
    cy.get('[placeholder="Senha"]').type(password);
    cy.get('[placeholder="Confirme a senha"]').type(password);

    cy.get('input[type="submit"][value="Cadastrar"]').click();
  
  });

  it('LoginAluno check equipe', () => {
    // Verifique a navegação para a página de LoginAluno
    cy.visit('https://front-ctrl-alt-defeat.vercel.app/LoginAluno'),
    cy.get('[type="email"]').clear()
    cy.get('[type="password"]').clear()
    cy.get('[type="email"]').type("eduardo.costa@ges.inatel.br")
    cy.get('[type="password"]').type("teste")
    cy.get('input[type="submit"][value="Entrar"]').click();
    cy.wait(1000)
    cy.get('h2').should('contain.text', 'Perfil Aluno');
    cy.get('.teams').click()

    cy.wait(1000)
    cy.get(':nth-child(4) > a').click()
    cy.get('h2').should('contain.text', 'Equipe número: 32');
  });

  it('LoginOrientador Check Equipe', () => {
    // Verifique a navegação para a página de LoginOrientador
    cy.visit('https://front-ctrl-alt-defeat.vercel.app/LoginOrientador'),
    cy.get('[type="email"]').clear()
    cy.get('[type="password"]').clear()
    cy.get('input[type="email"]').type('chris@ges.inatel.br');
    cy.get('input[type="password"]').type('teste');
    cy.get('input[type="submit"][value="Entrar"]').click();
    cy.wait(1000)
    cy.get('h2').should('contain.text', 'Perfil Orientador');
    cy.get('.teams').click()
    cy.wait(500)
    cy.get(':nth-child(1) > a').click()
    cy.wait(1000)
  });

  it('LoginOrientador Check form', () => {
    // Verifique a navegação para a página de LoginOrientador
    cy.visit('https://front-ctrl-alt-defeat.vercel.app/LoginOrientador'),
    cy.get('[type="email"]').clear()
    cy.get('[type="password"]').clear()
    cy.get('input[type="email"]').type('chris@ges.inatel.br');
    cy.get('input[type="password"]').type('teste');
    cy.get('input[type="submit"][value="Entrar"]').click();
    cy.wait(1000)
    cy.get('h2').should('contain.text', 'Perfil Orientador');
    cy.get('.tutorial-link > .value > a').click()
  });

  it('LoginOrientador Check manual', () => {
    // Verifique a navegação para a página de LoginOrientador
    cy.visit('https://front-ctrl-alt-defeat.vercel.app/LoginOrientador'),
    cy.get('[type="email"]').clear()
    cy.get('[type="password"]').clear()
    cy.get('input[type="email"]').type('chris@ges.inatel.br');
    cy.get('input[type="password"]').type('teste');
    cy.get('input[type="submit"][value="Entrar"]').click();
    cy.wait(1000)
    cy.get('h2').should('contain.text', 'Perfil Orientador');
    cy.get('.info-link > .value > a').click()
});

it('LoginAdm check make team', () => {
    // Verifique a navegação para a página de LoginAdm
    const number = getRandomNumber()

    cy.visit('https://front-ctrl-alt-defeat.vercel.app/LoginAdm'),
    cy.get('[type="email"]').clear()
    cy.get('[type="password"]').clear()
    cy.get('input[type="email"]').type('fetim@inatel.br');
    cy.get('input[type="password"]').type('teste');
    cy.get('input[type="submit"][value="Entrar"]').click();
    cy.wait(1000)
    cy.get('#profile-adm > :nth-child(2)').click()
    cy.wait(1000)
    cy.get(':nth-child(1) > input').type(number)
    cy.get('form > :nth-child(2) > input').type('projeto teste ' + number)
    cy.get('form > :nth-child(3) > input').type('Chris Lima')
    cy.get('form > :nth-child(4) > input').type('chris@ges.inatel.br')
    cy.get('.member-group > [name="name"]').type('eduardo')
    cy.get('.member-group > [type="email"]').type('eduardo.costa@ges.inatel.br')
    cy.get('[name="matricula"]').type('200')
    cy.get('[type="submit"]').click()
  });

  it('LoginAdm check update phase', () => {
    // Verifique a navegação para a página de LoginAdm
    cy.visit('https://front-ctrl-alt-defeat.vercel.app/LoginAdm'),
    cy.get('[type="email"]').clear()
    cy.get('[type="password"]').clear()
    cy.get('input[type="email"]').type('fetim@inatel.br');
    cy.get('input[type="password"]').type('teste');
    cy.get('input[type="submit"][value="Entrar"]').click();
    cy.wait(1000)
    cy.get('#profile-adm > :nth-child(3)').click()
    cy.wait(1000)

    cy.get('#status').select(2)
    cy.get('.select-all-section > button').click()
    cy.get('.status-update-section > button').click()
  });

});

function generateRandomEmail() {
  const domain = 'example.com';
  const randomString = Math.random().toString(36).substring(2, 15);
  return `${randomString}@${domain}`;
}

// Function to generate a random password
function generateRandomPassword(length = 12) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
}

function getRandomNumber() {
  return Math.floor(Math.random() * 999) + 1;
}