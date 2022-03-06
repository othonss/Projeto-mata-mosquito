//Variáveis em escopo global
var altura = 0
var largura = 0
var vidas = 1
var tempo = 10

var criaMosquitoTempo = 1500

//search é utilizando para pegar apenas os parametros que vieram junto com a URL
var nivel = window.location.search
//replace é utilizado para substituir os caracteres escolhido por algum outro.
nivel = nivel.replace('?', '')

if(nivel === 'normal'){
    criaMosquitoTempo = 1500
} else if (nivel === 'dificil'){
    criaMosquitoTempo = 1000
}else if (nivel === 'chuckNorris'){
    criaMosquitoTempo = 750
}
/*
    Função responsável para captar a altura e largura do navegador, para impedir que sejam exibidas barras 
    de rolagem na página.
*/
function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight
    largura = window.innerWidth

    console.log(altura, largura)
}

ajustaTamanhoPalcoJogo()

/*
    Implementação da lógica para colocar um cronometro no jogo, trata-se de uma variaveis que iniciará com um tempo estático
    e utilizando propriedades do BOM, será realizado um controle tanto na criação de novos mosquitos como de decrementação do
    tempo.
*/
var cronometro = setInterval(function (){
    tempo--
    if(tempo < 0){
        clearInterval(cronometro)
        clearInterval(criarMosquito)
        window.location.href = 'vitoria.html'
    }else {
        document.getElementById('cronometro').innerHTML = tempo
    }
}, 1000)

//Implementação da lógica que gerará a posição aleatória dos mosquitos
function randomizarMosquitos() {
    //Implementação da lógica para antes de criar um novo mosquisto, remover o anterior caso ele exista.
    if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove()

        //Implementação da lógica para trocar os corações de cheio para vazio
        if(vidas > 3 ){
            window.location.href = 'fim_de_jogo.html'
        }else{
            document.getElementById('vida' + vidas).src="imagens/coracao_vazio.png"
            vidas++
        }
    }

    /*
        Foi necessário colocar -90 porque as vezes a imagem ultrapassar o limente da tela e gerava a 
        criação da barra de rolagem.
    */
    var posicaoX = Math.floor(Math.random() * largura) - 90 
    var posicaoY = Math.floor(Math.random() * altura) - 90

    //Foi necessário fazer a verificação porque se a posição for igual a 0 o mosquito pode ficar oculto da tela
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    console.log(posicaoX, posicaoY)

    //Criação de elementos HTML
    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosca.png'

    //Chamadas das funções que, através do css, aplicará os estilos para o mosquito
    mosquito.className = randomizarTamanhoMosquito() + ' ' + randomizarOlharMosquito()
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'

    //Função onclick/clicavel para remover/eliminar o mosquito antes que ele suma sozinho
    mosquito.onclick = function() {
        this.remove()
    }

    document.body.appendChild(mosquito)
}

/*
    Implementação da lógica para gerar tamanhos aleatórios para os mosquitos.
    Basicamente, será gerado três valores aleatórios que servirá para escolher a condição que acessará 
    o switch e determinar o tamanho do mosquito.
*/
function randomizarTamanhoMosquito() {
    var classe = Math.floor(Math.random() * 3)

    switch(classe){
        case 0:
            return 'mosquito1'
        case 1:
            return 'mosquito2'
        case 2:
            return 'mosquito3'
    }
}

/* 
    Implementação da lógica para fazer o mosquito olhar as vezes para esquerda e as vezes para direita.
    Basicamente, a mesma lógica para randomizar o tamanho do mosquito.
*/
function randomizarOlharMosquito(){
    var classe = Math.floor(Math.random() * 2)

    switch(classe){
        case 0:
            return 'olharDireita'
        case 1:
            return 'olharEsquerda'
    }
}