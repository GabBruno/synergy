class DropdownManager {
  constructor() {
    this.notificationToggle = null;
    this.notificationDropdown = null;
    this.closeNotificationBtn = null;

    this.configToggle = null; // Ícone de engrenagem no cabeçalho
    this.menuConfigToggle = null; // Item de "Configurações" no menu lateral
    this.configDropdown = null;
    this.closeConfigBtn = null;

    this.init();
  }

  init() {
    const tryInit = () => {
      this.notificationToggle = document.querySelector('#notificationToggle');
      this.notificationDropdown = document.querySelector('#notificationDropdown');
      this.closeNotificationBtn = document.querySelector('#closeDropdownBtn');

      this.configToggle = document.querySelector('#configToggle');
      this.menuConfigToggle = document.querySelector('#menuConfigToggle');
      this.configDropdown = document.querySelector('#configDropdown');
      this.closeConfigBtn = document.querySelector('#closeConfigDropdownBtn');

      // Verifica se TODOS os elementos essenciais para AMBOS os dropdowns estão presentes
      if (this.notificationToggle && this.notificationDropdown &&
          this.configToggle && this.configDropdown && this.menuConfigToggle) {
        this.setupListeners();
      } else {
        // Se os elementos ainda não existirem, tenta novamente após um curto período
        setTimeout(tryInit, 100);
      }
    };

    tryInit();
  }

  setupListeners() {
    // Listener para o toggle de notificações
    this.notificationToggle.addEventListener('click', (e) => {
      e.stopPropagation(); // Evita que o clique se propague para o document e feche imediatamente
      this.toggleDropdown(this.notificationDropdown);
    });

    // Listener para o toggle de configurações (ícone do cabeçalho)
    this.configToggle.addEventListener('click', (e) => {
      e.stopPropagation(); // Evita que o clique se propague para o document e feche imediatamente
      this.toggleDropdown(this.configDropdown);
    });

    // Listener para o toggle de configurações (menu lateral)
    if (this.menuConfigToggle) { // Garante que o elemento existe antes de adicionar o listener
        this.menuConfigToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault(); // Evita que o link # navegue para o topo da página
            this.toggleDropdown(this.configDropdown);
        });
    }

    // Listener para fechar dropdown de notificações
    if (this.closeNotificationBtn) {
      this.closeNotificationBtn.addEventListener('click', () => {
        this.notificationDropdown.classList.remove('open');
      });
    }

    // Listener para fechar dropdown de configurações
    if (this.closeConfigBtn) {
      this.closeConfigBtn.addEventListener('click', () => {
        this.configDropdown.classList.remove('open');
      });
    }

    // Fechar dropdowns ao clicar fora
    document.addEventListener('click', (e) => {
      const isClickInsideNotification = this.notificationToggle.contains(e.target) || this.notificationDropdown.contains(e.target);
      const isClickInsideConfigHeader = this.configToggle.contains(e.target) || this.configDropdown.contains(e.target);
      const isClickInsideConfigMenu = this.menuConfigToggle && this.menuConfigToggle.contains(e.target); // Verifica se o clique foi no item do menu

      if (!isClickInsideNotification) {
        this.notificationDropdown.classList.remove('open');
      }
      // O dropdown de configurações deve fechar se o clique não for em nenhum dos seus toggles ou dentro dele mesmo
      if (!isClickInsideConfigHeader && !isClickInsideConfigMenu) {
        this.configDropdown.classList.remove('open');
      }
    });
  }

  // Modificado: Removido o parâmetro associatedMenuItem e a lógica de classe
  toggleDropdown(targetDropdown) {
    // Fecha o outro dropdown se estiver aberto
    if (targetDropdown === this.notificationDropdown && this.configDropdown.classList.contains('open')) {
      this.configDropdown.classList.remove('open');
    } else if (targetDropdown === this.configDropdown && this.notificationDropdown.classList.contains('open')) {
      this.notificationDropdown.classList.remove('open');
    }

    // Abre/fecha o dropdown clicado
    targetDropdown.classList.toggle('open');
  }
}

new DropdownManager();