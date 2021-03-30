import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import api from '../../../services/apiService';

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
    }, []);

    return (
        <div>
            {
                loading ? 
                (<p>Carregando...</p>) : 
                    post !== undefined ? 
                    <>
                    <h1>{post.title}</h1>
                    <h3>Escrito por usuário {post.userId}</h3>
                    <p>{post.body}</p>
                    <Link to="/posts">Voltar</Link>
                    </> :
                    (<p>Não encontrado.</p>)
                
            }
            
        </div>
        
    )
}

export default InfoPost;