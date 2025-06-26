console.log('✅ header.js carregado');

class NotificationToggle {
  constructor() {
    this.dropdown = null;
    this.toggle = null;
    this.closeBtn = null;

    this.init();
  }

  init() {
    const tryInit = () => {
      this.toggle = document.querySelector('#notificationToggle');
      this.dropdown = document.querySelector('#notificationDropdown');
      this.closeBtn = document.querySelector('#closeDropdownBtn');

      if (this.toggle && this.dropdown) {
        this.setupListeners();
      } else {
        setTimeout(tryInit, 100);
      }
    };

    tryInit();
  }

  setupListeners() {
    // Toggle ao clicar no ícone de notificação
    this.toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      this.dropdown.classList.toggle('open');
    });

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
      const isClickInside =
        this.toggle.contains(e.target) || this.dropdown.contains(e.target);
      if (!isClickInside) {
        this.dropdown.classList.remove('open');
      }
    });

    // Fechar ao clicar no botão "X"
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => {
        this.dropdown.classList.remove('open');
      });
    }

    console.log('🔔 Listeners de notificação ativos');
  }
}

new NotificationToggle();