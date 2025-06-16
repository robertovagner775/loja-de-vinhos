import styles from './css/CardCompra.module.css';
import { useNavigate } from 'react-router-dom';
import { adicionarAoCarrinho } from '../utils/CarrinhoFunction';

const CardCompra = ({itemCarrinho}) => {

  return (
    <div className={styles.container}>
        <div>
          <span> {itemCarrinho.nome} </span>
        </div>
          <div>
          <span> ( {itemCarrinho.quantidade} ) x R$ {itemCarrinho.valor} </span>
        </div>
    </div>
    );
  
}

export default CardCompra;