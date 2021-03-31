import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';

import api from '../../../services/apiService';

import '../style.css';
import './style.css';

interface matchParams {
    postId : string;
}

interface postObjectAPI {
    userId : number;
    id : number;
    title : string;
    body : string;
}

const InfoPost : React.FC<RouteComponentProps<matchParams>> = (props) => {
    const { postId } = props.match.params;
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState<postObjectAPI>();

    useEffect(() => {
        api.get(`/posts/${postId}`).then((result) => {
            setPost(result.data);
            
        }).finally(() => {
            setLoading(false);
        });
    }, [postId]);

    return (
        <div className="post-page">
            <Header />
            <div className="content">
                {
                    loading ? (<p>Carregando...</p>) : 
                    post !== undefined ? 
                    <div className="post-content">
                        <h1>{post.title}</h1>
                        <h3>Escrito por usuário {post.userId}</h3>
                        <p>{post.body}</p>
                    </div> :
                    (<p>Postagem inexistente.</p>)
                }
                <Button to="/posts">Voltar</Button>
            </div>
            <Footer />    
        </div>
        
    )
}

export default InfoPost;