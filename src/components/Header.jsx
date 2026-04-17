import { Link } from 'react-router-dom';
import '../assets/style/style.css';

function Header({ cartCount }) {
    return (
        <header>
            <div className="logo">
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>BAHANDI</Link>
            </div>
            <nav>
                {/* Ссылки на категории. Убедитесь, что в API в поле category такие же названия */}
                <Link to="/category/burgers" className="nav-link">Бургеры</Link>
                <Link to="/category/drinks" className="nav-link">Напитки</Link>
                <Link to="/category/combo" className="nav-link">Комбо</Link>
                
                <Link to="/cart" className="cart" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Корзина {cartCount > 0 && <span className="cart-badge">({cartCount})</span>}
                </Link>
            </nav>
        </header>
    );
}

export default Header;