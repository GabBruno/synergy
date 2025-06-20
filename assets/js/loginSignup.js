// componentes/card/card.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Simulação de Banco de Dados ---
    const validUsers = [
        { email: 'ana@synergy.com', password: '123' },
        { email: 'daniel@synergy.com', password: '456' },
        { email: 'admin', password: 'admin' }
    ];

    // --- Seleção dos Elementos ---
    // Elementos comuns
    const passwordInput = document.getElementById('password');
    const togglePasswordButton = document.getElementById('togglePassword');
    
    // Elementos da página de LOGIN
    const loginButton = document.getElementById('loginButton');
    const emailInput = document.getElementById('email');
    const googleLoginBtn = document.getElementById('googleLoginBtn');
    const appleLoginButton = document.getElementById('appleLoginButton');

    // Elementos da página de CADASTRO
    const signupButton = document.getElementById('signupButton');
    const identifierInput = document.getElementById('identifier');
    const fullNameInput = document.getElementById('fullName');
    const usernameInput = document.getElementById('username');
    
    // --- Função Central de Login ---
    function performLogin(userIdentifier) {
        console.log(`SUCESSO: Utilizador "${userIdentifier}" autenticado.`);
        localStorage.setItem('logado', 'true');
        localStorage.setItem('currentUser', userIdentifier);
        window.location.href = "home.html?page=feed";
    }

    // --- LÓGICA DA PÁGINA DE LOGIN (só executa se o botão de login existir) ---
    if(loginButton) {
        // --- Login com Email e Senha ---
        loginButton.addEventListener('click', (event) => {
            event.preventDefault(); 
            const emailValue = emailInput.value;
            const passwordValue = passwordInput.value;
            const foundUser = validUsers.find(user => user.email === emailValue && user.password === passwordValue);
            
            if (foundUser) {
                performLogin(foundUser.email);
            } else {
                alert('Login ou Senha inválidos!');
            }
        });
    }


    // --- LÓGICA DA PÁGINA DE CADASTRO (só executa se o botão de cadastro existir) ---
    if(signupButton) {
        signupButton.addEventListener('click', (event) => {
            event.preventDefault();

            // Pega os valores dos campos
            const identifier = identifierInput.value;
            const password = passwordInput.value;
            const fullName = fullNameInput.value;
            const username = usernameInput.value;
            
            // Validação dos campos
            if (!identifier) {
                alert('Por favor, preencha o campo "Número do celular ou email".');
                return;
            }
            if (!password) {
                alert('Por favor, preencha o campo "Senha".');
                return;
            }
            if (!fullName) {
                alert('Por favor, preencha o campo "Nome completo".');
                return;
            }
            if (!username) {
                alert('Por favor, preencha o campo "Nome de usuário".');
                return;
            }

            // Se todos os campos estiverem preenchidos, simula o cadastro e faz o login
            console.log('--- Tentativa de Cadastro ---');
            console.log('Todos os campos foram preenchidos corretamente.');

            // Adiciona o novo usuário à lista (apenas para a sessão atual, para simulação)
            validUsers.push({ email: username, password: password });
            console.log('Novo utilizador adicionado (simulação):', { email: username, password: password });

            // Redireciona para o feed
            performLogin(fullName);
        });

        

    }

    // --- Funcionalidade Comum: ---

    // Os botões de login social na página de cadastro também redirecionam direto
    const socialButtonsSignup = document.querySelectorAll('.btn-secondary');
    socialButtonsSignup.forEach(button => {
         button.addEventListener('click', (event) => {
            event.preventDefault();
            const provider = button.textContent.includes('Google') ? 'Google' : 'Apple';
            console.log(`Botão ${provider} na página de cadastro clicado. A simular login...`);
            performLogin(`Utilizador ${provider}`);
        });
    })

    if (togglePasswordButton && passwordInput) {
        togglePasswordButton.addEventListener('click', () => {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
            togglePasswordButton.querySelector('i').classList.toggle('fa-eye');
            togglePasswordButton.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }
});