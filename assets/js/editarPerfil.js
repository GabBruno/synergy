// ✅ FUNÇÃO PRINCIPAL - Modal de Edição de Perfil
window.openEditProfileModal = () => {
    const editProfileHtmlContent = `
        <div class="edit-profile-modal-content">
            <form class="form-box">
                <h2>Editar Perfil</h2>

                <div class="profile-image">
                    <img src="assets/images/gabriel.png" alt="Foto de perfil">
                </div>

                <div class="campo">
                    <label for="nome">Nome</label>
                    <input type="text" id="edit-nome" value="Daniel Trindade">
                </div>

                <div class="campo">
                    <label for="email">E-mail</label>
                    <input type="email" id="edit-email" value="daniel@example.com">
                </div>

                <div class="campo">
                    <label for="nascimento">Data de Nascimento</label>
                    <input type="date" id="edit-nascimento" value="2002-01-01">
                </div>

                <div class="campo">
                    <label for="pais">País</label>
                    <input type="text" id="edit-pais" value="Brasil">
                </div>

                <div class="campo">
                    <label for="senha">Senha</label>
                    <input type="password" id="edit-senha" value="123456">
                </div>
            </form>
        </div>
    `;

    // Verifica se SweetAlert2 está disponível antes de usá-lo
    if (typeof Swal === 'undefined') {
        console.error("SweetAlert2 não está carregado. Certifique-se de que o CDN está incluído.");
        return;
    }

    Swal.fire({
        title: false,
        html: editProfileHtmlContent,
        showCloseButton: true,
        showConfirmButton: true,
        confirmButtonText: 'Salvar Alterações',
        focusConfirm: false,
        customClass: {
            container: 'swal2-container-edit-profile',
            popup: 'swal2-popup-edit-profile',
            confirmButton: 'swal2-confirm-button-edit-profile',
            htmlContainer: 'swal2-html-container-edit-profile'
        },
        didOpen: () => {
            // Lógica para pré-preencher campos, se necessário
        },
        preConfirm: () => {
            const nome = Swal.getPopup().querySelector('#edit-nome').value;
            const email = Swal.getPopup().querySelector('#edit-email').value;
            const nascimento = Swal.getPopup().querySelector('#edit-nascimento').value;
            const pais = Swal.getPopup().querySelector('#edit-pais').value;
            const senha = Swal.getPopup().querySelector('#edit-senha').value;

            if (!nome || !email) {
                Swal.showValidationMessage('Por favor, preencha nome e e-mail.');
                return false;
            }
            return { nome, email, nascimento, pais, senha };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            console.log('Dados do perfil salvos:', result.value);
            window.Swal.fire('Salvo!', 'Suas alterações no perfil foram salvas com sucesso.', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            window.Swal.fire('Cancelado', 'As alterações no perfil foram canceladas.', 'info');
        }
    });
};

// ✅ Função de inicialização para ser chamada externamente
window.initEditarPerfilModal = () => {
    // Adicionar event listener ao botão "Editar Perfil"
    // Usamos document.querySelector pois o elemento pode ter sido carregado dinamicamente
    const editProfileBtn = document.querySelector('.botoes button');
    if (editProfileBtn) {
        // Removendo listener duplicado se já houver um
        editProfileBtn.removeEventListener('click', window.openEditProfileModal);
        editProfileBtn.addEventListener('click', window.openEditProfileModal);
        console.log("✅ Listener para Editar Perfil anexado.");
    } else {
        console.warn("⚠️ Botão 'Editar Perfil' não encontrado. Verifique se o elemento está presente no DOM.");
    }
};

console.log("✅ editarPerfil.js carregado. Função initEditarPerfilModal() disponível.");