import React from 'react';

const Tr = (props) => {
    const {name,_id,weight,price} = props.product;
    return (
    
            <tr>
      <td>{name}</td>
      <td>{weight}</td>
      <td>{price}</td>
    </tr>

    );
};

export default Tr;