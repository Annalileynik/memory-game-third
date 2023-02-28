import React from 'react';

const squareStyle = {
    border: "2px solid blue",
    background:'lightblue',
    width: "100px",
    height: '100px',
    textAlign: 'center',
    fontSize:'70px',
    fontWeight:'800',
    float:'left',
    cursor:'pointer'
}
const Square = (props) => {
    return (
        <button onClick={()=>props.openCard(props.card.id, props.card.img)}
            style={squareStyle}>
            {props.card.isOpen ? props.card.img : ''}
        </button>
    );
};

export default Square;