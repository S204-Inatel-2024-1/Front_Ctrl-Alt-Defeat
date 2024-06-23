describe('App Component', () => {
    beforeEach(() => {
      // Visite a página inicial antes de cada teste
      cy.visit('https://front-ctrl-alt-defeat.vercel.app/')
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
})

function getRandomNumber() {
    return Math.floor(Math.random() * 999) + 1;
}