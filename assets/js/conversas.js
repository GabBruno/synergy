window.initConversasPage = function () {
  // Chat data completo - todas as conversas
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
        { type: "sent", text: "Vamo ver o jogo juntos?", time: "23:46", },

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
        { type: "sent", text: "Estou bem e você?", time: "23:46", },
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
  }

  // DOM elements
  const conversationItems = document.querySelectorAll(".conversation-item")
  const friendItems = document.querySelectorAll(".friend-item")
  const contactAvatars = document.querySelectorAll(".contact-avatars img")
  const chatWindow = document.getElementById("chatWindow")
  const chatWelcome = document.querySelector(".chat-welcome")
  const chatAvatar = document.getElementById("chatAvatar")
  const chatName = document.getElementById("chatName")
  const friendshipDate = document.getElementById("friendshipDate")
  const chatMessages = document.getElementById("chatMessages")
  const messageInput = document.getElementById("messageInput")

  let currentUser = null // Inicia sem conversa ativa

  // Function to open chat
  function openChat(userId) {
    const userData = chatData[userId]
    if (!userData) return

    currentUser = userId

    // Esconder tela de boas-vindas e mostrar chat
    document.getElementById("chatWelcome").style.display = "none"
    document.getElementById("chatWindow").style.display = "flex"

    // Update chat header
    chatAvatar.src = userData.avatar
    chatName.textContent = userData.name
    friendshipDate.textContent = userData.friendshipDate

    // Clear and populate messages
    chatMessages.innerHTML = ""
    userData.messages.forEach((message) => {
      const messageDiv = document.createElement("div")
      messageDiv.className = `message ${message.type}`

      let messageHTML = ""
      if (message.type === "received") {
        messageHTML += `<img src="${message.avatar}" alt="">`
      }

      messageHTML += `
            <div class="message-content">
                <div class="message-bubble ${message.isEmoji ? "emoji-message" : ""}">${message.text}</div>
                <div class="message-time">${message.time}</div>
            </div>
        `

      if (message.type === "sent") {
        messageHTML += `<img src="assets/images/daniel.png" alt="">`
      }

      messageDiv.innerHTML = messageHTML
      chatMessages.appendChild(messageDiv)
    })

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight

    // Update active states
    document.querySelectorAll(".conversation-item").forEach((item) => {
      item.classList.remove("active")
    })
    document.querySelector(`[data-user="${userId}"]`).classList.add("active")
  }

  // Add event listeners
  conversationItems.forEach((item) => {
    item.addEventListener("click", () => {
      const userId = item.getAttribute("data-user")
      openChat(userId)
    })
  })

  friendItems.forEach((item) => {
    item.addEventListener("click", () => {
      const userId = item.getAttribute("data-user")
      openChat(userId)
    })
  })

  contactAvatars.forEach((avatar, index) => {
    const userIds = ["andrew", "bruna", "mariana", "fernando", "joao"]
    avatar.addEventListener("click", () => {
      openChat(userIds[index])
    })
  })

  // Send message functionality
  messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && messageInput.value.trim() && currentUser) {
      const messageText = messageInput.value.trim()
      const currentTime = new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })

      // Add message to chat data
      chatData[currentUser].messages.push({
        type: "sent",
        text: messageText,
        time: currentTime,
      })

      // Create message element
      const messageDiv = document.createElement("div")
      messageDiv.className = "message sent"
      messageDiv.innerHTML = `
            <div class="message-content">
                <div class="message-bubble">${messageText}</div>
                <div class="message-time">${currentTime}</div>
            </div>
            <img src="/images/person1.png" alt="">
        `

      chatMessages.appendChild(messageDiv)
      chatMessages.scrollTop = chatMessages.scrollHeight

      // Clear input
      messageInput.value = ""

      // Update conversation preview
      const conversationItem = document.querySelector(`[data-user="${currentUser}"] .last-message`)
      if (conversationItem) {
        conversationItem.textContent = `Você · ${messageText} · Agora`
      }
    }
  })

  // Search functionality
  const searchInput = document.querySelector(".search-bar input")
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase()
    const conversations = document.querySelectorAll(".conversation-item")

    conversations.forEach((conversation) => {
      const name = conversation.querySelector(".name").textContent.toLowerCase()
      if (name.includes(searchTerm)) {
        conversation.style.display = "flex"
      } else {
        conversation.style.display = "none"
      }
    })
  })

  // Notification functionality
  const notificationBtn = document.querySelector(".notification-btn")
  const notificationPanel = document.getElementById("notificationPanel")
  const markAllReadBtn = document.querySelector(".mark-all-read")

  // Toggle notification panel
  notificationBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    const isVisible = notificationPanel.style.display === "block"
    notificationPanel.style.display = isVisible ? "none" : "block"
  })

  // Close notification panel when clicking outside
  document.addEventListener("click", (e) => {
    if (!notificationPanel.contains(e.target) && e.target !== notificationBtn) {
      notificationPanel.style.display = "none"
    }
  })

  // Mark all notifications as read
  markAllReadBtn.addEventListener("click", () => {
    const unreadNotifications = document.querySelectorAll(".notification-item.unread")
    unreadNotifications.forEach((notification) => {
      notification.classList.remove("unread")
    })

    // Hide notification dot
    const notificationDot = document.querySelector(".notification-dot")
    notificationDot.style.display = "none"
  })

  // Click on notification to open chat
  const notificationItems = document.querySelectorAll(".notification-item")
  notificationItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      const userIds = ["andrew", "bruna", "fernanda", "fernando"]
      if (userIds[index]) {
        openChat(userIds[index])
        notificationPanel.style.display = "none"
        item.classList.remove("unread")
      }
    })
  })

};
