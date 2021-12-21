
import React from 'react';
import { useParams } from "react-router-dom";

const ArticlePage =  () => {
   //const match = props.match  
    const {name} = useParams();

    return (
        <h1>this is the {name} article</h1>
    )
}
export default ArticlePage;
