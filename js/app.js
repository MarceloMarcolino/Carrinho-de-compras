let totalGeral;
let carrinhoItens = []; // Array para armazenar os itens do carrinho
limpar();

function adicionar(){
    // recuperar valores nome do produto, quantidade e valor
    let produto = document.getElementById('produto').value;
    let quantidade = parseInt(document.getElementById('quantidade').value, 10);
    
    // Verificar se o produto selecionado é válido
    if (!produto || produto.trim() === "") {
        alert("Selecione um produto válido.");
        return;
    }

    // Verificar se a quantidade inserida é válida
    if (isNaN(quantidade) || quantidade <= 0) {
        alert("Insira uma quantidade válida.");
        return;
    }

    let nomeProduto = produto.split(' -')[0].trim();
    let valorUnitario = parseFloat(produto.split('R$')[1].replace(',', '.'));

    // Verifica se o produto já está no carrinho
    let itemExistente = carrinhoItens.find(item => item.nome === nomeProduto);

    if (itemExistente) {
        itemExistente.quantidade += quantidade;
        // calcular o preço, o nosso subtotal
        itemExistente.subtotal = itemExistente.quantidade * itemExistente.valor;
    } else {
        carrinhoItens.push({
            nome: nomeProduto,
            valor: valorUnitario,
            quantidade: quantidade,
            // calcular o preço, o nosso subtotal
            subtotal: quantidade * valorUnitario
        });
    }

    // Atualiza o carrinho na tela
    atualizarCarrinho();

    // Atualiza o valor total
    totalGeral = carrinhoItens.reduce((total, item) => total + item.subtotal, 0);
    let campoTotal = document.getElementById('valor-total');
    campoTotal.textContent = `R$ ${totalGeral},00`;
    document.getElementById('quantidade').value = 0;
}

function atualizarCarrinho(){    
    // adicionar no carrinho
    let carrinho = document.getElementById('lista-produtos');
    carrinho.innerHTML = '';
    carrinhoItens.forEach(item => {
        carrinho.innerHTML += `<section class="carrinho__produtos__produto">
              <span class="texto-azul">${item.quantidade}x</span> ${item.nome} <span class="texto-azul">R$ ${item.subtotal},00</span>
            </section>`;
    });
}

function limpar(){
    totalGeral = 0;
    carrinhoItens = [];
    document.getElementById('lista-produtos').innerHTML = '';
    document.getElementById('valor-total').textContent = 'R$ 0,00';
}