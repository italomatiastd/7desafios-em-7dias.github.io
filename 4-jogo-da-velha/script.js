// Dados iniciais
let square = { // Objeto do quadro
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
let player= ''; // Player -> 'x' ou 'o'
let warning = ''; // Mostra o vencedor ou se empatou
let playing = true; // Habilita o clique no jogo da velha...

// Eventos
document.querySelector('.reset').addEventListener('click', reset); // Botão de reset
document.querySelectorAll('.item').forEach(item => { // Click do jogo da velha
    item.addEventListener('click', itemClick);
})

//Funções
function itemClick(event) { // Função de click do jogo da velha
    let item = event.target.getAttribute('data-item') // Pega o quadro clicado

    if(playing && square[item] === ''){ // Se playing for true  e square tiver vazio ele faz a ação
        square[item] = player; // Ele pega o espaço vazio e coloca o player ('x' ou 'o')
        renderSquare(); // Renderiza a modificação do quadro
        togglePlayer(); // Passa a vez pro outro player
    }
    
}

function reset() { // Função de reset
    warning = ''; // Deixa o warning vazio novamente

    let random = Math.floor(Math.random() * 2); // Decide quem vai começar aleatoriamente
    player = (random === 0) ? 'x' : 'o' // Se for igual a 0 vai ser 'x', senão igual a 'o'
 
    for(let i in square) { // Loop para deixar tudo vazio novamente
        square[i] = '';
    }

    playing = true;  // Habilita o jogo

    renderSquare(); // Renderiza a modificação do quadro
    renderInfo(); // Renderiza a modificação nas informações abaixo do quadro
}

function renderSquare() { // Função que renderiza o quadro
    for(let i in square) { // Loop que pega cada item do objeto e vai colocando
        let item = document.querySelector(`div[data-item=${i}]`)
        item.innerHTML = square[i]; 
    }

    checkGame() // Checa o que deu no jogo e informa
}

function renderInfo() { // Renderiza as informações, vez da pessoa e quem ganhou ou se empatou
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer() { // Troca o player
    player = (player === 'x') ? 'o' : 'x' //  Se player for igual 'x' troca pra 'o' senão troca pra 'x'
    renderInfo(); 
}

function checkGame() { // Vai mandar a mensagem de quem ganhou e bloquear o jogo
    if(checkWinnerFor('x')) {
        warning = 'O "x" venceu';
        playing = false;
    } else if(checkWinnerFor('o')) {
        warning = 'O "o" venceu';
        playing = false;
    } else if(isFull()) {
        warning = 'Deu empate';
        playing = false;
    }
}

function checkWinnerFor(player) { // Checa o vencedor, e pra isso usamos um array com as possibilidades de vitória
    let poss = [  //Possibilidades de vitória
        // Na  horizontal
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',
        // Na vertical
        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',
        // Na diagonal
        'a1,b2,c3',
        'a3,b2,c1'
    ]

    for(let w in poss) {
        let pArray = poss[w].split(',') // poss[w] é uma string, com o split transformamos isso em uma array ['a1', 'a2', 'a3'] e verificamos: 
        let hasWon = pArray.every(option => square[option] === player); // Se todas as posições pertencem ao mesmo jogador retorna true:
        if(hasWon) { // Se hasWon retorna true
            return true;
        }
    }

    return false;
}

function isFull() { // Verifica se tá cheio, se tiver cheio e não foi pego pelo checkWinnerFor() empatou
    for(let i in square) {
        if(square[i] === ''){
            return false;
        }        
    }

    return true;
}