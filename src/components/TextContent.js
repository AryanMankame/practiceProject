import React from 'react';
const TextContentjs = (props) => {
    return (
        <div className="text">
        <h2>{props.name}, your current rank is ...</h2>
        <h2>{props.rank}</h2>
        <h2>The Magic Brain will detect faces in your picture.Give it a try.</h2>
        </div>
    );
}
export default TextContentjs;