// import HeroesList from '../heroesList/HeroesList';
// import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
// import HeroesFilters from '../heroesFilters/HeroesFilters';
import ProductsPage from '../../pages/ProductsPage';

import './app.scss';

const App = () => {
    
    return (
        <main className="app">
            <ProductsPage/>
            {/* <div className="content">
                <HeroesList/>
                <div className="content__interactive">
                    <HeroesAddForm/>
                    <HeroesFilters/>
                </div>
            </div> */}
        </main>
    )
}

export default App;