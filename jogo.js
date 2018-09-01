//variavel que armazena a chamada da função timeout
var timerId = null;

function iniciaJogo() {
    // irá recuperar a querie string (ex.: "?3" 3 no caso eh a dificuldade)
    var url = window.location.search;
    // para que possamos recuperar somente o nivel usando replace
    var nivel_jogo = url.replace("?", "");
    var tempo_segundos = 0;
    // 1 fácil -> 120segundos p/ estourar todos os baloes
    if (nivel_jogo == 1) {
        tempo_segundos = 120;
    }
    // 2 normal -> 60segundos
    if (nivel_jogo == 2) {
        tempo_segundos = 60;
    }
    // 3 dificil -> 30segundos
    if (nivel_jogo == 3) {
        tempo_segundos = 30;
    }
    // inserindo segundos no span
    // innerHTML irá inserir o conteudo de tempo_segundos dentro da tag
    document.getElementById('cronometro').innerHTML = tempo_segundos;
    // quantidade de balões
    var qtde_baloes = 50;
    cria_baloes(qtde_baloes);
    // imprimir qtde de balões que faltam estourar
    document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;
    // imprimir qtde de balões estourados   
    document.getElementById('baloes_estourados').innerHTML = 0;
    // faz a contagem do tempo
    contagem_tempo(tempo_segundos + 1);
}
// função que faz a contagem do tempo
function contagem_tempo(segundos) {
    // decrementa os segundos
    segundos = segundos - 1;
    // para que interrompa no 0
    if (segundos == -1) {
        clearTimeout(timerId); //para a execução da função do setTimeout
        game_over();
        return false;
    }
    // insere o elemento na div cronometro
    document.getElementById('cronometro').innerHTML = segundos;
    // setTimeout executa uma função em um determinado intervalo em milisegundos
    timerId = setTimeout("contagem_tempo(" + segundos + ")", 1000);
}
// função de fim de jogo
function game_over() {
    remove_eventos_baloes();
    alert('Fim de jogo, você não conseguiu estourar todos os balões a tempo !');
}
// cria os balões no cenário
function cria_baloes(qtde_baloes) {
    for (var i = 1; i <= qtde_baloes; i++) {
        // método DOM que cria uma tag no documento html
        var balao = document.createElement("img");
        balao.src = 'imagens/balao_azul_pequeno.png';
        // aplicando uma margem entre os baloes
        balao.style.margin = "10px";
        // atribui um id a cada balao (b + i = b1, b2, b3, ...)
        balao.id = 'b' + i;
        // chamando a função estourar ao clicar
        balao.onclick = function() {
            estourar(this);
        };
        // inserindo as tags img na div cenário como filhas através do appendChild
        document.getElementById('cenario').appendChild(balao);
    }
}
// função de estourar os baloes
function estourar(e) {
    var id_balao = e.id;
    // corrige o bug que permitia que um balão fosse estourado várias vezes, removendo seu evento onclick
    document.getElementById(id_balao).setAttribute("onclick", "");
    // alterar a img do balão para estourado quando clicado
    document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
    //
    pontuacao(-1);
}
// função que trabalha com a pontuação do jogo
function pontuacao(acao) {
    // recupera os valores atuais de baloes inteiros e estourados
    var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
    var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;
    // eh necessária a conversão para int
    baloes_inteiros = parseInt(baloes_inteiros);
    baloes_estourados = parseInt(baloes_estourados);
    //
    // o valor de baloes inteiros precisa diminuir a cada ação e o de estourados precisa aumentar
    // para entender ex.: baloes inteiros(50) + ação de estourar(-1) = 50 - 1 = 49
    baloes_inteiros = baloes_inteiros + acao;
    // ex.: baloes estourados (0) - ação(-1) (--=+) = 1
    baloes_estourados = baloes_estourados - acao;
    // faz a atualização dos valores
    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados;
    situacao_jogo(baloes_inteiros);
}
// condição de parada de jogo em caso de vitória
function situacao_jogo(baloes_inteiros) {
    if (baloes_inteiros == 0) {
        alert('Parabéns, você conseguiu estourar todos os balões a tempo ! :)');
        parar_jogo();
        // reinicia o jogo voltando a index.html
        window.location.href = 'index.html';
    }
}
// para a contagem ao vencer o jogo
function parar_jogo() {
    clearTimeout(timerId);
}
// função que impede que os baloes sejam estourados após o fim de jogo
function remove_eventos_baloes() {
    var i = 1; //contado para recuperar balões por id
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while (document.getElementById('b' + i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b' + i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}