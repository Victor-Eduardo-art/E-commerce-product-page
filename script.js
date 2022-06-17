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

window.addEventListener("load", () => {
    window.document.getElementById('comprar-produto').addEventListener('click', addProduto)

    window.document.getElementsByClassName('icone-historico')[0].addEventListener('click', controleListaProduto)

    window.document.getElementById('diminuir-unidades').addEventListener('click', () => {
        controleQtdProduto(false, true, false)
    })
    window.document.getElementById('aumentar-unidades').addEventListener('click', () => {
        controleQtdProduto(true, false, false)
    })
})