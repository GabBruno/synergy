class SynergyApp {
    constructor() {
        this.joinedGroups = new Set();
        this.isMobile = window.innerWidth <= 768;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupMobileMenu();
        this.setupResponsiveHandlers();
        this.animateOnLoad();
    }

    setupEventListeners() {
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', (e) => this.switchTab(e.target.closest('.tab').dataset.tab));
        });

        document.querySelectorAll('.btn-accept, .btn-reject').forEach(button => {
            button.addEventListener('click', (e) => this.handleFriendRequest(e));
        });

        document.querySelectorAll('.btn-join').forEach(button => {
            button.addEventListener('click', (e) => this.handleGroupJoin(e));
        });

        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => this.handleNavigation(e));
        });

        document.querySelectorAll('.avatar').forEach(avatar => {
            avatar.addEventListener('mouseenter', (e) => this.avatarHover(e, true));
            avatar.addEventListener('mouseleave', (e) => this.avatarHover(e, false));
        });

        document.querySelectorAll('.friend-item').forEach(item => {
            item.addEventListener('click', (e) => this.openFriendProfile(e));
        });

        document.querySelectorAll('.group-card').forEach(card => {
            card.addEventListener('click', (e) => this.handleGroupClick(e));
        });

        document.querySelector('.see-more').addEventListener('click', () => {
            this.loadMoreFriends();
        });

        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleActionButton(e));
        });
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const sidebar = document.getElementById('sidebar');
        const sidebarClose = document.getElementById('sidebarClose');
        const mobileOverlay = document.getElementById('mobileOverlay');

        mobileMenuBtn.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        sidebarClose.addEventListener('click', () => {
            this.closeMobileMenu();
        });

        mobileOverlay.addEventListener('click', () => {
            this.closeMobileMenu();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMobileMenuOpen()) {
                this.closeMobileMenu();
            }
        });
    }

    setupResponsiveHandlers() {
        window.addEventListener('resize', () => {
            const wasMobile = this.isMobile;
            this.isMobile = window.innerWidth <= 768;
            
            if (wasMobile !== this.isMobile) {
                if (!this.isMobile) {
                    this.closeMobileMenu();
                }
                this.handleResponsiveChanges();
            }
        });

        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipeGesture(touchStartX, touchEndX);
        });
    }

    handleSwipeGesture(startX, endX) {
        const swipeThreshold = 100;
        const swipeDistance = endX - startX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0 && startX < 50) {
                this.openMobileMenu();
            } else if (swipeDistance < 0 && this.isMobileMenuOpen()) {
                this.closeMobileMenu();
            }
        }
    }

    toggleMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileOverlay = document.getElementById('mobileOverlay');

        if (this.isMobileMenuOpen()) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileOverlay = document.getElementById('mobileOverlay');

        sidebar.classList.add('active');
        mobileMenuBtn.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeMobileMenu() {
        const sidebar = document.getElementById('sidebar');
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileOverlay = document.getElementById('mobileOverlay');

        sidebar.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    isMobileMenuOpen() {
        return document.getElementById('sidebar').classList.contains('active');
    }

    handleResponsiveChanges() {
        const friendRequests = document.getElementById('friendRequests');
        const groupsContent = document.getElementById('groupsContent');
        
        if (this.isMobile) {
            this.optimizeForMobile();
        } else {
            this.optimizeForDesktop();
        }
    }

    optimizeForMobile() {
        const cards = document.querySelectorAll('.friend-card, .group-card');
        cards.forEach(card => {
            card.style.minHeight = 'auto';
        });
    }

    optimizeForDesktop() {
        const cards = document.querySelectorAll('.friend-card, .group-card');
        cards.forEach(card => {
            card.style.minHeight = '';
        });
    }

    switchTab(tabName) {
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        const friendsContent = document.getElementById('friendRequests');
        const groupsContent = document.getElementById('groupsContent');
        const friendsAvatars = document.querySelector('.friends-avatars');

        if (tabName === 'friends') {
            friendsContent.style.display = 'grid';
            friendsAvatars.style.display = 'block';
            groupsContent.style.display = 'none';
            groupsContent.classList.remove('active');
            this.addFadeInAnimation(friendsContent);
        } else {
            friendsContent.style.display = 'none';
            friendsAvatars.style.display = 'none';
            groupsContent.style.display = 'block';
            setTimeout(() => {
                groupsContent.classList.add('active');
            }, 50);
        }

        if (this.isMobile) {
            this.closeMobileMenu();
        }
    }

    async handleFriendRequest(event) {
        const button = event.target;
        const card = button.closest('.friend-card');
        const friendName = card.dataset.name;
        const isAccept = button.classList.contains('btn-accept');

        button.classList.add('loading');
        button.textContent = '';

        await this.delay(1000);

        button.classList.remove('loading');

        if (isAccept) {
            button.textContent = 'Aceitar';
            this.showToast(`✅ Você agora é amigo(a) de ${friendName}!`);
            this.addFriendToSidebar(friendName);
            this.updateFriendsCount(1);
        } else {
            button.textContent = 'Rejeitar';
            this.showToast(`❌ Solicitação de ${friendName} rejeitada.`);
        }

        this.removeCard(card);
        this.updateTabCount('friends', -1);
    }

    async handleGroupJoin(event) {
        event.stopPropagation();
        const button = event.target;
        const card = button.closest('.group-card');
        const groupName = card.querySelector('.group-name').textContent;
        const groupId = card.dataset.group;

        if (this.joinedGroups.has(groupId)) {
            this.showToast(`ℹ️ Você já faz parte do grupo ${groupName}`);
            return;
        }

        button.classList.add('loading');
        button.textContent = '';

        await this.delay(1500);

        button.classList.remove('loading');
        button.textContent = 'ENTROU';
        
        card.classList.add('joined');
        this.joinedGroups.add(groupId);
        
        this.showToast(`🎉 Você entrou no grupo ${groupName}!`);
        this.updateGroupPosts(card);
        this.updateGroupMembers(card);
    }

    handleGroupClick(event) {
        if (event.target.classList.contains('btn-join')) return;
        
        const card = event.currentTarget;
        const groupName = card.querySelector('.group-name').textContent;
        
        this.showToast(`📱 Abrindo grupo ${groupName}...`);
        
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    }

    handleActionButton(event) {
        const button = event.currentTarget;
        const isSearch = button.classList.contains('search-btn');
        const isFilter = button.classList.contains('filter-btn');
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }

    updateGroupPosts(card) {
        const postsElement = card.querySelector('.group-posts');
        const currentText = postsElement.textContent;
        
        if (currentText.includes('Sem novas')) {
            postsElement.textContent = '1+ NOVAS PUBLICAÇÕES';
        } else {
            const match = currentText.match(/(\d+)\+/);
            if (match) {
                const currentCount = parseInt(match[1]);
                const newCount = currentCount + Math.floor(Math.random() * 5) + 1;
                postsElement.textContent = `${newCount}+ NOVAS PUBLICAÇÕES`;
            }
        }
    }

    updateGroupMembers(card) {
        const membersElement = card.querySelector('.group-members');
        const currentText = membersElement.textContent;
        const match = currentText.match(/(\d+(?:\.\d+)?k?)/);
        
        if (match) {
            let currentCount = match[1];
            if (currentCount.includes('k')) {
                const num = parseFloat(currentCount.replace('k', ''));
                const newNum = (num + 0.1).toFixed(1);
                membersElement.textContent = `${newNum}k membros`;
            } else {
                const num = parseInt(currentCount);
                membersElement.textContent = `${num + 1} membros`;
            }
        }
    }

    updateFriendsCount(change) {
        const friendsCountElement = document.querySelector('.friends-count');
        const currentText = friendsCountElement.textContent;
        const match = currentText.match(/$$(\d+)$$/);
        
        if (match) {
            const currentCount = parseInt(match[1]);
            const newCount = Math.max(0, currentCount + change);
            friendsCountElement.textContent = `(${newCount})`;
        }
    }

    updateTabCount(tabName, change) {
        const tab = document.querySelector(`[data-tab="${tabName}"]`);
        const countElement = tab.querySelector('.tab-count');
        
        if (countElement) {
            const currentCount = parseInt(countElement.textContent);
            const newCount = Math.max(0, currentCount + change);
            countElement.textContent = newCount;
        }
    }

    removeCard(card) {
        card.classList.add('removing');
        setTimeout(() => {
            card.remove();
            this.checkEmptyState();
        }, 500);
    }

    checkEmptyState() {
        const remainingCards = document.querySelectorAll('.friend-card:not(.removing)');
        if (remainingCards.length === 0) {
            const container = document.getElementById('friendRequests');
            container.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; padding: 60px 20px; text-align: center;">
                    <h2>🎉 Todas as solicitações foram processadas!</h2>
                    <p style="margin: 16px 0; color: var(--text-secondary);">Você não tem mais solicitações de amizade pendentes.</p>
                    <button class="btn-join" onclick="app.switchTab('groups')" style="max-width: 200px;">Ver Grupos</button>
                </div>
            `;
        }
    }

    addFriendToSidebar(friendName) {
        const friendsList = document.querySelector('.friend-list');
        const newFriend = document.createElement('div');
        newFriend.className = 'friend-item';
        newFriend.style.opacity = '0';
        newFriend.innerHTML = `
            <img src="/placeholder.svg?height=32&width=32" alt="${friendName}">
            <div class="friend-info">
                <span class="friend-name">${friendName}</span>
                <span class="friend-status online">Online</span>
            </div>
        `;
        
        friendsList.appendChild(newFriend);
        
        setTimeout(() => {
            newFriend.style.transition = 'opacity 0.3s ease';
            newFriend.style.opacity = '1';
        }, 100);

        newFriend.addEventListener('click', (e) => this.openFriendProfile(e));
    }

    showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    handleNavigation(event) {
        const clickedItem = event.currentTarget;
        const page = clickedItem.dataset.page;
        
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        clickedItem.classList.add('active');
        
        this.createRipple(clickedItem, event);
        
        const navText = clickedItem.querySelector('span:last-child').textContent;
        if (navText !== 'Comunidade') {
            this.showToast(`🚀 Navegando para ${navText}...`);
        }

        if (this.isMobile) {
            this.closeMobileMenu();
        }
    }

    createRipple(element, event) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 107, 53, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    avatarHover(event, isEntering) {
        if (this.isMobile) return;
        
        const avatar = event.target;
        if (isEntering) {
            avatar.style.transform = 'scale(1.1)';
            avatar.style.boxShadow = '0 4px 12px rgba(255, 107, 53, 0.3)';
        } else {
            avatar.style.transform = 'scale(1)';
            avatar.style.boxShadow = 'none';
        }
    }

    openFriendProfile(event) {
        const friendItem = event.currentTarget;
        const friendName = friendItem.querySelector('.friend-name').textContent;
        this.showToast(`👤 Abrindo perfil de ${friendName}...`);
        
        friendItem.style.transform = 'scale(0.95)';
        setTimeout(() => {
            friendItem.style.transform = 'scale(1)';
        }, 150);
    }

    loadMoreFriends() {
        const friendsList = document.querySelector('.friend-list');
        const seeMore = document.querySelector('.see-more');
        
        seeMore.textContent = 'Carregando...';
        
        setTimeout(() => {
            const moreFriends = [
                { name: 'Ana Silva', status: 'online' },
                { name: 'Carlos Santos', status: 'away' },
                { name: 'Maria Oliveira', status: 'online' }
            ];
            
            moreFriends.forEach((friend, index) => {
                setTimeout(() => {
                    const friendItem = document.createElement('div');
                    friendItem.className = 'friend-item';
                    friendItem.style.opacity = '0';
                    friendItem.innerHTML = `
                        <img src="/placeholder.svg?height=32&width=32" alt="${friend.name}">
                        <div class="friend-info">
                            <span class="friend-name">${friend.name}</span>
                            <span class="friend-status ${friend.status}">${friend.status === 'online' ? 'Online' : friend.status === 'away' ? 'Ausente' : 'Offline'}</span>
                        </div>
                    `;
                    
                    friendsList.appendChild(friendItem);
                    friendItem.addEventListener('click', (e) => this.openFriendProfile(e));
                    
                    setTimeout(() => {
                        friendItem.style.transition = 'opacity 0.3s ease';
                        friendItem.style.opacity = '1';
                    }, 100);
                }, index * 200);
            });
            
            this.updateFriendsCount(3);
            seeMore.textContent = 'Ver mais';
        }, 1000);
    }

    addFadeInAnimation(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 50);
    }

    animateOnLoad() {
        const cards = document.querySelectorAll('.friend-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });

        const avatars = document.querySelectorAll('.avatar');
        avatars.forEach((avatar, index) => {
            avatar.style.opacity = '0';
            avatar.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                avatar.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                avatar.style.opacity = '1';
                avatar.style.transform = 'scale(1)';
            }, 500 + index * 50);
        });

        const groupCards = document.querySelectorAll('.group-card');
        groupCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 80);
        });
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new SynergyApp();
});

document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'f' && !e.ctrlKey && !e.altKey) {
        document.querySelector('[data-tab="friends"]').click();
    }
    if (e.key.toLowerCase() === 'g' && !e.ctrlKey && !e.altKey) {
        document.querySelector('[data-tab="groups"]').click();
    }
});

setInterval(() => {
    if (app && !app.isMobile) {
        const groupCards = document.querySelectorAll('.group-card:not(.joined)');
        if (groupCards.length > 0) {
            const randomCard = groupCards[Math.floor(Math.random() * groupCards.length)];
            const postsElement = randomCard.querySelector('.group-posts');
            const currentText = postsElement.textContent;
            
            if (!currentText.includes('Sem novas')) {
                const match = currentText.match(/(\d+)\+/);
                if (match) {
                    const currentCount = parseInt(match[1]);
                    const newCount = currentCount + Math.floor(Math.random() * 3) + 1;
                    postsElement.textContent = `${newCount}+ NOVAS PUBLICAÇÕES`;
                    postsElement.style.animation = 'pulse 0.5s ease';
                    setTimeout(() => {
                        postsElement.style.animation = '';
                    }, 500);
                }
            }
        }
    }
}, 15000);

const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(pulseStyle);