// Initial Data
let currentColor = 'black'; // Cor inicial para desenhar
let canDraw = false; // Controle para saber se o usuário está desenhando (pressionando o mouse)
let mouseX = 0; // Posição X atual do mouse
let mouseY = 0; // Posição Y atual do mouse

// Seleciona o canvas (área de desenho) e pega o contexto 2D para desenhar
let screen = document.querySelector('#tela'); 
let ctx = screen.getContext('2d'); // 'ctx' é o contexto de desenho 2D do canvas

// Events
// Eventos para seleção de cor
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent); // Quando clicar em uma cor, chama a função que troca a cor
})

// Evento para o botão de limpar a tela
document.querySelector('.clear').addEventListener('click', clearScreen);

/* 
Passo a passo para desenhar no Canvas:
- Quando o botão do mouse for pressionado (mousedown), ativa o modo de desenho.
- Quando o mouse se mover (mousemove), se o modo de desenho estiver ativo, desenha.
- Quando o botão do mouse for solto (mouseup), desativa o modo de desenho.
*/

// Eventos do mouse para desenhar no canvas
screen.addEventListener('mousedown', mouseDownEvent); // Pressionar o mouse inicia o desenho
screen.addEventListener('mousemove', mouseMoveEvent); // Movimentar o mouse desenha se o modo estiver ativo
screen.addEventListener('mouseup', mouseUpEvent); // Soltar o mouse para de desenhar

// Functions
// Função que troca a cor ao clicar em uma das opções de cor
function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color'); // Pega o valor da cor do atributo 'data-color'
    currentColor = color; // Define a cor atual para desenhar

    // Atualiza a interface para mostrar qual cor está selecionada
    document.querySelector('.color.active').classList.remove('active'); // Remove o destaque da cor anterior
    e.target.classList.add('active'); // Adiciona o destaque à nova cor selecionada
}

// Função chamada quando o mouse é pressionado no canvas
function mouseDownEvent(e) {
    canDraw = true; // Ativa o modo de desenho
    // Calcula a posição do mouse relativa ao canvas
    mouseX = e.pageX - screen.offsetLeft; 
    mouseY = e.pageY - screen.offsetTop;
}

// Função chamada quando o mouse se move no canvas
function mouseMoveEvent(e) {
    if (canDraw) { // Se o modo de desenho estiver ativo
        draw(e.pageX, e.pageY); // Chama a função de desenhar passando a posição atual do mouse
    }
}

// Função chamada quando o mouse é solto
function mouseUpEvent() {
    canDraw = false; // Desativa o modo de desenho
}

// Função que realiza o desenho no canvas
function draw(x, y) {
    // Calcula a posição atual do mouse em relação ao canvas
    let pointX = x - screen.offsetLeft; 
    let pointY = y - screen.offsetTop;

    // Inicia um novo caminho de desenho
    ctx.beginPath(); 
    ctx.lineWidth = 5; // Define a espessura da linha
    ctx.lineJoin = "round"; // Define que as junções das linhas serão arredondadas
    ctx.moveTo(mouseX, mouseY); // Move o cursor de desenho para a posição anterior do mouse
    ctx.lineTo(pointX, pointY); // Desenha uma linha até a nova posição do mouse
    ctx.closePath(); // Fecha o caminho de desenho
    ctx.strokeStyle = currentColor; // Define a cor da linha
    ctx.stroke(); // Desenha a linha no canvas

    // Atualiza as posições anteriores para continuar o desenho a partir daqui
    mouseX = pointX;
    mouseY = pointY;
}

// Função para limpar a tela do canvas
function clearScreen() {
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reseta qualquer transformação aplicada no canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Limpa toda a área do canvas
}
