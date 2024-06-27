import React, { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Wallet,
  Newspaper,
  BellRing,
  Paperclip,
  Brush,
  Wrench,
} from "lucide-react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import UserContext from "../../context/UserContext";
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'


export default function Sidebar() {
let [show, setShow] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  let [data, setData] = useState([]);
  let [inp, setInp] = useState('')
  let [list, setList] = useState('')
  let [navUser, setNavUser] = useState([])

  let {auth, logOut} = useContext(UserContext)
  // let{setList} = useContext(UserContext)
  useEffect(() => {
    getData();
    getCart()
  }, [auth]);
  async function getData() {
    let result = await axios.get("http://127.0.0.1:3000/api/getData");
    setData(result.data);
  }

   async function oneToFour(){
    let result = await axios.get("http://127.0.0.1:3000/api/getData");
    let final = result.data.filter((item)=>item.shoesPrice>=1000 && item.shoesPrice<= 4000)
    setData(final)
  }
   async function fourToten(){
    let result = await axios.get("http://127.0.0.1:3000/api/getData");
    let final = result.data.filter((item)=>item.shoesPrice>=4000 && item.shoesPrice<= 10000)
    setData(final)
  }
  async function tenToSixteen(){
    let result = await axios.get('http://127.0.0.1:3000/api/getData')
    let final = result.data.filter((item)=>item.shoesPrice>=10000 && item.shoesPrice<= 16000)
    setData(final)
  }
  async function sixteenToTwenty(){
    let result = await axios.get('http://127.0.0.1:3000/api/getData')
    let final = result.data.filter((item)=>item.shoesPrice>=16000 && item.shoesPrice<= 20000)
    setData(final)
  }
  async function TwentyToFourty(){
    let result = await axios.get('http://127.0.0.1:3000/api/getData')
    let final = result.data.filter((item)=>item.shoesPrice>=16000 && item.shoesPrice<= 40000)
    setData(final)
  }
   async function nikeshoes(){
    let result = await axios.get("http://127.0.0.1:3000/api/getData");
    let final = result.data.filter((item)=>item.shoesBrand==="Nike")
    setData(final)
  }
  async function adidasshoes(){
    let result = await axios.get("http://127.0.0.1:3000/api/getData");
    let final = result.data.filter((item)=>item.shoesBrand==="Adidas")
    setData(final)
  }
  async function blackberryshoes(){
    let result = await axios.get("http://127.0.0.1:3000/api/getData");
    let final = result.data.filter((item)=>item.shoesBrand==="Blackberry")
    setData(final)
  }
  async function fiveStar(){ 
    let result = await axios.get("http://127.0.0.1:3000/api/getData")
    let final = result.data.filter((item)=>item.shoesRating == 5)  
    setData(final)
  }
  
  async function fourStar(){ 
    let result = await axios.get("http://127.0.0.1:3000/api/getData")
    let final = result.data.filter((item)=>item.shoesRating == 4)  
    setData(final)
  }
  async function threeStar(){ 
    let result = await axios.get("http://127.0.0.1:3000/api/getData")
    let final = result.data.filter((item)=>item.shoesRating == 3)  
    setData(final)
  }
  async function twoStar(){ 
    let result = await axios.get("http://127.0.0.1:3000/api/getData")
    let final = result.data.filter((item)=>item.shoesRating == 2)  
    setData(final)
  }
  async function oneStar(){ 
    let result = await axios.get("http://127.0.0.1:3000/api/getData")
    let final = result.data.filter((item)=>item.shoesRating == 1)  
    setData(final)
  }
  async function shoesChange(){ 
    let result = await axios.get("http://127.0.0.1:3000/api/getData")
    let final = result.data.filter((item)=>item.shoesCategory == "Shoes")  
    setData(final)
  }
  async function clothesChange(){ 
    let result = await axios.get("http://127.0.0.1:3000/api/getData")
    let final = result.data.filter((item)=>item.shoesCategory == "Clothes")  
    setData(final)
  }
  async function electronicChange(){ 
    let result = await axios.get("http://127.0.0.1:3000/api/getData")
    let final = result.data.filter((item)=>item.shoesCategory == "Electronic")  
    setData(final)
  }
  
  async function getDataByBrand(){
    if(inp){
      let result = await axios.get(`http://127.0.0.1:3000/api/getDataByBrand/${inp}`);
    setData(result.data)
    }
  }


  
  let navigation = useNavigate()
  async function addToCart(data){
    if(auth.isAuthorized){
      await axios.post(`http://localhost:3000/api/saveCart/${auth.username}`, {
        shoesBrand: data.shoesBrand,
        shoesType: data.shoesType,
        shoesRating: data.shoesRating,
        shoesPrice: data.shoesPrice,
        shoesImage: data.shoesImage,
    
      })
      alert("product saved into cart")
      getCart()
    }else{
      navigation('/signin')
    }
    }
  async function getCart(){
   if(auth.isAuthorized){
    let result = await axios.get(`http://localhost:3000/api/getCart/${auth.username}`)
    setList(result.data.length)
   }
  }
  async function getClient(){
   if(auth.username){
    let result = await axios.get(`http://localhost:3000/api/getClient/${auth.username}`)
    setNavUser(result.data)
   }
  }
  console.log(navUser)
  useEffect(()=>{
    getClient()
  }, [auth])
  useEffect(()=>{
    getDataByBrand()
    if(inp ==''){
      getData()
    }
  },[inp])

  function handleLogout(){
    alert('You want to LogOut?')
    logOut()
    window.location.reload()
  }
  return (
    <>
<div className="fixed z-50 w-full bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span>
            <svg
              width="30"
              height="30"
              viewBox="0 0 50 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                fill="black"
              />
            </svg>
          </span>
          <span className="font-bold">My Shopping</span>
        </div>
        <div className="hidden lg:block ">
          <ul className="inline-flex space-x-8 ">
           <nav className="flex justify-evenly w-60	font-normal ">
            <li className="hover:text-red-400 hover:cursor-pointer" onClick={shoesChange}>Shoes</li> 
            <li className="hover:text-red-400 hover:cursor-pointer" onClick={electronicChange}>Electronic</li>
            <li className="hover:text-red-400 hover:cursor-pointer" onClick={clothesChange}>Clothes</li>
           </nav>
          </ul>
        </div>
         
       <div className="flex items-center gap-[30px]">
       <form class="max-w-md mx-auto">
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"></label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Products..." required
          onChange={(e)=>setInp(e.target.value)}
          />
            
        </div>
      </form>
       <div className="hidden lg:block">
          <Link
            type="button"
            to = '/cart'
            className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Cart
            <span className={`${ list ? 'w-[20px] text-center text-2xl top-[-1px] right-[100px] rounded h-[30px] bg-red-600 absolute' : 'hidden' }`}>{list}</span>
          </Link>
        </div>
        {
          navUser &&  navUser.map((data)=>(
            <div className="ml-2 mt-2 hidden lg:block relative">
          <span className="relative inline-block" onClick={()=>setShow(!show)}>
            <img
              className="h-10 w-10 rounded-full"
              
              src={`http://localhost:3000/${data.image}`}
              alt="Dan_Abromov"
            />
          </span>
            <span className=" absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-white"></span>
            {show &&<div className=" h-[200px] w-[150px] rounded-[20px] bg-red-400 absolute right-[0px] flex flex-col justify-evenly items-center">
              <h2 className='text-xl uppercase font-bold'>{data.username}</h2>
                  <button className='p-2 bg-black text-white rounded-xl'
                  onClick={handleLogout}
                  >Logout</button></div>}

        </div>
        
        ))
        }
       </div>
        <div className="lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span>
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 50 56"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                          fill="black"
                        />
                      </svg>
                    </span>
                    <span className="font-bold">DevUI</span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>
                <button
                  type="button"
                  className="mt-4 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Button text
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>




      <aside className="flex fixed h-screen w-64 flex-col text-black overflow-y-auto bg-slate-100 px-5 py-8">

<div className="mt-6 flex flex-1 flex-col  justify-between">
  <nav className="-mx-3 space-y-6 ">
    <div className="space-y-3">
     
      <button
        className="flex transform items-center bg-gray-200 rounded-lg mt-[20px] px-3 py-2 text-black-200 transition-colors duration-300 hover:bg-gray-100 hover:bg-gray-400"
        onClick={getData}

      >
        <span className="mx-2 text-sm font-medium">All</span>
      </button>
    </div>
    <div className="space-y-3 ">
      <label className="px-3 text-xs font-semibold uppercase text-slate-800	">Price</label>
      <button
        className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-400 hover:text-gray-700"
        onClick={oneToFour}
      >
        <span className="mx-2 text-sm text-slate-800 font-medium">1000Rs - 4000Rs</span>
      </button>
      <button
        className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-400 hover:text-gray-700"
        onClick={fourToten}
      >
        <span className="mx-2 text-sm text-slate-800 font-medium">4000Rs - 10000Rs</span>
      </button>
      <button
        className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-400 hover:text-gray-700"
        onClick={tenToSixteen}
      >
        <span className="mx-2 text-sm text-slate-800	 font-medium">10000Rs - 16000Rs</span>
      </button>
      <button
        className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-400 hover:text-gray-700"
        onClick={sixteenToTwenty}
      >
        <span className="mx-2 text-sm text-slate-800	font-medium">16000Rs - 20000Rs</span>
      </button>
      <button
        className="flex transform items-center rounded-lg px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-400 hover:text-gray-700"
        onClick={TwentyToFourty}
      >
        <span className="mx-2 text-sm text-slate-800	font-medium">20000Rs - 40000Rs</span>
      </button>
      
    </div>
    
    <div className="space-y-3">
      <label className="px-3 text-xs font-semibold uppercase text-black">Brand</label>
      <button
        className="flex transform items-center rounded-lg px-3 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-400 hover:text-gray-700"
        onClick={nikeshoes}
      >
        <span className="mx-2 text-sm font-medium">Nike</span>
      </button>
      <button
        className="flex transform items-center rounded-lg px-3 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-400 hover:text-gray-700"
        onClick={adidasshoes}
      >
        <span className="mx-2 text-sm font-medium">Adidas</span>
      </button>

      <button
        className="flex transform items-center rounded-lg px-3 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-400 hover:text-gray-700"
        onClick={blackberryshoes}
      >
        <span className="mx-2 text-sm font-medium">Blackberry</span>
      </button>
      
    </div>
   
    <div className="space-y-3 ">
      <label className="px-3 text-xs font-semibold uppercase text-black">Rating</label>
      <button
        className="flex transform items-center rounded-lg px-3 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-400 hover:text-red-700 "
        onClick={oneStar}
        
      >
        <span className="mx-2 text-sm font-medium">⭐</span>
      </button>
      <button
        className="flex transform items-center rounded-lg px-3 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-400 hover:text-gray-700"
        onClick={twoStar}

      >
        <span className="mx-2 text-sm font-medium">⭐⭐</span>
      </button>
      <button
        className="flex transform items-center rounded-lg px-3 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-400 hover:text-gray-700"
        onClick={threeStar}

      >
        <span className="mx-2 text-sm font-medium">⭐⭐⭐</span>
      </button>
      <button
        className="flex transform items-center rounded-lg px-3 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-400 hover:text-gray-700"
       onClick={fourStar}
      >
        <span className="mx-2 text-sm font-medium">⭐⭐⭐⭐</span>
      </button>
      <button
        className="flex transform items-center rounded-lg px-3 py-2 text-gray-800 transition-colors duration-300 hover:bg-gray-400 hover:text-gray-700"
        onClick={fiveStar}
      >
        <span className="mx-2 text-sm font-medium">⭐⭐⭐⭐⭐</span>
      </button>
      
    </div>
   
  </nav>
</div>
</aside>


      <div className=" flex absolute flex flex-wrap justify-evenly w-[1000px] left-[265px] top-[70px] gap-[30px]">
        {data.map((data) => (
          <div className="w-[300px] rounded-md border">
            <img
              src={`http://localhost:3000/${data.shoesImage}`}
              alt="Laptop"
              className="h-[200px] w-full rounded-md object-cover transition ease-in delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 duration-300" 
            />
            <div className="p-4">
              <h1 className="text-lg font-semibold">
                Product Brand :-<span className="font-normal">{data.shoesBrand}</span>
              </h1>
              <h1 className="text-lg font-semibold">
                Product Rating :-<span className="font-normal">{data.shoesRating}</span>
              </h1>
              <h1 className="text-lg font-semibold">
                Product Price:-<span className="font-normal">{data.shoesPrice}</span>
              </h1>
              <button
                type="button"
                onClick={()=>addToCart(data)}
                className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black "
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
