if (localStorage.getItem('logado') !== 'true') {
  window.location.href = 'index.html';
}

async function carregarParcial(id, arquivo, callback = null) {
  const el = document.getElementById(id);
  try {
    const resposta = await fetch(arquivo);
    el.innerHTML = await resposta.text();
    if (callback && typeof callback === 'function') {
      callback();
    }
  } catch {
    el.innerHTML = `<p>Erro ao carregar ${arquivo}</p>`;
  }
}

function carregarScriptPaginaUnica(pagina) {
  
  document.querySelectorAll(`script[src*="${pagina}.js"]`).forEach(script => script.remove());

  const script = document.createElement('script');
  script.src = `assets/js/${pagina}.js?v=${Date.now()}`;
  script.onload = () => {

    const initFunctionName = `init${capitalize(pagina)}Page`;

    if (typeof window[initFunctionName] === 'function') {
      window[initFunctionName]();
    }
  };
  script.onerror = () => console.error(`❌ Erro ao carregar ${pagina}.js`);
  document.body.appendChild(script);
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function carregarConteudoPrincipal() {
  const params = new URLSearchParams(window.location.search);
  const pagina = params.get('page') || 'feed';
  const url = `pages/${pagina}.html`; 
  const layout = document.querySelector('.layout');

  try {
    const resposta = await fetch(url);
    if (!resposta.ok) throw new Error();

    const html = await resposta.text();
    document.getElementById('conteudo').innerHTML = html;

    configurarBotoesToggle();

    const paginasComJS = ['friends', 'conversas', 'perfil']; 
    if (paginasComJS.includes(pagina)) {
      
      if (pagina === 'perfil') {
    
        if (typeof window.initEditarPerfilModal === 'function') {
            window.initEditarPerfilModal();
        } else {
            console.warn("⚠️ initEditarPerfilModal não disponível no carregamento dinâmico.");
        }
      } else {
          carregarScriptPaginaUnica(pagina);
      }
    }

  } catch (error) { 
    console.error(`Erro ao carregar conteúdo principal para ${pagina}.html:`, error);
    document.getElementById('conteudo').innerHTML = '<h2>Página não encontrada</h2>';
  }
}

function configurarLinksInternos() {
  document.body.addEventListener('click', function (e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('?page=')) {
      e.preventDefault();
      const url = new URL(e.target.href);
      history.pushState({}, '', url);
      carregarConteudoPrincipal();
      marcarLinkAtivo();
    }
  });
}

function sair() {
  localStorage.removeItem('logado');
  window.location.href = 'index.html';
}

function marcarLinkAtivo() {
  const links = document.querySelectorAll('.menu-link');
  const paginaAtual = new URLSearchParams(window.location.search).get('page') || 'feed';

  links.forEach(link => {
    const href = new URL(link.href).searchParams.get('page');
    link.classList.toggle('active', href === paginaAtual);
  });
}

function configurarBotoesToggle() {
  const botoes = document.querySelectorAll('.action-button');
  botoes.forEach(botao => {
    botao.addEventListener('click', () => {
      botao.classList.toggle('ativo');
    });
  });
}

window.addEventListener('load', async () => {
  carregarParcial('header', 'includes/header.html');
  await carregarParcial('menu', 'includes/menu.html');
  marcarLinkAtivo();

  carregarParcial('friends-menu', 'includes/friends-menu.html');
  carregarParcial('footer', 'includes/footer.html');
  carregarConteudoPrincipal();
  configurarLinksInternos();
  configurarBotoesToggle();

  document.body.addEventListener('click', function (e) {
    const target = e.target.closest('#btnPost');
    if (target) openPostCreationModal();
  });

  document.body.addEventListener('click', function (e) {
    const target = e.target.closest('#btnStory');
    if (target) openStoryCreationModal();
  });
});

window.addEventListener('popstate', () => {
  carregarConteudoPrincipal();
  marcarLinkAtivo();
});