
export async function adicionarAoCarrinho(produto) {
  try {

    const res = await fetch(`http://localhost:3000/carrinho?id=${produto.id}`);
    const dados = await res.json();

    if (dados.length > 0) {

      const itemExistente = dados[0];
      const resPatch = await fetch(`http://localhost:3000/carrinho/${itemExistente.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantidade: itemExistente.quantidade + 1 }),
      });
      const atualizado = await resPatch.json();
      console.log('Quantidade atualizada:', atualizado);
    } else {
      const resPost = await fetch('http://localhost:3000/carrinho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...produto, quantidade: 1 }),
      });
      const criado = await resPost.json();
      console.log('Produto adicionado:', criado);
    }
  
  } catch (error) {
    console.error('Erro ao adicionar no carrinho:', error);
  }
}