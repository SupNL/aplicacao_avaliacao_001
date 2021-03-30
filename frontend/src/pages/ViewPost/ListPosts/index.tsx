import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Paginator from '../../../components/Paginator';

import api from '../../../services/apiService';

interface postObjectAPI {
    userId : number;
    id : number;
    title : string;
    body : string;
}

const ListPosts = () => {
    const itemsPerPage = 10;
    const [loading, setLoading] = useState(true);
    const [postList, setPostList] = useState<postObjectAPI[]>([]);
    const [visiblePosts, setVisiblePosts] = useState<postObjectAPI[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = useRef(0);
    
    const loadPage = useCallback((page : number) => {
        setLoading(true);
        if(page > 0 && page <= totalPages.current) {
            const begin = (page-1)*itemsPerPage;
            setVisiblePosts(postList.slice(begin, begin+itemsPerPage));
        }
        setLoading(false);
    }, [postList]);

    // estamos recebendo todos os resultados direto da API
    // não ha limit ou page
    // adaptando para esse caso
    useEffect(() => {
        api.get('/posts').then((result) => {
            setPostList(result.data);
        });
    }, []);

    useEffect(() => {
        if(postList.length !== 0){
            totalPages.current = Math.ceil(postList.length / itemsPerPage);
            loadPage(1);
        } 
    }, [postList, loadPage]);

    useEffect(() => {
        loadPage(currentPage);
    }, [currentPage, loadPage])

    return (
        <div>
            <h1>Lista de postagens</h1>
            <ul>
            {loading ? 
                "Carregando postagens..." : 
                postList.length > 0 ?
                (
                    <>
                        {visiblePosts.map(post => (
                            <li key={post.id}>
                                <h3>{post.title}</h3>
                                <p>{post.body.length > 50 ? post.body.substr(0, 50) + "..." : post.body}</p>
                                <Link to={`posts/${post.id}`}>Continuar lendo</Link>
                            </li>
                        ))}
                        <Paginator 
                            totalPages={totalPages.current} 
                            currentPage={currentPage} 
                            setPage={setCurrentPage}
                        />
                    </>
                ) :
                <p>Não há resultados.</p>
                
            }
            </ul>
            
        </div>
    )
}

export default ListPosts;