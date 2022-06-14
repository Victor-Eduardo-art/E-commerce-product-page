function addProduto () {
    console.log('produto comprado ' + controleQtdProduto(false, false)) 

    if (controleQtdProduto(false, false) > 0) {
        ctlIconeListaProduto(controleQtdProduto(false, false))
    }
}

function controleQtdProduto (aumentar, diminuir) { // essa função vai mostrar, aumentar, diminuir a quantidade de produtos que o usuário vai comprar

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

    qtdProdutos.innerHTML = valorQtdProduto
    
    return valorQtdProduto
}

function controleListaProduto() {
    const verCompras = document.getElementsByClassName('ver-compras')[0]
    const produto = document.getElementsByClassName('produto')[0]
    const btmComprar = document.getElementById('btn-comprar')
    let valorQtdProduto = controleQtdProduto(false, false)

    if (valorQtdProduto == 0) {
        verCompras.classList.toggle('none')
        verCompras.classList.add('aviso-compras')
    } else {
        const p = document.querySelector('.ver-compras p')

        p.classList.add('none')
        btmComprar.classList.remove('none')
        verCompras.classList.toggle('none')
        produto.classList.remove('none')
        verCompras.classList.remove('aviso-compras')
    }
}

function ctlIconeListaProduto (qtdProduto) {
    const iconeQtdProduto = document.getElementById('qtd-produto')

    iconeQtdProduto.innerHTML = qtdProduto
    iconeQtdProduto.classList.remove('none')
}

window.addEventListener("load", () => {
    window.document.getElementById('comprar-produto').addEventListener('click', addProduto)

    window.document.getElementsByClassName('icone-historico')[0].addEventListener('click', controleListaProduto)

    window.document.getElementById('diminuir-unidades').addEventListener('click', () => {
        controleQtdProduto(false, true)
    })
    window.document.getElementById('aumentar-unidades').addEventListener('click', () => {
        controleQtdProduto(true, false)
    })
})