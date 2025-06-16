import logo from './logo.svg';
import Home from './Paginas/Home';
import Carrinho from './Paginas/Carrinho';
import { Routes, Route, Link } from 'react-router-dom';
import styles from './App.module.css';
import Descricao from './Paginas/Descricao';

function App() {
  return (
    <div>
      <nav className={styles.navBar}>
        <div className={styles.logoBox}>
          <h3 className={styles.navLink}>Loja de Vinhos</h3>
        </div>
        <div className={styles.linkBox}>
          <Link className={styles.navLink} to="/">Home</Link> 
          <Link className={styles.navLink} to="/carrinho">Carrinho</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/descricao" element={<Descricao />} />
      </Routes>
    </div>
  );
}

export default App;
