import React, { useEffect, useState } from 'react';

import api from '../../services/apiService';
import PostCard from '../PostCard';

interface RecommendationsProps {
    amount : number;
    excludeId ?: number | string;
}

interface postObjectAPI {
    userId : number;
    id : number;
    title : string;
    body : string;
}

const Recommendations : React.FC<RecommendationsProps> = (props) => {
    const [postList, setPostList] = useState<postObjectAPI[]>([]);
    const [visiblePostList, setVisiblePostList] = useState<postObjectAPI[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {  
        api.get('/posts')
        .then((result) => {
            setPostList(result.data.slice(0, props.amount + 1));
        });
    }, []);

    useEffect(() => {
        if(postList.length > props.amount) {
            setLoading(true);
            let removed = false;
            setVisiblePostList(postList.filter((post, i, arr) => {
                if(props.excludeId != post.id && (removed || i !== props.amount)){
                    return true;
                } else {
                    removed = true;
                    return false;
                }
            }));
        }
        setLoading(false);
    }, [props.excludeId, postList])
    return (
        <>
            {!loading && 
            (<div className="recommendations">
                <h1>Leia mais</h1>
                <ul>
                {visiblePostList.map(post => (
                    <PostCard key={post.id} id={post.id} title={post.title} body={post.body} />
                ))}
                </ul>
            </div>)}
        </>
    )
}

export default Recommendations;