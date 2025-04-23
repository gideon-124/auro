import { useState, useEffect } from "react"
import { View, Text, Image, Alert } from 'react-native'
const useAppWrite=(fn)=>{ 

    const [data, setData]=useState([]) 
    const[isLoading, setIsLoading]=useState(false)  


    const fetchData=async()=>{  
        setIsLoading(true)
         try { 
            const response= await fn()  
             
            // console.log("API Response:", response);
            // console.log(response)
  
            setData(response)
          
         } catch (error) { 
          Alert.alert("Error", error.message)
          
         } finally{
          setIsLoading(false)
         }
      }
    
      useEffect(()=>{ 
        fetchData()
      },[])  

      const refetch=()=>fetchData()
      // console.log(data) 

      return {data, isLoading, refetch}

} 

export default useAppWrite