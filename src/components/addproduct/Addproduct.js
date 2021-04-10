import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import'./addproduct.css'

const Addproduct = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [imageURL,setimageURL] = useState(null)
     const onSubmit = data =>{
         const newData = {
             name:data.name,
             weight:data.weight,
             price:data.price,
             image:imageURL
         }
         const url =`https://sheltered-shore-39932.herokuapp.com/addproduct`
         fetch(url,{
             method:'POST',
             headers:{
                 'content-type':'application/json'
             },
             body: JSON.stringify(newData)
         })
         .then(resp=>console.log(resp))
        console.log(newData)
     }
     const handleImageUpload = (event) =>{
         console.log(event.target.files[0])
         const imgData= new FormData()
         imgData.set('key','3a73b23e77fa7ae43b6e4fd4920182bf')
         imgData.append('image',event.target.files[0])
         axios.post('https://api.imgbb.com/1/upload',imgData)
          .then(function (response) {
            setimageURL(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });
     }
    return (
        <div className="container add-form">
        <h2>Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
         <div className="container">
         <div className="row">
         <div className="col-md-12">
         <div className="row">
         <div className="col-md-6">
      <input className="inp1"  name ="name" defaultValue="Product Name" {...register("name")} />
      </div>
      <div className="col-md-6">
      <input className="inp1" name="weight" defaultValue="Weight/Quantity" {...register("weight")} />
      </div>
      <div className="col-md-6">
      <input className="inp1" type="file" onChange={handleImageUpload} />
      </div>

      <div className="col-md-6">
      <input className="inp1" name="price" defaultValue="Unit Price" {...register("price")} />
      </div>

      
      <div className="col-md-12">
      <input className="form-control btn btn-success" type="submit" />
      </div>
         </div>

         </div>
          </div>


         </div>
         
      
      

      
      
    </form>      
        </div>
    );
};

export default Addproduct;
