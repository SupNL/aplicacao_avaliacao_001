import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button';

import './style.css';

interface PostCardProps {
    id : number;
    title : string;
    body : string;
}

const PostCard : React.FC<PostCardProps> = (props) => {
    const post = {
        id : props.id,
        title : props.title,
        body : props.body
    }
    return (
        <li>
            <h2>{post.title}</h2>
            <p>{post.body.length > 70 ? post.body.substr(0, 70) + "..." : post.body}</p>
            <Button to={`/posts/${post.id}`}>Ver mais</Button>
        </li>
    )
}

export default PostCard;