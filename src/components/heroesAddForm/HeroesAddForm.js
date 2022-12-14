import { useState } from 'react';
import { useCreateProductMutation, useGetAllProductTypesQuery } from '../../api/apiSlice';

const HeroesAddForm = () => {
    const [productName, setProductName] = useState('');
    const [productType, setProductType] = useState('');
    const [productPrice, setProductPrice] = useState('');

    const [createProduct, Product] = useCreateProductMutation();

    const {
        data: filters,
        ...ProductType
    } = useGetAllProductTypesQuery();

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

    const renderFilters = (filters) => {
        if (ProductType.isLoading) {
            return <option>Загрузка элементов</option>
        } else if (ProductType.isError) {
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
                    {renderFilters(filters)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">{(Product.isLoading) ? 'Creating' : 'Create'}</button>
        </form>
    )
}

export default HeroesAddForm;