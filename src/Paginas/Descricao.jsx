
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './css/Descricao.module.css';
import { adicionarAoCarrinho } from '../utils/CarrinhoFunction';

const Descricao = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const produto = location.state?.itemProduto;


  const handleAdicionarAoCarrinho = () => {
    adicionarAoCarrinho(produto)
    navigate('/carrinho', { state: { noRefresh: true } });
  }

  return (
    <div className={styles.container}>
        <div className={styles.containerDesc}>
            <div className={styles.cardImg}>
                <img src={produto.imagem} className={styles.img}/>
            </div>
            <div className={styles.cardDesc}>
                <h2>{produto.nome}</h2>
                <p>{produto.descricao}</p>
                <div>
                    <div>
                        <h2>
                            Informações Adicionais
                        </h2>
                    </div>
                    <div className={styles.cardsAddInfos}>
                        <div  className={styles.cardAdd}>
                            <strong>Vinicola</strong>
                            <span>{produto.vinicola}</span>
                        </div>
                        <div className={styles.cardAdd}>
                            <strong>Variedade da Uva</strong>
                            <span>{produto.variedadeDaUva}</span>
                        </div>
                        <div className={styles.cardAdd}>
                            <strong>Safra</strong>
                            <span>{produto.safra}</span>
                        </div>
                        <div className={styles.cardAdd}>
                            <strong>Região</strong>
                            <span>{produto.regiao}</span>
                        </div>
                        <div className={styles.cardAdd}>
                            <strong>Teor Alcoólico</strong>
                            <span>{produto.teorAlcoolico}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <h2>R$ {produto.valor}</h2>
                    <button onClick={handleAdicionarAoCarrinho} className={styles.buttonBuy}>Adicionar ao Carrinho</button>
                </div>
            </div>
        </div>
    </div>
    );
  

}

export default Descricao;