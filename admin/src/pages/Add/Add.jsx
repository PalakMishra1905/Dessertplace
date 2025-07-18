import React, { useState } from 'react'
import './Add.css'
import axios from 'axios'
import { toast } from 'react-toastify';

const Add = ({url}) => {

  const [image, setImage] = useState(false);
  const [data, setData] = useState({
   name:"",
   description:"",
   price:"",
   category:"Cake"
  })

  const onChangeHandler = (event)=>{
     const name = event.target.name;
     const value = event.target.value;
     setData((data)=>({...data, [name]:value}));
   }

   const onSubmitHandler = async(event)=>{
      event.preventDefault();
      const formData = new FormData();
      formData.append("name",data.name)
      formData.append("description",data.description)
      formData.append("price", Number(data.price))
      formData.append("category",data.category)
      formData.append("image",image)
      const response = await axios.post(`${url}/api/food/add`, formData);
      if(response.data.success){
        setData({
          name:"",
          description:"",
          price:"",
          category:"Cake"
        })
        setImage(false);
        toast.success(response.data.message);
      }else{
        toast.error(response.data.message);
      }
   }
   
  return (
    <div className='add'>
      <form action="" className="flex-col" onSubmit={onSubmitHandler}>

         <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor='image'>
               <img src={image?URL.createObjectURL(image):"upload_area.png"} alt="" />
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required/>
         </div>

         <div className="add-product-name flex-col">
             <p>Product name</p>
             <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='type here'/>
         </div>

         <div className="add-product-description flex-col">
             <p>Product description</p>
             <textarea onChange={onChangeHandler} value={data.description} required name="description" rows="6" placeholder='write content here'></textarea>
         </div>

         <div className="add-category-price">
           <div className="add-category flex-col">
             <p>Product category</p>
              <select onChange={onChangeHandler} value={data.category} name="category">
                 <option value="Cake">Cake</option>
                 <option value="Pancake">Pancake</option>
                 <option value="Bread">Bread</option>
                 <option value="Cheesecake">Cheesecake</option>
                 <option value="Puff">Puff</option>
                 <option value="Icecream">Icecream</option>
                 <option value="Macaroon">Macaroon</option>
                 <option value="Dounout">Dounout</option>
              </select>
         </div>

         <div className="product-price">
            <p>Product price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder="150" required />
         </div>
         </div>

         <button type='submit' className='add-btn'>Add</button>
      </form>
    </div>
  )
}

export default Add