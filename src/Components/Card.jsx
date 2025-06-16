import styles from './css/Card.module.css';
import { useNavigate } from 'react-router-dom';
import { adicionarAoCarrinho } from '../utils/CarrinhoFunction';

function Card({itemProduto}) {

  const navigate = useNavigate();

  const verDetalhes = () => {
        navigate('/descricao', { state: { itemProduto } });
  };

  const handleAdicionarAoCarrinho = (event) => {
        event.stopPropagation();
        adicionarAoCarrinho(itemProduto)
        navigate('/carrinho', { state: { noRefresh: true } });
  }

  return (
    <div className={styles.containerCard} onClick={verDetalhes}>
       <div className={styles.boxButton} onClick={handleAdicionarAoCarrinho}>
            <button className={styles.cardButton}>+</button>
       </div>
       <div className={styles.boxBody}>
            <div>
                <img src={itemProduto.imagem} alt={itemProduto.nome} className={styles.cardImg} />
            </div>
            <div className={styles.boxTitle}>
                <strong className={styles.cardTitle}>{itemProduto.nome}</strong>
                <span className={styles.cardValue}> R$ {itemProduto.valor}</span>
            </div>
       </div>
    </div>
    );
  
}

export default Card;