
import styles from './css/Carrinho.module.css';
import React, { useEffect, useState } from 'react';
import CardCarrinho  from '../Components/CardCarrinho';
import CardCompra  from '../Components/CardCompra';
import Modal from 'react-modal';
import { useLocation, useNavigate } from 'react-router-dom';


const Carrinho = () => {

const [carrinho, setCarrinho] = useState([]);
const [modalAberto, setModalAberto] = useState(false);


 const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    if (!location.state?.refreshed) {
      navigate('/carrinho', { replace: true, state: { refreshed: true } });
      window.location.reload();
    }
  }, [location, navigate]);


async function atualizarQuantidade(id, operacao, setCarrinho) {
  try {
    console.log(id)
    const res = await fetch(`http://localhost:3000/carrinho/${id}`);
    if (!res.ok) throw new Error('Item não encontrado');

    const item = await res.json();

    let novaQuantidade = operacao === 'aumentar'
      ? item.quantidade + 1
      : item.quantidade - 1;

    if (novaQuantidade < 1) {
      await fetch(`http://localhost:3000/carrinho/${id}`, {
        method: 'DELETE',
      });

       const response = await fetch('http://localhost:3000/carrinho');
       const dadosAtualizados = await response.json();
        setCarrinho(dadosAtualizados);
      return;
    }
    await fetch(`http://localhost:3000/carrinho/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantidade: novaQuantidade }),
    });

    const response = await fetch('http://localhost:3000/carrinho');
    const dadosAtualizados = await response.json();
    setCarrinho(dadosAtualizados);

  } catch (error) {
    console.error('Erro ao atualizar quantidade:', error);
  }
}

async function removerDoCarrinho(id, setCarrinho) {
  try {
    const res = await fetch(`http://localhost:3000/carrinho/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) throw new Error('Erro ao remover item');

    const atualizado = carrinho.filter(item => item.id !== id);
    setCarrinho(atualizado);
  } catch (error) {
    console.error('Erro ao remover item do carrinho:', error);
  }
}

useEffect(() => {
  async function carregarCarrinho() {
    try {
      const response = await fetch('http://localhost:3000/carrinho');
      if (!response.ok) throw new Error('Erro ao buscar carrinho');
      const dados = await response.json();
      setCarrinho(dados);
    } catch (error) {
      console.error(error);
    }
  }

  carregarCarrinho();
}, []);

  const total = carrinho.reduce((soma, item) => soma + item.valor * item.quantidade,0);
  const totalQtd = carrinho.reduce((soma, item) => soma + item.quantidade, 0);

  return (
    <div className={styles.container}>
      <div className={styles.containerCarrinho}>
        <h2>Meu Carrinho</h2>
        {carrinho.length === 0 ? (
          <p>Carrinho vazio.</p>
        ) : (
          <ul>
            {carrinho.map(item => (
              <CardCarrinho 
                key={item.id} 
                itemProduto={item}
                 onAumentar={() => atualizarQuantidade(item.id, 'aumentar', setCarrinho)}
                 onDiminuir={() => atualizarQuantidade(item.id, 'diminuir', setCarrinho)} 
                 removerItemCarrinho={() => removerDoCarrinho(item.id, setCarrinho)}
              />
            ))}
          </ul>
        )}
      </div>
        <div  className={styles.containerTotal}>
          <h3>Valor Total R$ {total.toFixed(2)}</h3>
          <button onClick={() => setModalAberto(true)}>Finalizar Pedido</button>
        </div>

        <Modal
        isOpen={modalAberto}
        onRequestClose={() => setModalAberto(false)}
        contentLabel="Exemplo Modal"
        style={{
          content: {
            width: '500px',
            margin: 'auto',
            padding: '20px',
            borderRadius: '10px'
          },
          overlay: {
            backgroundColor: 'rgba(0,0,0,0.6)'
          }
        }}
      >

        <div>
            <h2 style={{textAlign: 'center'}}>Resumo do Pedido</h2>
            <div>
                <h3>
                    Endereço
                </h3>
                  <hr />
                  <div className={styles.containerEndereco}>
                    <span>01001-011</span>
                    <span>Avenida Paulista</span>
                    <span>São Paulo - SP</span>
                  </div>
            </div>
            <div>
                <h3>
                    Forma de Pagamento
                </h3>
                <hr />
                <div className={styles.containerFormaPagto}>
                  <span>Cartão de Crédito</span>
                </div>
          </div>
          <div>
            <h3>Itens do Pédido</h3>
            <hr/>
            <div className={styles.itensPedido}>
            {carrinho.map(item => (
                <CardCompra itemCarrinho={item} />
                ))}
              </div>
              <hr />
              <div className={styles.cardTotalModal}>
                  <h4>Total Itens: {totalQtd} </h4>
                  <h4>Total Valor: {total} </h4>
              </div>
            </div>

        </div>
      </Modal>
    </div>


    
  );
}

export default Carrinho;