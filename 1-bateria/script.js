document.body.addEventListener('keyup', (event) => { // Faz um evento quando o usuário solta a tecla (keyup)
    playSound(event.code.toLowerCase()) // Pega as teclas e passa tudo para minúsculo, pois ela vem dessa maneira: KeyA, e utilizaremos em audioelement assim: keya
})

document.querySelector('.composer button').addEventListener('click', () => { // Seleciona o botão dentro da <div class="composer"> e adiciona um evento de clique.
    let songComposition = document.querySelector('#input').value;  //Pega o valor digitado no campo de texto, que será a sequência de teclas digitadas.

    if(songComposition !== '') {  // Verifica se o campo não está vazio
        let songArray = songComposition.split('');  // Transforma a string em um array
        playComposition(songArray) // Chama a função que tocará a composição na sequência
    }
})

function playSound(sound) { // Função para tocar o som
    let audioElement = document.querySelector(`#s_${sound}`) // Seleciona o áudio correspondente a tecla pressionada
    let keyElement = document.querySelector(`div[data-key="${sound}"]`) // "Caixa" dos audios, seleciona a tecla correspondente visualmente

    if(audioElement) {
        audioElement.currentTime = 0 // Reinicia o som se já estiver tocando, para tocar do começo toda vez
        audioElement.play() // Toca o som
        //  play() é um método do js e faz parte da API de mídia do HTML5
    }

    if(keyElement) {
        keyElement.classList.add('active'); // Adiciona a classe active

        setTimeout(() => {
            keyElement.classList.remove('active');
        }, 300); // Remove a classe active após 300ms
    }
}

function playComposition(songArray) { // Função para tocar a composição 
    let wait = 0 // Variável que controlará o tempo das notas
    
    for(let songItem of songArray){ // Percorre o array de notas digitadas
        setTimeout(() => {
            playSound(`key${songItem}`);
        }, wait) // Toca cada nota com um atraso

        wait += 250; // Antes de fechar cada iteração ele adiciona 250 no wait e vai para a próxima repetição
        // Sem isso, tocaria tudo de uma vez
    }
}