import Header from 'Components/Header';
import styles from './Cart.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import Item from 'Components/Item';
import { resetarCarrinho } from 'store/reducers/carrinho';

export default function Cart() {
  const dispatch = useDispatch();
  const {carrinho, total } = useSelector(state => {
    let total = 0;
    const regexp = new RegExp(state.busca, 'i')
    const carrinhoReduce = state.carrinho.reduce((itens, itemNoCarrinho) => {
      const item = state.itens.find(item => item.id === itemNoCarrinho.id)
      total +=(item.preco * itemNoCarrinho.quantidade)
      if(item.titulo.match(regexp)){
        itens.push({
          ...item,
          quantidade: itemNoCarrinho.quantidade,
        });
      }
      return itens;
    }, []);
    return { carrinho: carrinhoReduce, total};
  });

  return (
    <div>
      <Header titulo='Carrinho de compras'
        descricao='Confira produtos que você adicionou ao carrinho!' />
      <div className={styles.carrinho}>
        {
          carrinho.map(item => <Item carrinho key={item.id} {...item} />)
        }
        <div className={styles.total}>
          <strong>
            Resumo da compra
          </strong>
          <span>
            Subtotal: <strong>R$ {total.toFixed(2)}</strong>
          </span>
        </div>
        <button className={styles.finalizar} onClick={() => dispatch(resetarCarrinho())}>Finalizar Compra</button>
      </div>
    </div>
  )
}