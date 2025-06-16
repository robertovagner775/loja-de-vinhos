import styles from './css/CardCarrinho.module.css';
import { useNavigate } from 'react-router-dom';
import { adicionarAoCarrinho } from '../utils/CarrinhoFunction';

function CardCarrinho({itemProduto, onAumentar, onDiminuir, removerItemCarrinho}) {

  const navigate = useNavigate();

  return (
        <div className={styles.container}>
            <div className={styles.cardImg}>
                <img src={itemProduto.imagem} className={styles.img} />
            </div>
            <div className={styles.cardTitle}>
                <strong className={styles.title}>{itemProduto.nome}</strong>
                <span className={styles.value}>R$ {itemProduto.valor}</span>
            </div>
            <div className={styles.cardQtd}>
                <div className={styles.btnsQtd}>
                    <button onClick={onDiminuir} className={styles.btnMudaQtd}>-</button>
                    <span className={styles.quantidade}>{itemProduto.quantidade}</span>
                    <button onClick={onAumentar} className={styles.btnMudaQtd}>+</button>
                </div>
                <div className={styles.imgRemove}> 
                    <img onClick={removerItemCarrinho} className={styles.imgRemove} src={require(`../assets/remove.png`)}  />
                </div>
            </div>
        </div>
    );
}

export default CardCarrinho;