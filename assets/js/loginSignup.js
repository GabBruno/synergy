document.addEventListener('DOMContentLoaded', () => {

    const validUsers = [
        { email: 'ana@synergy.com', password: '123' },
        { email: 'daniel@synergy.com', password: '456' },
        { email: 'admin', password: 'admin' }
    ];

    const passwordInput = document.getElementById('password');
    const togglePasswordButton = document.getElementById('togglePassword');
    
    const loginButton = document.getElementById('loginButton');
    const emailInput = document.getElementById('email');

    const signupButton = document.getElementById('signupButton');
    const identifierInput = document.getElementById('identifier');
    const fullNameInput = document.getElementById('fullName');
    const usernameInput = document.getElementById('username');

    function performLogin(userIdentifier) {
        console.log(`SUCESSO: Utilizador "${userIdentifier}" autenticado.`);
        localStorage.setItem('logado', 'true');
        localStorage.setItem('currentUser', userIdentifier);
        window.location.href = "home.html?page=feed";
    }

    if (loginButton) {
        loginButton.addEventListener('click', (event) => {
            event.preventDefault();
            const emailValue = emailInput.value;
            const passwordValue = passwordInput.value;
            const foundUser = validUsers.find(user => user.email === emailValue && user.password === passwordValue);

            if (foundUser) {
                performLogin(foundUser.email);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro de login',
                    text: 'Login ou Senha inválidos!',
                    confirmButtonColor: 'rgb(255, 107, 0)'
                });
            }
        });
    }

    if (signupButton) {
        signupButton.addEventListener('click', (event) => {
            event.preventDefault();

            const identifier = identifierInput.value;
            const password = passwordInput.value;
            const fullName = fullNameInput.value;
            const username = usernameInput.value;

            if (!identifier) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campo obrigatório',
                    text: 'Por favor, preencha o campo "Número do celular ou email".',
                    confirmButtonColor: 'rgb(255, 107, 0)'
                });
                return;
            }
            if (!password) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campo obrigatório',
                    text: 'Por favor, preencha o campo "Senha".',
                    confirmButtonColor: 'rgb(255, 107, 0)'
                });
                return;
            }
            if (!fullName) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campo obrigatório',
                    text: 'Por favor, preencha o campo "Nome completo".',
                    confirmButtonColor: 'rgb(255, 107, 0)'
                });
                return;
            }
            if (!username) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Campo obrigatório',
                    text: 'Por favor, preencha o campo "Nome de usuário".',
                    confirmButtonColor: 'rgb(255, 107, 0)'
                });
                return;
            }

            console.log('--- Tentativa de Cadastro ---');
            console.log('Todos os campos foram preenchidos corretamente.');
            validUsers.push({ email: username, password: password });
            console.log('Novo utilizador adicionado (simulação):', { email: username, password: password });
            performLogin(fullName);
        });
    }

    const socialButtonsSignup = document.querySelectorAll('.btn-secondary');
    socialButtonsSignup.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const provider = button.textContent.includes('Google') ? 'Google' : 'Apple';
            console.log(`Botão ${provider} na página de cadastro clicado. A simular login...`);
            performLogin(`Utilizador ${provider}`);
        });
    });

    if (togglePasswordButton && passwordInput) {
        togglePasswordButton.addEventListener('click', () => {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
            togglePasswordButton.querySelector('i').classList.toggle('fa-eye-slash');
            togglePasswordButton.querySelector('i').classList.toggle('fa-eye');
        });
    }
});

window.addEventListener('pageshow', (event) => {
    if (event.persisted || window.performance.getEntriesByType("navigation")[0].type === "back_forward") {
        window.location.reload();
    }
});