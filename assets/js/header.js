class DropdownManager {
  constructor() {
    this.notificationToggle = null;
    this.notificationDropdown = null;
    this.closeNotificationBtn = null;

    this.configToggle = null; 
    this.menuConfigToggle = null; 
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

      if (this.notificationToggle && this.notificationDropdown &&
          this.configToggle && this.configDropdown) {
        this.setupListeners();
      } else {
        setTimeout(tryInit, 100);
      }
    };

    tryInit();
  }

  setupListeners() {
    this.notificationToggle.addEventListener('click', (e) => {
      e.stopPropagation(); 
      this.toggleDropdown(this.notificationDropdown);
    });

    this.configToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleDropdown(this.configDropdown);
    });

    if (this.menuConfigToggle) {
        this.menuConfigToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault(); 
            this.toggleDropdown(this.configDropdown);
        });
    }

    if (this.closeNotificationBtn) {
      this.closeNotificationBtn.addEventListener('click', () => {
        this.notificationDropdown.classList.remove('open');
        this.checkBodyScroll();
      });
    }

    if (this.closeConfigBtn) {
      this.closeConfigBtn.addEventListener('click', () => {
        this.configDropdown.classList.remove('open');
        this.checkBodyScroll();
      });
    }

    document.addEventListener('click', (e) => {
      const isClickInsideNotification = this.notificationToggle.contains(e.target) || this.notificationDropdown.contains(e.target);
      const isClickInsideConfigHeader = this.configToggle.contains(e.target) || this.configDropdown.contains(e.target);
      const isClickInsideConfigMenu = this.menuConfigToggle && this.menuConfigToggle.contains(e.target);

      if (!isClickInsideNotification) {
        this.notificationDropdown.classList.remove('open');
      }
      if (!isClickInsideConfigHeader && !isClickInsideConfigMenu) {
        this.configDropdown.classList.remove('open');
      }
      this.checkBodyScroll();
    });
  }

  toggleDropdown(targetDropdown) {
    
    if (targetDropdown === this.notificationDropdown && this.configDropdown.classList.contains('open')) {
      this.configDropdown.classList.remove('open');
    } else if (targetDropdown === this.configDropdown && this.notificationDropdown.classList.contains('open')) {
      this.notificationDropdown.classList.remove('open');
    }

    targetDropdown.classList.toggle('open');
    this.checkBodyScroll(); 
  }

  checkBodyScroll() {
    
    const isAnyDropdownOpen = this.notificationDropdown.classList.contains('open') ||
                             this.configDropdown.classList.contains('open');

    
    if (window.innerWidth <= 800) { 
      if (isAnyDropdownOpen) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
    } else {
      document.body.classList.remove('no-scroll');
    }
  }
}

new DropdownManager();