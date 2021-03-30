import React from 'react';

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
        <div>
            <div onClick={decrementPage}>Back</div>
            {props.currentPage !== 1 && <div onClick={() => props.setPage(1)}>1 ... </div>}
            {props.currentPage}
            {props.totalPages !== 1 && props.currentPage !== props.totalPages && <div onClick={() => props.setPage(props.totalPages)}>... 10</div>}
            <div onClick={incrementPage}>Next</div>
        </div>
    )
}

export default Paginator;