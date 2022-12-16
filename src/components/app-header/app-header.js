import { Link, NavLink } from "react-router-dom"
import { Stack } from "react-bootstrap"
import "./app-header.scss"

const AppHeader = () => {

    function doActive(isActive) {
        return "header__link" + ((isActive) ? ' activated' : '');
    }

    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header__row">
                        <Link to="/" className="header__logo">SUBLIhome</Link>
                        <nav>
                            <Stack direction="horizontal" gap={4}>
                                <NavLink end className = {({isActive}) => doActive(isActive)} to="/about_us">Про проект</NavLink>
                                <NavLink end className = {({isActive}) => doActive(isActive)} to="/products">Наші товари</NavLink>
                                <NavLink end className=  {({isActive}) => doActive(isActive)} to="/cart">Корзина</NavLink>
                                <NavLink end className = {({isActive}) => doActive(isActive)} to="/orders">Замовлення</NavLink>
                                <NavLink end className = {({isActive}) => doActive(isActive)} to="/profile">Профіль</NavLink>
                            </Stack>
                        </nav>
                        <ul className="header__list-social">
                            <li>
                                <a href="https://www.instagram.com/sybli_home/">
                                    <i className="fa-brands fa-instagram"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/sybli_home/">
                                    <i className="fa-brands fa-facebook"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/sybli_home/">
                                    <i className="fa-brands fa-telegram"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            
        </>
        
    )
}

export default AppHeader