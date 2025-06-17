function acceptFriend(id, name) {
    // Animação visual de feedback
    card.style.transform = 'scale(1.1)';
    card.style.backgroundColor = '#e8f5e8';
    
    // Remove o card com animação
    setTimeout(() => {
        card.classList.add('removing');
        showNotification(Você aceitou a solicitação de ${name}!);
    }, 300);
}