window.initConversasPage = function () {
  
  const chatData = {
    andrew: {
      name: "Andrew Parker",
      avatar: "assets/images/andrew.png",
      friendshipDate: "Diga oi para seu novo amigo Synergy, Andrew Parker",
      messages: [
        {
          type: "received",
          text: "Eai, Daniel!",
          time: "23:46",
          avatar: "assets/images/andrew.png",
        },
        { type: "sent", text: "Oi, Andrew!", time: "23:46" },
        { type: "sent", text: "Vamo ver o jogo juntos?", time: "23:46" },

        {
          type: "received",
          text: "Claro, estou indo agora pra sua casa!",
          time: "23:47",
          avatar: "assets/images/andrew.png",
        },
      ],
    },
    bruna: {
      name: "Bruna Gomes",
      avatar: "assets/images/bruna.png",
      friendshipDate: "Diga oi para seu novo amigo Synergy, Bruna Gomes",
      messages: [
        {
          type: "received",
          text: "Oi amor, tudo certo pra hoje?",
          time: "23:46",
          avatar: "assets/images/bruna.png",
        },
        { type: "sent", text: "Oi amor", time: "23:46" },
        {
          type: "received",
          text: "Ok!",
          time: "23:47",
          avatar: "assets/images/bruna.png",
        },
        { type: "sent", text: "Sim!", time: "23:47" },
        { type: "sent", text: "Vamos no Paris 6!", time: "23:47" },
      ],
    },
    mariana: {
      name: "Mariana Ferreira",
      avatar: "assets/images/Mensagem Mariana.png",
      friendshipDate: "Diga oi para seu novo amigo Synergy, Mariana Ferreira",
      messages: [
        {
          type: "received",
          text: "Oi amigo!",
          time: "23:46",
          avatar: "assets/images/Mensagem Mariana.png",
        },
        {
          type: "received",
          text: "Como você está?",
          time: "23:46",
          avatar: "assets/images/Mensagem Mariana.png",
        },
        { type: "sent", text: "Estou bem e você?", time: "23:46" },
        {
          type: "received",
          text: "Que bom!",
          time: "23:47",
          avatar: "assets/images/Mensagem Mariana.png",
        },
        {
          type: "received",
          text: "Também estou bem",
          time: "23:47",
          avatar: "assets/images/Mensagem Mariana.png",
        },
      ],
    },
    fernando: {
      name: "Fernando Costa",
      avatar: "assets/images/fernando costa.png",
      friendshipDate: "Diga oi para seu novo amigo Synergy, Fernando Costa",
      messages: [
        { type: "sent", text: "Vai pra aula hoje?", time: "23:46" },
        {
          type: "received",
          text: "Vou sim!",
          time: "23:46",
          avatar: "assets/images/fernando costa.png",
        },
        {
          type: "received",
          text: "Amanhã vai ter prova!",
          time: "23:47",
          avatar: "assets/images/fernando costa.png",
        },
      ],
    },
    joao: {
      name: "João Neves",
      avatar: "assets/images/joao.png",
      friendshipDate: "Diga oi para seu novo amigo Synergy, João Neves",
      messages: [
        {
          type: "received",
          text: "Boa noite!",
          time: "23:46",
          avatar: "assets/images/joao.png",
        },
        {
          type: "received",
          text: "Sua consulta foi agendada, para o dia 22/04",
          time: "23:46",
          avatar: "assets/images/joao.png",
        },
        { type: "sent", text: "Ok! Obrigado", time: "23:47" },
      ],
    },
    felipe: {
      name: "Felipe Voss",
      avatar: "assets/images/felipe.png",
      friendshipDate: "Diga oi para seu novo amigo Synergy, Felipe Voss",
      messages: [
        { type: "sent", text: "Oi Felipe!", time: "23:46" },
        {
          type: "received",
          text: "Eai, dani, o que foi?",
          time: "23:46",
          avatar: "assets/images/felipe.png",
        },
        { type: "sent", text: "Poderia me passar a matéria de ontem?", time: "23:47" },
        {
          type: "received",
          text: "Claro, agora estou ocupado, mas depois eu mando",
          time: "23:47",
          avatar: "assets/images/felipe.png",
        },
        { type: "sent", text: "Obrigado!", time: "23:47" },
      ],
    },
    murylo: {
      name: "Murylo Matos",
      avatar: "assets/images/murylo.png",
      friendshipDate: "Diga oi para seu novo amigo Synergy, Murylo Matos",
      messages: [
        { type: "sent", text: "👋", time: "21:32", isEmoji: true },
        {
          type: "received",
          text: "Olá, Daniel",
          time: "16:44",
          avatar: "assets/images/murylo.png",
        },
        {
          type: "received",
          text: "Como vai você?",
          time: "16:44",
          avatar: "assets/images/murylo.png",
        },
      ],
    },
    fernanda: {
      name: "Fernanda Bosco Maier",
      avatar: "assets/images/fernanda.png",
      friendshipDate: "Diga oi para seu novo amigo Synergy, Fernanda Bosco Maier",
      messages: [
        {
          type: "received",
          text: "Oi gatinho!",
          time: "23:46",
          avatar: "assets/images/fernanda.png",
        },
        {
          type: "received",
          text: "😍",
          time: "23:46",
          avatar: "assets/images/fernanda.png",
          isEmoji: true,
        },
      ],
    },
  };

  const conversationItems = document.querySelectorAll(".conversation-item");
  const friendItems = document.querySelectorAll(".friend-item");
  const contactAvatars = document.querySelectorAll(".contact-avatars img");
  const chatWindow = document.getElementById("chatWindow");
  const chatWelcome = document.getElementById("chatWelcome");
  const chatAvatar = document.getElementById("chatAvatar");
  const chatName = document.getElementById("chatName");
  const friendshipDate = document.getElementById("friendshipDate");
  const chatMessages = document.getElementById("chatMessages");
  const messageInput = document.getElementById("messageInput");
  const conversationsPanel = document.getElementById('conversationsPanel');
  const chatPanel = document.getElementById('chatPanel');
  const backToConversationsBtn = document.getElementById('backToConversations');
  
  const mobileMenuBtn = document.getElementById('mobileMenuBtn'); 
  const leftSidebar = document.getElementById('leftSidebar'); 
  const appContainer = document.querySelector('.app-container'); 
  const notificationIcon = document.getElementById('notificationIcon'); 
  const notificationPanel = document.getElementById('notificationPanel');
  const markAllReadBtn = document.querySelector(".mark-all-read"); 
  let mobileOverlay = document.getElementById('mobileOverlay');


  let currentUser = null; 

  function openChat(userId) {
    const userData = chatData[userId];
    if (!userData) return;

    currentUser = userId;

    if (chatWelcome) chatWelcome.style.display = "none";
    if (chatWindow) chatWindow.style.display = "flex";

    if (chatAvatar) chatAvatar.src = userData.avatar;
    if (chatName) chatName.textContent = userData.name;
    if (friendshipDate) friendshipDate.textContent = userData.friendshipDate;

    if (chatMessages) chatMessages.innerHTML = "";
    userData.messages.forEach((message) => {
      const messageDiv = document.createElement("div");
      messageDiv.className = `message ${message.type}`;

      let messageHTML = "";
      if (message.type === "received") {
        messageHTML += `<img src="${message.avatar}" alt="">`;
      }

      messageHTML += `
            <div class="message-content">
                <div class="message-bubble ${message.isEmoji ? "emoji-message" : ""}">${message.text}</div>
                <div class="message-time">${message.time}</div>
            </div>
        `;

      if (message.type === "sent") {
        messageHTML += `<img src="assets/images/gabriel.png" alt="Seu Avatar">`;
      }

      messageDiv.innerHTML = messageHTML;
      if (chatMessages) chatMessages.appendChild(messageDiv);
    });

    if (chatMessages) chatMessages.scrollTop = chatMessages.scrollHeight;

    document.querySelectorAll(".conversation-item").forEach((item) => {
      item.classList.remove("active");
    });
    const activeItem = document.querySelector(`[data-user="${userId}"]`);
    if (activeItem) {
        activeItem.classList.add("active");
    }

    if (window.innerWidth <= 1024 && conversationsPanel && chatPanel && backToConversationsBtn) {
        conversationsPanel.classList.add('hidden-on-mobile');
        chatPanel.classList.add('active-on-mobile');
        backToConversationsBtn.style.display = 'block'; 
    } else if (backToConversationsBtn) {
        backToConversationsBtn.style.display = 'none'; 
    }
  }

  conversationItems.forEach((item) => {
    item.addEventListener("click", () => {
      const userId = item.getAttribute("data-user");
      openChat(userId);
    });
  });

  if (friendItems) { 
    friendItems.forEach((item) => {
      item.addEventListener("click", () => {
        const userId = item.getAttribute("data-user");
        openChat(userId);
      });
    });
  }

  contactAvatars.forEach((avatar) => {
    avatar.addEventListener("click", () => {
      const userId = avatar.getAttribute("data-user");
      openChat(userId);
    });
  });

  if (messageInput && chatMessages) { 
    messageInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && messageInput.value.trim() && currentUser) {
        const messageText = messageInput.value.trim();
        const currentTime = new Date().toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        });

        chatData[currentUser].messages.push({
          type: "sent",
          text: messageText,
          time: currentTime,
        });

        const messageDiv = document.createElement("div");
        messageDiv.className = "message sent";
        messageDiv.innerHTML = `
              <div class="message-content">
                  <div class="message-bubble">${messageText}</div>
                  <div class="message-time">${currentTime}</div>
              </div>
              <img src="assets/images/gabriel.png" alt="Seu Avatar">
          `;

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        messageInput.value = "";

        const conversationItemPreview = document.querySelector(`[data-user="${currentUser}"] .last-message`);
        if (conversationItemPreview) {
          conversationItemPreview.textContent = `Você · ${messageText} · Agora`;
        }
      }
    });
  }

  const searchInput = document.querySelector(".search-bar input");
  if (searchInput) { // Verifica se searchInput existe
    searchInput.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase();
      const conversations = document.querySelectorAll(".conversation-item");

      conversations.forEach((conversation) => {
        const name = conversation.querySelector(".name").textContent.toLowerCase();
        if (name.includes(searchTerm)) {
          conversation.style.display = "flex";
        } else {
          conversation.style.display = "none";
        }
      });
    });
  }

  if (notificationIcon && notificationPanel) { 
    notificationIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      notificationPanel.classList.toggle('active');

      if (window.innerWidth <= 1024) {
          if (notificationPanel.classList.contains('active')) {
              if (conversationsPanel) conversationsPanel.classList.add('hidden-on-mobile');
              if (chatPanel) chatPanel.classList.add('hidden-on-mobile');
          } else {
              if (conversationsPanel) conversationsPanel.classList.remove('hidden-on-mobile');
              if (currentUser && chatPanel) {
                   if (conversationsPanel) conversationsPanel.classList.add('hidden-on-mobile');
                   chatPanel.classList.remove('hidden-on-mobile');
              } else {
                  if (chatPanel) chatPanel.classList.remove('active-on-mobile');
                  if (chatPanel) chatPanel.classList.add('hidden-on-mobile');
              }
          }
      }
    });

    document.addEventListener("click", (e) => {
      if (!notificationPanel.contains(e.target) && e.target !== notificationIcon) {
        notificationPanel.classList.remove('active');
        if (window.innerWidth <= 1024) {
            if (currentUser) {
                if (conversationsPanel) conversationsPanel.classList.add('hidden-on-mobile');
                if (chatPanel) chatPanel.classList.remove('hidden-on-mobile');
            } else {
                if (conversationsPanel) conversationsPanel.classList.remove('hidden-on-mobile');
                if (chatPanel) chatPanel.classList.remove('active-on-mobile');
            }
        }
      }
    });

    if (markAllReadBtn) { 
      markAllReadBtn.addEventListener("click", () => {
        const unreadNotifications = document.querySelectorAll(".notification-item.unread");
        unreadNotifications.forEach((notification) => {
          notification.classList.remove("unread");
        });

        const notificationDot = document.querySelector(".notification-badge");
        if (notificationDot) {
            notificationDot.style.display = "none";
        }
      });
    }

    const notificationItems = document.querySelectorAll(".notification-item");
    notificationItems.forEach((item) => {
      item.addEventListener("click", () => {
        const userKey = item.querySelector('.notification-text strong').textContent.split(' ')[0].toLowerCase();
        const userMap = {
            'andrew': 'andrew', 'bruna': 'bruna', 'fernanda': 'fernanda', 'fernando': 'fernando',
        };
        const userId = userMap[userKey];

        if (userId && chatData[userId]) {
          openChat(userId);
          notificationPanel.classList.remove('active');
          item.classList.remove("unread");
        }
      });
    });
  } 

  if (backToConversationsBtn && conversationsPanel && chatPanel && chatWelcome && chatWindow) { 
    backToConversationsBtn.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
          conversationsPanel.classList.remove('hidden-on-mobile');
          chatPanel.classList.remove('active-on-mobile');
          
          chatWindow.style.display = 'none';
          chatWelcome.style.display = 'flex';

          backToConversationsBtn.style.display = 'none'; 
      } else {
          chatWindow.style.display = 'none';
          chatWelcome.style.display = 'flex';
          backToConversationsBtn.style.display = 'none'; 
      }
      
      document.querySelectorAll(".conversation-item").forEach((conv) => {
          conv.classList.remove('active');
      });
      currentUser = null;
    });
  }

  if (mobileMenuBtn && appContainer && leftSidebar) { 
      mobileMenuBtn.addEventListener('click', () => {
          appContainer.classList.toggle('sidebar-active');
          if (notificationPanel) notificationPanel.classList.remove('active'); 
      });
  }

  if (appContainer) { 
      if (!mobileOverlay) { 
          mobileOverlay = document.createElement('div');
          mobileOverlay.classList.add('mobile-overlay');
          mobileOverlay.id = 'mobileOverlay';
          appContainer.appendChild(mobileOverlay);
      }
      
      mobileOverlay.addEventListener('click', () => {
          if (appContainer) appContainer.classList.remove('sidebar-active');
      });
  }

  function initializeLayout() {
      
      if (notificationPanel) {
          notificationPanel.classList.remove('active');
          notificationPanel.style.display = ''; 
      }

      if (window.innerWidth > 1024) { 
          if (leftSidebar) leftSidebar.style.display = 'flex';
          if (conversationsPanel) conversationsPanel.classList.remove('hidden-on-mobile');
          if (chatPanel) chatPanel.classList.remove('active-on-mobile');
          if (chatPanel) chatPanel.style.display = 'flex';
          if (backToConversationsBtn) backToConversationsBtn.style.display = 'none'; 
          
          if (currentUser) {
              if (chatWelcome) chatWelcome.style.display = 'none';
              if (chatWindow) chatWindow.style.display = 'flex';
          } else {
              if (chatWelcome) chatWelcome.style.display = 'flex';
              if (chatWindow) chatWindow.style.display = 'none';
          }
      } else { 
          if (leftSidebar) leftSidebar.style.display = 'none';
          
          if (currentUser) { 
              if (conversationsPanel) conversationsPanel.classList.add('hidden-on-mobile');
              if (chatPanel) chatPanel.classList.add('active-on-mobile');
              if (chatWelcome) chatWelcome.style.display = 'none';
              if (chatWindow) chatWindow.style.display = 'flex';
              if (backToConversationsBtn) backToConversationsBtn.style.display = 'block';
          } else { 
              if (conversationsPanel) conversationsPanel.classList.remove('hidden-on-mobile');
              if (chatPanel) chatPanel.classList.remove('active-on-mobile');
              if (chatWelcome) chatWelcome.style.display = 'flex';
              if (chatWindow) chatWindow.style.display = 'none';
              if (backToConversationsBtn) backToConversationsBtn.style.display = 'none';
          }
          if (chatPanel) chatPanel.style.display = 'flex'; 
      }
  }

  initializeLayout();
  window.addEventListener('resize', initializeLayout);
};

document.addEventListener('DOMContentLoaded', () => {
    window.initConversasPage();
});