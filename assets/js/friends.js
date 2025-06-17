// Dados dos usuários para solicitações de amizade
const friendRequests = [
    {
        id: 1,
        name: "Isabell Mafra",
        image: "/placeholder.svg?height=120&width=120"
    },
    {
        id: 2,
        name: "Jorge Cardoso",
        image: "/placeholder.svg?height=120&width=120"
    },
    {
        id: 3,
        name: "Rachel Podrez",
        image: "/placeholder.svg?height=120&width=120"
    },
    {
        id: 4,
        name: "Enzo Martins",
        image: "/placeholder.svg?height=120&width=120"
    },
    {
        id: 5,
        name: "Matheus Reus",
        image: "/placeholder.svg?height=120&width=120"
    },
    {
        id: 6,
        name: "Michael Nunes",
        image: "/placeholder.svg?height=120&width=120"
    },
    {
        id: 7,
        name: "Maria Avelar",
        image: "/placeholder.svg?height=120&width=120"
    },
    {
        id: 8,
        name: "João Farias",
        image: "/placeholder.svg?height=120&width=120"
    },
    {
        id: 9,
        name: "Igor Paulo",
        image: "/placeholder.svg?height=120&width=120"
    },
    {
        id: 10,
        name: "Safira Silva",
        image: "/placeholder.svg?height=120&width=120"
    }
];

// Elementos do DOM
const friendRequestsGrid = document.getElementById('friendRequestsGrid');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notificationText');
const tabs = document.querySelectorAll('.tab');

// Função para mostrar notificação
function showNotification(message, type = 'success') {
    notificationText.textContent = message;
    notification.className = notification show ${type};
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Função para criar card de solicitação de amizade
function createFriendCard(friend) {
    const card = document.createElement('div');
    card.className = 'friend-card';
    card.setAttribute('data-id', friend.id);
    
    card.innerHTML = `
        <img src="${friend.image}" alt="${friend.name}" loading="lazy">
        <h3>${friend.name}</h3>
        <div class="button-group">
            <button class="btn btn-accept" onclick="acceptFriend(${friend.id}, '${friend.name}')">
                <i class="fas fa-check"></i> Aceitar
            </button>
            <button class="btn btn-reject" onclick="rejectFriend(${friend.id}, '${friend.name}')">
                <i class="fas fa-times"></i> Rejeitar
            </button>
        </div>
    `;
    
    return card;
}

// Função para renderizar todas as solicitações de amizade
function renderFriendRequests() {
    friendRequestsGrid.innerHTML = '';
    
    friendRequests.forEach((friend, index) => {
        const card = createFriendCard(friend);
        
        // Adiciona animação de entrada escalonada
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px)';
            friendRequestsGrid.appendChild(card);
            
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });
}

// Função para aceitar solicitação de amizade
function acceptFriend(id, name) {
    const card = document.querySelector([data-id="${id}"]);
    
    // Animação de aceitação
    card.style.transform = 'scale(1.1)';
    card.style.backgroundColor = '#e8f5e8';
    
    setTimeout(() => {
        card.classList.add('removing');
        showNotification(Você aceitou a solicitação de ${name}!, 'success');
        
        setTimeout(() => {
            card.remove();
            // Remove do array
            const index = friendRequests.findIndex(friend => friend.id === id);
            if (index > -1) {
                friendRequests.splice(index, 1);
            }
        }, 500);
    }, 300);
}

// Função para rejeitar solicitação de amizade
function rejectFriend(id, name) {
    const card = document.querySelector([data-id="${id}"]);
    
    // Animação de rejeição
    card.style.transform = 'scale(0.9)';
    card.style.backgroundColor = '#ffe8e8';
    
    setTimeout(() => {
        card.classList.add('removing');
        showNotification(Você rejeitou a solicitação de ${name}., 'info');
        
        setTimeout(() => {
            card.remove();
            // Remove do array
            const index = friendRequests.findIndex(friend => friend.id === id);
            if (index > -1) {
                friendRequests.splice(index, 1);
            }
        }, 500);
    }, 300);
}

// Função para alternar entre abas
function switchTab(tabName) {
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        }
    });
    
    if (tabName === 'grupos') {
        friendRequestsGrid.innerHTML = '<div style="text-align: center; padding: 50px; color: #999;"><h2>Seção de Grupos em Desenvolvimento</h2><p>Esta funcionalidade estará disponível em breve!</p></div>';
    } else {
        renderFriendRequests();
    }
}

// Event listeners para as abas
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        switchTab(tab.dataset.tab);
    });
});

// Event listeners para itens do menu lateral
document.querySelectorAll('.nav-menu li').forEach(item => {
    item.addEventListener('click', function() {
        // Remove active de todos os itens
        document.querySelectorAll('.nav-menu li').forEach(li => {
            li.classList.remove('active');
        });
        
        // Adiciona active ao item clicado
        this.classList.add('active');
        
        // Simula navegação
        const text = this.textContent.trim();
        if (text !== 'Comunidade') {
            showNotification(Navegando para: ${text}, 'info');
        }
    });
});

// Event listeners para avatares de amigos
document.querySelectorAll('.avatar').forEach(avatar => {
    avatar.addEventListener('click', function() {
        this.style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
        
        showNotification('Visualizando perfil do amigo...', 'info');
    });
});

// Event listeners para lista de amigos na sidebar
document.querySelectorAll('.friend-item').forEach(item => {
    item.addEventListener('click', function() {
        const name = this.querySelector('span').textContent;
        showNotification(Abrindo conversa com ${name}..., 'info');
    });
});

// Efeito de digitação no logo
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Inicialização da página
document.addEventListener('DOMContentLoaded', function() {
    // Efeito de digitação no logo
    const logo = document.querySelector('.logo h1');
    typeWriter(logo, 'synergy', 150);
    
    // Renderiza as solicitações de amizade
    setTimeout(() => {
        renderFriendRequests();
    }, 1000);
    
    // Adiciona efeito de hover aos elementos interativos
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efeito de parallax suave no scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.friends-avatars');
        if (parallax) {
            parallax.style.transform = translateY(${scrolled * 0.1}px);
        }
    });
    
    // Adiciona animação de entrada para elementos
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Observa elementos para animação
    document.querySelectorAll('.friend-card').forEach(card => {
        observer.observe(card);
    });
});

// Função para buscar amigos (funcionalidade extra)
function searchFriends(query) {
    const filteredFriends = friendRequests.filter(friend => 
        friend.name.toLowerCase().includes(query.toLowerCase())
    );
    
    friendRequestsGrid.innerHTML = '';
    filteredFriends.forEach((friend, index) => {
        const card = createFriendCard(friend);
        setTimeout(() => {
            friendRequestsGrid.appendChild(card);
        }, index * 100);
    });
}

// Adiciona funcionalidade de teclado
document.addEventListener('keydown', function(e) {
    // Atalho para aceitar primeira solicitação (Ctrl + A)
    if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        const firstCard = document.querySelector('.friend-card');
        if (firstCard) {
            const id = parseInt(firstCard.dataset.id);
            const name = firstCard.querySelector('h3').textContent;
            acceptFriend(id, name);
        }
    }
    
    // Atalho para rejeitar primeira solicitação (Ctrl + R)
    if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        const firstCard = document.querySelector('.friend-card');
        if (firstCard) {
            const id = parseInt(firstCard.dataset.id);
            const name = firstCard.querySelector('h3').textContent;
            rejectFriend(id, name);
        }
    }
});