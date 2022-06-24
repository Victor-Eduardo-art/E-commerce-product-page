let imgFocadaAtual = 1 // variável com a imagem atual focada no slider 


function addProduto () {
    if (controleQtdProduto(false, false, false) > 0) {
        ctlIconeListaProduto(controleQtdProduto(false, false, false))
    }
}

function controleQtdProduto (aumentar, diminuir, resetar) { // essa função vai mostrar, aumentar, diminuir a quantidade de produtos que o usuário vai comprar

    const qtdProdutos = window.document.getElementById('quantidade-produtos')

    let valorQtdProduto = parseInt(qtdProdutos.innerHTML)

    if (aumentar === true) {
        valorQtdProduto = valorQtdProduto + 1
    } else if (diminuir === true) {
        valorQtdProduto = valorQtdProduto - 1
    }
    
    if (valorQtdProduto < 0) {
        valorQtdProduto = 0
    }

    if (resetar === true) {
        valorQtdProduto = 0
        resetar = false
    }

    qtdProdutos.innerHTML = valorQtdProduto
    
    return valorQtdProduto
}

function controleListaProduto() {
    const verCompras = document.getElementsByClassName('ver-compras')[0]
    const produto = document.getElementsByClassName('produto')[0]
    const btmComprar = document.getElementById('btn-comprar')
    let valorQtdProduto = controleQtdProduto(false, false, false)

    verCompras.classList.toggle('none')

    if (valorQtdProduto == 0) {
        excluirProdutos()
    } else {
        const p = document.querySelector('.ver-compras p')
        const precoProduto = window.document.querySelector('.ctr-preco-atual h2').innerHTML
        const infoProduto = window.document.querySelector('.ctr-info-produto span')
        const qtdProdutos = controleQtdProduto(false, false, false)
        const botaoDelete = window.document.getElementById('icone-delete')

        p.classList.add('none')
        btmComprar.classList.remove('none')
        produto.classList.remove('none')
        verCompras.classList.remove('aviso-compras')

        infoProduto.innerHTML = `$${precoProduto} x ${qtdProdutos} <em>$${precoProduto * qtdProdutos}.00</em>`

        botaoDelete.addEventListener('click', excluirProdutos)
    }
}

function excluirProdutos () {
    const verCompras = document.getElementsByClassName('ver-compras')[0]
    const produto = document.getElementsByClassName('produto')[0]
    const btmComprar = document.getElementById('btn-comprar')

    const p = document.querySelector('.ver-compras p')
    const qtdProdutos = controleQtdProduto(false, false, true)

    p.classList.remove('none')
    verCompras.classList.add('aviso-compras')
    btmComprar.classList.add('none')
    produto.classList.add('none')
    
    ctlIconeListaProduto(qtdProdutos)

}

function ctlIconeListaProduto (qtdProduto) {
    const iconeQtdProduto = document.getElementById('qtd-produto')

    if (qtdProduto > 0) {
        iconeQtdProduto.innerHTML = qtdProduto
        iconeQtdProduto.classList.remove('none')
    } else {
        iconeQtdProduto.innerHTML = qtdProduto
        iconeQtdProduto.classList.add('none')
    }
}

function configBotoesProximaAnteriorSlider (botaoProxima) {
    const imgFocada = document.getElementsByClassName('imagem-focada')[0]
    const imgFocadaMoblie = document.getElementsByClassName('imagem-focada')[1]
    const opcoesImg = document.getElementsByClassName('selec-img-produto')

    for (let i = 0; i < opcoesImg.length; i++) {
        opcoesImg[i].classList.remove("img-focada")
    }

    if (botaoProxima === true) {
        if (imgFocadaAtual < 4) {
            imgFocada.src = `images/image-product-${imgFocadaAtual + 1}-thumbnail.jpg`
            imgFocadaMoblie.src = `images/image-product-${imgFocadaAtual + 1}-thumbnail.jpg`
            imgFocadaAtual++
        }
    } else {
        if (imgFocadaAtual > 1) {
            imgFocada.src = `images/image-product-${imgFocadaAtual - 1}-thumbnail.jpg`
            imgFocadaMoblie.src = `images/image-product-${imgFocadaAtual - 1}-thumbnail.jpg`
            imgFocadaAtual--
        }
    }

    opcoesImg[imgFocadaAtual - 1].classList.add("img-focada")

    if (imgFocadaAtual > 3) {
        opcoesImg[3].classList.add("img-focada")
    } else if (imgFocadaAtual < 0) {
        opcoesImg[0].classList.add("img-focada")    
    }
}

function configImgOpcoesSlider (elemento, elementos) {
    const imgFocada = document.querySelector('.slider .imagem-focada')

    for (let i = 0; i < elementos.length; i++) {
        elementos[i].classList.remove("img-focada")
    }

    elemento.classList.add("img-focada")

    imgFocadaAtual = elemento.classList.item(1).split('-')[1]

    imgFocada.src = elemento.dataset.src

    console.log(`img focada atual: ${imgFocadaAtual}`)
}

function ativarDesativarSlider (ativar, posicao) {
    const slider = document.getElementsByClassName('container-slider')[0]
    const imgFocada = document.querySelector('.slider .imagem-focada')

    if (ativar === true) {
        slider.classList.remove('none')

        imgFocada.src = `images/image-product-${posicao + 1}-thumbnail.jpg`
        
        console.log(`Img focada: : ${imgFocada.src}`)
        configImgOpcoesSlider(document.querySelectorAll('.ctr-lista-imagens .selec-img-produto')[posicao], document.querySelectorAll('.ctr-lista-imagens .selec-img-produto'))
        imgFocadaAtual = posicao + 1
    } else {
        slider.classList.add('none')
    }
    
}

function abrirFecharMenu (abrir) {
    const menu = document.querySelector('header nav')
    const body = document.getElementsByTagName('body')[0]
    const fundoEscuro = document.getElementsByClassName('fundo-escuro')[0]

    if (abrir === true) {
        menu.classList.add('menu-ativo')
        body.classList.add('fixar')
        fundoEscuro.classList.remove('none')
    } else if (abrir === false) {
        menu.classList.remove('menu-ativo')
        body.classList.remove('fixar')
        fundoEscuro.classList.add('none')
    }
}

window.addEventListener("load", () => {
    if (innerWidth <= 820) {
        document.getElementsByClassName('botao-menu')[0].addEventListener('click', () => {
            abrirFecharMenu(true)
        })
    
        document.getElementsByClassName('botao-fechar')[0].addEventListener('click', () => {
            abrirFecharMenu(false)
        })
    } else {
        document.getElementsByClassName('botao-menu')[0].classList.add("none")
    }

    for (let i = 0; i < document.querySelectorAll('.container-selec-img-produtos .selec-img-produto').length; i++) {
        document.querySelectorAll('.container-selec-img-produtos .selec-img-produto')[i].addEventListener('click', () => {
            ativarDesativarSlider(true, i)
        })
    }

    document.getElementById('botao-voltar').addEventListener('click', () => {
        ativarDesativarSlider(false, null)
    })

    document.getElementsByClassName('botao-proxima')[0].addEventListener('mouseenter', () => {
        document.querySelector('.botao-proxima img').src = 'images/icon-next-orange.svg'
    })

    document.getElementsByClassName('botao-anterior')[0].addEventListener('mouseleave', () => {
        document.querySelector('.botao-anterior img').src = 'images/icon-previous.svg'
    })

    for (let i = 0; i < document.querySelectorAll('.ctr-lista-imagens .selec-img-produto').length; i++) {
        document.querySelectorAll('.ctr-lista-imagens .selec-img-produto')[i].addEventListener("click", () => {
            configImgOpcoesSlider(document.querySelectorAll('.ctr-lista-imagens .selec-img-produto')[i], document.querySelectorAll('.ctr-lista-imagens .selec-img-produto'))
        })
    }

    document.getElementsByClassName('botao-anterior')[0].addEventListener("click", () => {
        configBotoesProximaAnteriorSlider(false)
    })

    document.getElementsByClassName('botao-anterior')[1].addEventListener("click", () => {
        configBotoesProximaAnteriorSlider(false)
    })

    document.getElementsByClassName('botao-proxima')[0].addEventListener("click", () => {
        configBotoesProximaAnteriorSlider(true)
    })

    document.getElementsByClassName('botao-proxima')[1].addEventListener("click", () => {
        configBotoesProximaAnteriorSlider(true)
    })

    window.document.getElementById('comprar-produto').addEventListener('click', addProduto)

    window.document.getElementsByClassName('icone-historico')[0].addEventListener('click', controleListaProduto)

    window.document.getElementById('diminuir-unidades').addEventListener('click', () => {
        controleQtdProduto(false, true, false)
    })
    window.document.getElementById('aumentar-unidades').addEventListener('click', () => {
        controleQtdProduto(true, false, false)
    })
})