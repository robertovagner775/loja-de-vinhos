import { Link } from 'react-router-dom';
import  ListaProdutos  from '../Components/ListaProdutos';
import styles from './css/Home.module.css';

function Home() {
  return (
    <div className={styles.container}>
        <div>
            <h1>Catálago de Vinhos</h1>
            <ListaProdutos />
        </div>
    </div>);
  
}

export default Home;