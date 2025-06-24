// Função para abrir o modal de criação de publicação
function openPostCreationModal() {
    Swal.fire({
        title: 'Criar Publicação',
        html: `
            <div class="post-header">
                <img src="https://via.placeholder.com/50" alt="Daniel Trindade">
                <div class="user-info">
                    <strong>Daniel Trindade</strong>
                    <div class="options">
                        <button class="option-button">Público</button>
                        <button class="option-button">+ Álbum</button>
                    </div>
                </div>
            </div>
            <div class="post-content">
                <textarea placeholder="O que você está pensando, Daniel?"></textarea>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <img src="https://via.placeholder.com/30/92B9DA/FFFFFF?text=Aa" alt="Aa" style="border-radius: 5px;">
                    <span style="font-size: 1.8em; cursor: pointer;">😊</span>
                </div>
            </div>
            <div class="post-actions">
                <span class="add-to-post">Adicione à sua publicação</span>
                <div class="icon-group">
                    <i class="fas fa-image"></i> <i class="fas fa-user-friends"></i> <i class="fas fa-smile"></i> <i class="fas fa-map-marker-alt"></i> <i class="fas fa-video"></i> <i class="fas fa-ellipsis-h"></i> </div>
            </div>
        `,
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Publicar',
        focusConfirm: false,
        customClass: {
            title: 'swal2-title',
            popup: 'swal2-popup',
            confirmButton: 'swal2-confirm',
            closeButton: 'swal2-close-button',
            htmlContainer: 'swal2-html-container'
        },
        // Você não precisa mais do didOpen para Font Awesome se já incluiu no HTML
    });
}