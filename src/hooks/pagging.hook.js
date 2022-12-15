import { useState } from "react"

export const usePagging = (startPage=1, elemOnPage=3) => {
    const [currentPage, setCurrentPage] = useState(startPage);
    const [countElemOnPage, setCountElemOnPage] = useState(elemOnPage);

    const nextPage = (list) => {
        if (currentPage + 1 <= Math.ceil(list.length / countElemOnPage)) {
            setCurrentPage(currentPage => currentPage + 1)
        }
    }

    const prevPage = () => {
        if (currentPage - 1 > 0) {
            setCurrentPage(currentPage => currentPage - 1)
        }
    }

    const firstPage = () => {
        setCurrentPage(1)
    }

    const lastPage = (list) => {
        if (Math.ceil(list.length / countElemOnPage) !== 0) {
            setCurrentPage(Math.ceil(list.length / countElemOnPage))
        }
    }

    return {
        currentPage,
        countElemOnPage,
        setCurrentPage,
        setCountElemOnPage,
        nextPage,
        prevPage,
        firstPage,
        lastPage
    }
}