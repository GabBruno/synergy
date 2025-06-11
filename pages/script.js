// Dados dos amigos
const friendsData = [
  { id: 1, name: "Isabell Mafra", photo: "https://via.placeholder.com/80", status: "online" },
  { id: 2, name: "Jorge Cardoso", photo: "https://via.placeholder.com/80", status: "offline" },
  { id: 3, name: "Rachel Podrez", photo: "https://via.placeholder.com/80", status: "online" },
  { id: 4, name: "Enzo Martins", photo: "https://via.placeholder.com/80", status: "offline" },
  { id: 5, name: "Mattheu Reus", photo: "https://via.placeholder.com/80", status: "online" },
  { id: 6, name: "Michael Nunes", photo: "https://via.placeholder.com/80", status: "online" },
  { id: 7, name: "Maria Avelar", photo: "https://via.placeholder.com/80", status: "offline" },
  { id: 8, name: "João Farias", photo: "https://via.placeholder.com/80", status: "online" },
  { id: 9, name: "Igor Paulo", photo: "https://via.placeholder.com/80", status: "offline" },
  { id: 10, name: "Safira Silva", photo: "https://via.placeholder.com/80", status: "online" },
]

// Dados dos amigos próximos
const closeFriendsData = [
  { id: 1, name: "Andrew Parker", photo: "https://via.placeholder.com/40", status: "online" },
  { id: 2, name: "Bruna Gonnee", photo: "https://via.placeholder.com/40", status: "offline" },
  { id: 3, name: "Mariana Ferrrim", photo: "https://via.placeholder.com/40", status: "online" },
  { id: 4, name: "Fernando Costa", photo: "https://via.placeholder.com/40", status: "online" },
  { id: 5, name: "João Neves", photo: "https://via.placeholder.com/40", status: "offline" },
]

// Estado da aplicação
let pendingFriends = [...friendsData]
let searchTerm = ""

// Elementos DOM
const sidebar = document.getElementById("sidebar")
const overlay = document.getElementById("overlay")
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const searchInput = document.getElementById("searchInput")
const friendsGrid = document.getElementById("friendsGrid")
const noResults = document.getElementById("noResults")
const closeFriendsList = document.getElementById("closeFriendsList")
const friendsCarousel = document.getElementById("friendsCarousel")

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  renderCloseFriends()
  renderFriendsCarousel()
  renderFriends()
  setupEventListeners()
})

// Configurar event listeners
function setupEventListeners() {
  // Menu mobile
  mobileMenuBtn.addEventListener("click", toggleSidebar)
  overlay.addEventListener("click", closeSidebar)

  // Pesquisa
  searchInput.addEventListener("input", handleSearch)

  // Fechar sidebar ao clicar em link (mobile)
  const navLinks = document.querySelectorAll(".nav-link")
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        closeSidebar()
      }
    })
  })

  // Redimensionamento da janela
  window.addEventListener("resize", handleResize)
}

// Toggle sidebar mobile
function toggleSidebar() {
  sidebar.classList.toggle("active")
  overlay.style.display = sidebar.classList.contains("active") ? "block" : "none"

  if (sidebar.classList.contains("active")) {
    setTimeout(() => overlay.classList.add("active"), 10)
    mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>'
  } else {
    overlay.classList.remove("active")
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'
  }
}

// Fechar sidebar
function closeSidebar() {
  sidebar.classList.remove("active")
  overlay.classList.remove("active")
  setTimeout(() => {
    overlay.style.display = "none"
  }, 300)
  mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'
}

// Lidar com redimensionamento
function handleResize() {
  if (window.innerWidth > 768) {
    sidebar.classList.remove("active")
    overlay.style.display = "none"
    overlay.classList.remove("active")
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'
  }
}

// Renderizar amigos próximos
function renderCloseFriends() {
  closeFriendsList.innerHTML = closeFriendsData
    .map(
      (friend) => `
        <li>
            <div class="friend-avatar">
                <img src="${friend.photo}" alt="${friend.name}">
                <span class="status-indicator ${friend.status}"></span>
            </div>
            <span class="friend-name">${friend.name}</span>
        </li>
    `,
    )
    .join("")
}

// Renderizar carrossel de amigos
function renderFriendsCarousel() {
  friendsCarousel.innerHTML = closeFriendsData
    .map(
      (friend) => `
        <div class="carousel-item">
            <img src="${friend.photo}" alt="${friend.name}" title="${friend.name}">
            <span class="status-indicator ${friend.status}"></span>
        </div>
    `,
    )
    .join("")
}

// Renderizar lista de amigos
function renderFriends() {
  const filteredFriends = pendingFriends.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if (filteredFriends.length === 0) {
    friendsGrid.style.display = "none"
    noResults.style.display = "block"
    return
  }

  friendsGrid.style.display = "grid"
  noResults.style.display = "none"

  friendsGrid.innerHTML = filteredFriends
    .map(
      (friend, index) => `
        <div class="friend-card" style="animation-delay: ${index * 0.1}s">
            <div class="friend-card-avatar">
                <img src="${friend.photo}" alt="${friend.name}">
                <span class="status-indicator ${friend.status}"></span>
            </div>
            <h4>${friend.name}</h4>
            <div class="friend-actions">
                <button class="btn btn-accept" onclick="handleAccept(${friend.id})">
                    <i class="fas fa-check"></i> Aceitar
                </button>
                <button class="btn btn-reject" onclick="handleReject(${friend.id})">
                    <i class="fas fa-times"></i> Rejeitar
                </button>
            </div>
        </div>
    `,
    )
    .join("")
}

// Lidar com pesquisa
function handleSearch(event) {
  searchTerm = event.target.value
  renderFriends()
}

// Aceitar amigo
function handleAccept(friendId) {
  const friendCard = event.target.closest(".friend-card")

  // Animação de saída
  friendCard.style.transform = "scale(0.8)"
  friendCard.style.opacity = "0"

  setTimeout(() => {
    pendingFriends = pendingFriends.filter((friend) => friend.id !== friendId)
    renderFriends()

    // Mostrar notificação (opcional)
    showNotification("Solicitação de amizade aceita!", "success")
  }, 300)
}

// Rejeitar amigo
function handleReject(friendId) {
  const friendCard = event.target.closest(".friend-card")

  // Animação de saída
  friendCard.style.transform = "translateX(-100%)"
  friendCard.style.opacity = "0"

  setTimeout(() => {
    pendingFriends = pendingFriends.filter((friend) => friend.id !== friendId)
    renderFriends()

    // Mostrar notificação (opcional)
    showNotification("Solicitação de amizade rejeitada", "info")
  }, 300)
}

// Mostrar notificação (função opcional)
function showNotification(message, type = "info") {
  // Criar elemento de notificação
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <i class="fas fa-${type === "success" ? "check-circle" : "info-circle"}"></i>
        <span>${message}</span>
    `

  // Adicionar estilos inline para a notificação
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : "#3b82f6"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1002;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `

  document.body.appendChild(notification)

  // Animar entrada
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remover após 3 segundos
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Adicionar funcionalidade de teclado para acessibilidade
document.addEventListener("keydown", (event) => {
  // Fechar sidebar com Escape
  if (event.key === "Escape" && sidebar.classList.contains("active")) {
    closeSidebar()
  }

  // Focar na pesquisa com Ctrl+F
  if (event.ctrlKey && event.key === "f") {
    event.preventDefault()
    searchInput.focus()
  }
})

// Lazy loading para imagens (opcional)
function setupLazyLoading() {
  const images = document.querySelectorAll("img[data-src]")

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.removeAttribute("data-src")
        observer.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Função para simular carregamento de mais amigos
function loadMoreFriends() {
  const newFriends = [
    { id: 11, name: "Ana Silva", photo: "https://via.placeholder.com/80", status: "online" },
    { id: 12, name: "Carlos Santos", photo: "https://via.placeholder.com/80", status: "offline" },
    { id: 13, name: "Lucia Oliveira", photo: "https://via.placeholder.com/80", status: "online" },
  ]

  pendingFriends = [...pendingFriends, ...newFriends]
  renderFriends()
}

// Função para alternar tema (opcional)
function toggleTheme() {
  document.body.classList.toggle("dark-theme")
  localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light")
}

// Carregar tema salvo
function loadSavedTheme() {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme")
  }
}

// Inicializar tema
loadSavedTheme()
