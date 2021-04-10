import React from 'react';

const Orderproducts = (props) => {
    const {name,price,weight} = props.product
    return (
        <div>
            <h4>{name} -- {price}--{weight}</h4>
        </div>
    );
};

export default Orderproducts;