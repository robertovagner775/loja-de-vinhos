import React, { useEffect, useState } from 'react';
import  Card  from './Card';

import styles from  './css/ListaProdutos.module.css';

function ListaProdutos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/produtos')
      .then(response => response.json())
      .then(data => setProdutos(data))
      .catch(error => console.error('Erro ao buscar produtos:', error));
  }, []);

  return (
    <div className={styles.container}>
      {produtos.map(produto => (
        <Card itemProduto={produto} />
      ))}
    </div>
  );
}

export default ListaProdutos;