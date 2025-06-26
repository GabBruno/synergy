// ✅ Variáveis globais para gerenciar arquivos
let selectedFiles = []
let storyFiles = []

// ✅ Configurações de upload
const uploadConfig = {
  maxFileSize: 10 * 1024 * 1024, // 10MB
  maxFiles: 5,
  allowedTypes: {
    image: ["image/jpeg", "image/png", "image/gif", "image/webp"],
    video: ["video/mp4", "video/webm", "video/mov", "video/avi"],
  },
}

// ✅ Dados simulados para a galeria
const galleryImages = [
  "https://picsum.photos/200/300?random=1",
  "https://picsum.photos/200/300?random=2",
  "https://picsum.photos/200/300?random=3",
  "https://picsum.photos/200/300?random=4",
  "https://picsum.photos/200/300?random=5",
  "https://picsum.photos/200/300?random=6",
]

// ✅ Função para validar arquivo
function validateFile(file) {
  const errors = []

  if (file.size > uploadConfig.maxFileSize) {
    errors.push(`Arquivo muito grande. Máximo: ${formatFileSize(uploadConfig.maxFileSize)}`)
  }

  const isValidImage = uploadConfig.allowedTypes.image.includes(file.type)
  const isValidVideo = uploadConfig.allowedTypes.video.includes(file.type)

  if (!isValidImage && !isValidVideo) {
    errors.push("Tipo de arquivo não suportado")
  }

  return errors
}

// ✅ Função para formatar tamanho do arquivo
function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

// ✅ Função para obter ícone do tipo de arquivo
function getFileTypeIcon(file) {
  if (file.type.startsWith("image/")) return "🖼️"
  if (file.type.startsWith("video/")) return "🎥"
  return "📄"
}

// ✅ Função para criar preview do arquivo
function createFilePreview(file, index, isStory = false) {
  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const fileType = file.type.startsWith("image/") ? "image" : "video"
      const removeFunction = isStory ? "removeStoryFile" : "removeFile"

      const preview = `
        <div class="file-preview-item" data-index="${index}">
          <button class="file-preview-remove" onclick="${removeFunction}(${index})">×</button>
          ${
            fileType === "image"
              ? `<img src="${e.target.result}" alt="${file.name}" />`
              : `<video src="${e.target.result}" muted></video>`
          }
          <div class="file-info">
            <div class="file-type-icon">${getFileTypeIcon(file)}</div>
            <div>${file.name.length > 10 ? file.name.substring(0, 10) + "..." : file.name}</div>
            <div>${formatFileSize(file.size)}</div>
          </div>
        </div>
      `
      resolve(preview)
    }

    reader.readAsDataURL(file)
  })
}

// ✅ Função para processar arquivos selecionados
async function processFiles(files, isStory = false) {
  const fileArray = isStory ? storyFiles : selectedFiles
  const errors = []

  if (fileArray.length + files.length > uploadConfig.maxFiles) {
    errors.push(`Máximo de ${uploadConfig.maxFiles} arquivos permitidos`)
  }

  for (const file of files) {
    const fileErrors = validateFile(file)
    if (fileErrors.length > 0) {
      errors.push(`${file.name}: ${fileErrors.join(", ")}`)
    }
  }

  if (errors.length > 0) {
    window.Swal.fire({
      title: "Erro no Upload",
      html: errors.join("<br>"),
      icon: "error",
      confirmButtonText: "OK",
    })
    return
  }

  for (const file of files) {
    fileArray.push(file)
  }

  await updateFilePreview(isStory)
}

// ✅ Função para atualizar preview dos arquivos
async function updateFilePreview(isStory = false) {
  const fileArray = isStory ? storyFiles : selectedFiles
  const previewContainer = document.getElementById(isStory ? "storyFilePreview" : "filePreview")

  if (!previewContainer) return

  if (fileArray.length === 0) {
    previewContainer.innerHTML = ""
    return
  }

  previewContainer.innerHTML = `
    <div class="upload-progress">
      <div class="upload-progress-bar" style="width: 0%"></div>
    </div>
  `

  const progressBar = previewContainer.querySelector(".upload-progress-bar")
  let progress = 0
  const progressInterval = setInterval(() => {
    progress += 10
    progressBar.style.width = progress + "%"
    if (progress >= 100) {
      clearInterval(progressInterval)
      showFilePreviews()
    }
  }, 100)

  async function showFilePreviews() {
    const previews = await Promise.all(fileArray.map((file, index) => createFilePreview(file, index, isStory)))

    previewContainer.innerHTML = `
      <div class="file-preview">
        ${previews.join("")}
      </div>
    `

    const mediaUpload = document.querySelector(".media-upload")
    if (mediaUpload) {
      mediaUpload.classList.add("has-files")
    }
  }
}

// ✅ Função para remover arquivo
window.removeFile = (index) => {
  selectedFiles.splice(index, 1)
  updateFilePreview(false)

  if (selectedFiles.length === 0) {
    const mediaUpload = document.querySelector(".media-upload")
    if (mediaUpload) {
      mediaUpload.classList.remove("has-files")
    }
  }
}

// ✅ Função para remover arquivo do story
window.removeStoryFile = (index) => {
  storyFiles.splice(index, 1)
  updateFilePreview(true)
}

// ✅ FUNÇÃO PRINCIPAL - Modal de Story (GLOBAL)
window.openStoryCreationModal = () => {
  const galleryHtml = galleryImages
    .map(
      (img, index) =>
        `<div class="gallery-item" onclick="selectImage('${img}')">
            <img src="${img}" alt="Imagem ${index + 1}" />
        </div>`,
    )
    .join("")

  const storyContent = `
        <div class="story-modal-content">
            <div class="story-options">
                <div class="story-option" onclick="selectStoryType('text')">
                    <div class="story-option-icon">Aa</div>
                    <div class="story-option-text">Texto</div>
                </div>
                <div class="story-option" onclick="selectStoryType('music')">
                    <div class="story-option-icon">♪</div>
                    <div class="story-option-text">Música</div>
                </div>
                <div class="story-option" onclick="selectStoryType('upload')">
                    <div class="story-option-icon">📁</div>
                    <div class="story-option-text">Upload</div>
                </div>
            </div>
            
            <div id="storyFilePreview"></div>
            
            <div style="text-align: left; margin-top: 20px;">
                <h4 style="font-size: 14px; color: #666; margin-bottom: 10px;">Galeria</h4>
                <div class="gallery-grid">
                    ${galleryHtml}
                </div>
            </div>
        </div>
    `

  window.Swal.fire({
    title: "Criar Story",
    html: storyContent,
    width: "400px",
    showConfirmButton: false,
    showCloseButton: true,
    customClass: {
      popup: "story-modal",
    },
    didOpen: () => {
      storyFiles = []
      initializeFileInputs()
    },
  })
}

// ✅ FUNÇÃO PRINCIPAL - Modal de Publicação (GLOBAL)
window.openPostCreationModal = () => {
  const postContent = `
        <div class="post-modal-content">
            <div class="user-profile">
                <div class="user-avatar">DT</div>
                <div class="user-info">
                    <h4>Diogo Teixeira</h4>
                    <p>4 horas</p>
                </div>
            </div>
            
            <textarea 
                class="post-textarea" 
                placeholder="Descreva sua publicação aqui..."
                id="postText"
            ></textarea>
            
            <div class="media-upload" onclick="selectMedia()">
                <div class="media-upload-icon">🖼️</div>
                <div>Clique para adicionar mídia</div>
            </div>
            
            <div id="filePreview"></div>
            
            <div class="toolbar">
                <div class="toolbar-icons">
                    <button class="toolbar-icon" onclick="toolbarAction('image')" title="Imagem">🖼️</button>
                    <button class="toolbar-icon" onclick="toolbarAction('people')" title="Marcar pessoas">👥</button>
                    <button class="toolbar-icon" onclick="toolbarAction('location')" title="Localização">📍</button>
                    <button class="toolbar-icon" onclick="toolbarAction('emoji')" title="Emoji">😊</button>
                    <button class="toolbar-icon" onclick="toolbarAction('schedule')" title="Agendar">📅</button>
                    <button class="toolbar-icon" onclick="toolbarAction('video')" title="Vídeo">🎥</button>
                </div>
                <button class="publish-btn" onclick="publishPost()">Publicar</button>
            </div>
        </div>
    `

  window.Swal.fire({
    title: "Criar Publicação",
    html: postContent,
    width: "450px",
    showConfirmButton: false,
    showCloseButton: true,
    customClass: {
      popup: "post-modal",
    },
    didOpen: () => {
      selectedFiles = []
      initializeFileInputs()
    },
  })
}

// ✅ Função para inicializar inputs de arquivo (chamada quando modal abre)
function initializeFileInputs() {
  // Criar inputs se não existirem
  if (!document.getElementById("fileInput")) {
    const fileInput = document.createElement("input")
    fileInput.type = "file"
    fileInput.id = "fileInput"
    fileInput.multiple = true
    fileInput.accept = "image/*,video/*"
    fileInput.style.display = "none"
    document.body.appendChild(fileInput)

    fileInput.addEventListener("change", async (e) => {
      const files = Array.from(e.target.files)
      if (files.length > 0) {
        await processFiles(files, false)
      }
      e.target.value = ""
    })
  }

  if (!document.getElementById("storyFileInput")) {
    const storyFileInput = document.createElement("input")
    storyFileInput.type = "file"
    storyFileInput.id = "storyFileInput"
    storyFileInput.accept = "image/*,video/*"
    storyFileInput.style.display = "none"
    document.body.appendChild(storyFileInput)

    storyFileInput.addEventListener("change", async (e) => {
      const files = Array.from(e.target.files)
      if (files.length > 0) {
        await processFiles(files, true)

        if (storyFiles.length > 0) {
          window.Swal.fire({
            title: "Arquivo Carregado!",
            text: `${storyFiles.length} arquivo(s) adicionado(s) ao story.`,
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          })
        }
      }
      e.target.value = ""
    })
  }
}

// ✅ Funções de callback para Story (GLOBAIS)
window.selectStoryType = (type) => {
  if (type === "upload") {
    const input = document.getElementById("storyFileInput")
    if (input) input.click()
    return
  }

  let message = ""
  switch (type) {
    case "text":
      message = "Modo texto selecionado!"
      break
    case "music":
      message = "Modo música selecionado!"
      break
  }

  window.Swal.fire({
    title: "Story Criado!",
    text: message,
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
  })
}

window.selectImage = (imageUrl) => {
  window.Swal.fire({
    title: "Imagem Selecionada!",
    text: "Story criado com a imagem selecionada.",
    imageUrl: imageUrl,
    imageWidth: 200,
    imageHeight: 150,
    imageAlt: "Imagem selecionada",
    icon: "success",
    timer: 2000,
    showConfirmButton: false,
  })
}

// ✅ Funções de callback para Publicação (GLOBAIS)
window.selectMedia = () => {
  const input = document.getElementById("fileInput")
  if (input) input.click()
}

window.toolbarAction = (action) => {
  if (action === "image" || action === "video") {
    window.selectMedia()
    return
  }

  const actions = {
    people: "Marcar pessoas",
    location: "Adicionar localização",
    emoji: "Adicionar emoji",
    schedule: "Agendar publicação",
  }

  window.Swal.fire({
    title: actions[action],
    text: `Funcionalidade "${actions[action]}" seria implementada aqui.`,
    icon: "info",
    timer: 1500,
    showConfirmButton: false,
  })
}

window.publishPost = () => {
  const postText = document.getElementById("postText")?.value || ""

  if (postText.trim() === "" && selectedFiles.length === 0) {
    window.Swal.fire({
      title: "Atenção!",
      text: "Por favor, escreva algo ou adicione mídia para publicar.",
      icon: "warning",
      confirmButtonText: "OK",
    })
    return
  }

  const fileInfo = selectedFiles.length > 0 ? ` com ${selectedFiles.length} arquivo(s)` : ""

  window.Swal.fire({
    title: "Publicação Criada!",
    text: `Sua publicação "${postText.substring(0, 50)}${postText.length > 50 ? "..." : ""}"${fileInfo} foi publicada com sucesso!`,
    icon: "success",
    confirmButtonText: "Ótimo!",
  }).then(() => {
    selectedFiles = []
    const postTextElement = document.getElementById("postText")
    if (postTextElement) {
      postTextElement.value = ""
    }
  })
}

// ✅ Inicialização quando o script é carregado
document.addEventListener("DOMContentLoaded", () => {
  // Drag and drop global
  document.addEventListener("dragover", (e) => {
    e.preventDefault()
  })

  document.addEventListener("drop", async (e) => {
    e.preventDefault()

    const activeModal = document.querySelector(".swal2-container")
    if (!activeModal) return

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      const isStoryModal = activeModal.querySelector(".story-modal-content")
      await processFiles(files, !!isStoryModal)
    }
  })
})

// ✅ Log para debug
console.log("✅ SweetAlert Modal Script carregado com sucesso!")
console.log("✅ Funções disponíveis: openPostCreationModal(), openStoryCreationModal()")
