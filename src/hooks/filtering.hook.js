import { useState } from "react";

export const useFiltering = () => {

    const [search, setSearch] = useState('');
    const [maxPrice, setMaxPrice] = useState(5000000);
    const [type, setType] = useState('');

    const searchProduct = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        return items.filter(item => (item.name
                    .toLowerCase()
                    .indexOf(term.toLowerCase()) > -1))
    }

    const maxPriceProduct = (items, term) => {
        return items.filter(item => (+item.price) < (+term))
    }

    const typeProduct = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        return items.filter(item => (+item.productType.id) === (+term))
    }

    const dataFiltering = (data) => {
        return typeProduct(maxPriceProduct(searchProduct(data, search), maxPrice), type);
    }

    return {
        dataFiltering,
        setSearch,
        setType,
        setMaxPrice,
        search,
        type,
        maxPrice
    }

}