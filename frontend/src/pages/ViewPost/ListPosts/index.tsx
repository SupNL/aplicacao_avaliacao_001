import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import Paginator from '../../../components/Paginator';
import PostCard from '../../../components/PostCard';

import api from '../../../services/apiService';

import '../style.css';
import './style.css';

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
    // não ha limit ou page, adaptando para esse caso
    // chamada única
    useEffect(() => {
        api.get('/posts').then((result) => {
            setPostList(result.data);
        });
    }, []);

    useEffect(() => {
        // somente carregar a página um pela primeira vez quando existir posts
        if(postList.length !== 0){
            totalPages.current = Math.ceil(postList.length / itemsPerPage);
            loadPage(1);
        } 
    }, [postList, loadPage]);


    useEffect(() => {
        // carregar apenas se o total de páginas for definido
        if(totalPages.current != 0)
            loadPage(currentPage);
    }, [currentPage, loadPage])

    return (
        <div className="post-page">
            <Header />
            <div className="content">
                <h1>Lista de postagens</h1>
                <ul>
                {loading ? 
                    "Carregando postagens..." : 
                    postList.length > 0 ?
                    (
                        <>
                            <Paginator 
                                totalPages={totalPages.current} 
                                currentPage={currentPage} 
                                setPage={setCurrentPage}
                            />
                            {visiblePosts.map(post => (
                                <PostCard key={post.id} id={post.id} title={post.title} body={post.title} />
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
            <Footer />
            
        </div>
    )
}

export default ListPosts;