import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function View() {
    let [data, setData] = useState([])
    let {id} = useParams()
    useEffect(()=>{
        getDataById()
    }, []) 
    async function getDataById(){
        let result = await axios.get(`http://localhost:3000/api/getDataById/${id}`)
        setData(result.data)
    } 
  return (
    <>
    {data.map((data)=>(
    <div className="w-[300px] rounded-md border">
      <img
        src={`http://localhost:3000/${data.shoesImage}`}
        alt="Laptop"
        className="h-[200px] w-full rounded-md object-cover"
      />
      <div className="p-4">
        <h1 className='text-lg font-semibold'>ShoesId :-<span>{data.id}</span></h1>
        <h1 className='text-lg font-semibold'>ShoesBrand :-<span>{data.shoesBrand}</span></h1>
        <h1 className='text-lg font-semibold'>ShoesPrice:-<span>{data.shoesPrice}</span></h1>
        <h1 className='text-lg font-semibold'>ShoesImage:-<span>{data.shoesImage}</span></h1>
        <button
          type="button"
          className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
          Read
        </button>z
      </div>
    </div>
    ))}
    </>
  )
}
