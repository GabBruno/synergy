
const stories = [
    {
      image: '../assets/images/woman.png',
      avatar: '../assets/images/perfil1.png',
      username: 'Vish_Patil'
    },
    {
      image: '../assets/images/camera2.png',
      avatar: '../assets/images/perfil2.png',
      username: 'Rakesh_Shetty'
    },
    {
      image: '../assets/images/yoda2.png',
      avatar: '../assets/images/perfil3.png',
      username: 'Master_Yoda'
    }
  ];
  
  let currentIndex = 0;
  
  function updateStory() {
    const story = stories[currentIndex];
    document.querySelector('.story-image').src = story.image;
    document.querySelector('.user-avatar').src = story.avatar;
    document.querySelector('.username').textContent = story.username;
    updateButtons();
  }
  
  function nextStory() {
    console.log('Próximo story...');
    if (currentIndex < stories.length - 1) {
      currentIndex++;
      updateStory();
    }
  }
  
  function prevStory() {
    console.log('Story anterior...');
    if (currentIndex > 0) {
      currentIndex--;
      updateStory();
    }
  }
  
  function closeStory() {
    console.log('Fechando story...');
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.close();
    }
  
}
function responder (){
    console.log(`Você respondeu o story de  ${stories[currentIndex].username}`);
}

  
  function curtir() {
    console.log(`Você curtiu o story de ${stories[currentIndex].username}`);
  }
  function updateButtons() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === stories.length - 1;
  }

  function configurarBotoesToggle() {
  const botoes = document.querySelectorAll('.action-button');
  botoes.forEach(botao => {
    botao.addEventListener('click', () => {
      botao.classList.toggle('ativo');
    });
  });
}