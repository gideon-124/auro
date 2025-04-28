import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image,StyleSheet, Alert } from "react-native";

import { icons } from "../constants";  
import { router, usePathname } from "expo-router";

const SearchInput = ({initialQuery}) => {
   const pathname=usePathname() 
   const[query, setQuery]=useState(initialQuery || '')
  return (
   
          
    
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={query}
              placeholder="Search for a video topic"
              placeholderTextColor="#CDCDE0"
              onChangeText={(e)=>setQuery(e)}
              
            /> 
            
            <TouchableOpacity 
            onPress={()=>{
              if(!query){
               return Alert.alert('Missing Query', "Please input something to search results")
              } 
              if(pathname.startsWith('/search')) router.setParams({query}) 
                else router.push(`/search/${query}`)
            }}
            >
                <Image 
                source={icons.search} 
                className="w-5 h-5" resizeMode="contain"/>
            </TouchableOpacity>
            
          </View>
        
  )
} 


const styles = StyleSheet.create({
    container: {
      marginBottom: 12, 
    }, 
    placeholder:{
        color:"7b7b8b"
    },
    label: {
      fontSize: 16,
      color: "#D1D5DB",
      fontFamily: "Poppins-Medium",
      marginBottom: 6,
    },
    inputContainer: {
      width: "100%",
      height: 64,
      paddingHorizontal: 16,
      backgroundColor: "#1F2937",
      borderRadius: 16,
      borderWidth: 2, 
      flexDirection: "row",
      alignItems: "center",
    },
    input: {
      flex: 1,
      color: "#FFFFFF",
      fontSize: 16,
      fontFamily: "Poppins-SemiBold",
    },
    icon: {
      width: 24,
      height: 24, 
      
    },
  });

export default SearchInput