import '../style/style_shop.css';
import hamburguesa from '../images/svg/Hamburguesa.svg';
import tools  from '../images/svg/Gasolina.svg';
import ShopBurgers from '../components/shop/ShopBurgers';
import { NavLink, Outlet } from 'react-router-dom';

export default function Shop() {
  return (
    <section className="content-side-inventory">
      <div className='shop'>
      <div className='shop-header'>
        <div className='shop-sections'>
          <NavLink to='/shop/shopburgers'>
          <div className='shop-link'>
            <img src={hamburguesa} alt="hamburguesa" />
            <p>Burgers</p>
          </div>
          </NavLink>
          <NavLink to='/shop/shoptools'>
          <div className='shop-link'>
            <img src={tools} alt="gasolina" />
            <p>Tools</p>
          </div>
          </NavLink>
        </div>
      </div>
      <div className='shop-body'>
        <Outlet/>
      </div>
      </div>
    </section>
  )
}
