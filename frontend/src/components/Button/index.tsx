import React, { ReactPropTypes } from 'react';
import { Link } from 'react-router-dom';

import './style.css';

interface ButtonProps {
    to : string;
}

const Button : React.FC<ButtonProps> = (props) => {
    return (
        <Link to={props.to} className="button">
            {props.children}
        </Link>
        
    )
}

export default Button;