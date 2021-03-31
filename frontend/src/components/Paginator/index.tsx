import React from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'

import './style.css'

interface PaginatorProps {
    totalPages : number;
    currentPage : number;
    setPage : React.Dispatch<React.SetStateAction<number>>;
}

const Paginator : React.FC<PaginatorProps> = (props) => {
    const incrementPage = () => {
        if((props.currentPage + 1) <= props.totalPages) props.setPage(old => (old + 1));
    }

    const decrementPage = () => {
        if((props.currentPage - 1) > 0) props.setPage(old => (old - 1));
    }

    return (
        <div className="paginator">
            <button><FiArrowLeft size="1.8rem" onClick={decrementPage} /></button>
            {props.currentPage !== 1 && <div className="border" onClick={() => props.setPage(1)}>1 ... </div>}
            <div className="middle">{props.currentPage}</div>
            {props.totalPages !== 1 && props.currentPage !== props.totalPages && <div className="border" onClick={() => props.setPage(props.totalPages)}>... 10</div>}
            <button><FiArrowRight size="1.8rem" onClick={incrementPage} /></button>
        </div>
    )
}

export default Paginator;