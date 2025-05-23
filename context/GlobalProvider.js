import { View, Text } from 'react-native'
import React,{createContext,useContext, useState, useEffect} from 'react'
import { getCurrentuser } from '../lib/appwrite'

const GlobalContext=createContext() 
export  const useGlobalContext=()=>useContext(GlobalContext) 

const GlobalProvider=({children})=>{ 
 const[isLoggedIn, setIsLoggedIn]=useState(false) 
 const [user, setUser]=useState(null) 
 const [isloading, setIsloading]=useState(true)  

 useEffect(()=>{
   getCurrentuser()
   .then((res)=>{
    if(res){
        setIsLoggedIn(true) 
        setUser(res)
    } else{
        setIsLoggedIn(false) 
        setUser(null)
    }
   })   
   .catch((err)=>{
    console.log(err)
   }) 
   .finally(()=>{
    setIsloading(false)
   })
 },[])

 return(
    <GlobalContext.Provider 
    value={{
        isLoggedIn, setIsLoggedIn, user, setUser, isloading
    }} 
    >
        {children}
    </GlobalContext.Provider>
 )
} 

export default GlobalProvider