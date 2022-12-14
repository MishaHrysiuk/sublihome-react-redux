import { useState } from 'react';
import { useSelector } from 'react-redux';

import { selectAll } from '../heroesFilters/filtersSlice';
import { useCreateHeroMutation } from '../../api/apiSlice';

const HeroesAddForm = () => {
    // Состояния для контроля формы
    const [productName, setProductName] = useState('');
    const [productType, setProductType] = useState('');
    const [productPrice, setProductPrice] = useState('');

    const [createProduct] = useCreateHeroMutation();

    const { filtersLoadingStatus } = useSelector(state => state.filters);
    const filters = useSelector(selectAll);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        
        const newProduct = {
            name: productName,
            productType: productType,
            price: productPrice
        }

        createProduct(newProduct).unwrap();

        setProductName('');
        setProductType('');
        setProductPrice('');
    }

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }
        
        if (filters && filters.length > 0 ) {
            return filters.map(({ name, id }) => {
                if (id === 4) return null;
                
                return <option key={id} value={name}>{name}</option>
            })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Назва нового продукту</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Назва?"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}/>
            </div>

             <div className="mb-3">
                <label htmlFor="price" className="form-label fs-4">Ціна нового продукту</label>
                <input 
                    required
                    type="number" 
                    name="price" 
                    className="form-control" 
                    id="price" 
                    placeholder="Ціна?"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="productType  " className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="productType  " 
                    name="productType  "
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}>
                    <option value="">Виберіть тип...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;