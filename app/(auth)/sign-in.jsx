import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React,{useState,useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context' 
import {image} from "../../constants"
import FormField from '../../components/FormField'  
import CustomButton from "../../components/CustomButton" 
import { Link,router } from 'expo-router'
import { getCurrentuser, SignInApi } from '../../lib/appwrite'  
import { useGlobalContext } from "../../context/GlobalProvider"


const SignIn = () => { 
   
  const[form, setForm]=useState({
    email:"", 
    password:""
  })   
  const { setUser, setIsLoggedIn } = useGlobalContext();


  
  const [submitting, setSubmitting]=useState(false) 

  const submit=async()=>{  
        if(!form.email || !form.password){
          Alert.alert("Error", "Please fill all the fields")
        }  
        setSubmitting(true)
       try { 
        await SignInApi(form.email, form.password) 
        const result=await getCurrentuser() 
        setUser(result) 
        setIsLoggedIn(true)
        
         router.replace('/home')
       } catch (error) {
        Alert.alert("Error", error.message)
       } 
       finally {
        setSubmitting(false);
      }
      } 


  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
         <Image 
         source={image.logo} 
         resizeMode='contain' 
         className="w-[115px] h-[35px]" 
         />  
         <Text className="text-2xl text-white mt-10 text-semibold font-psemibold"> Log in to Aoro</Text> 
         <FormField 
          title="Email" 
          value ={form.email} 
          handleChangeText={(e)=>setForm({...form, email:e})} 
          otherStyles="mt-7" 
          keyboardType="email-address"
         /> 
          <FormField 
          title="Password" 
          value ={form.password} 
          handleChangeText={(e)=>setForm({...form, password:e})} 
          otherStyles="mt-7" 
         /> 
         <CustomButton 
         title="Sign In" 
         otherStyles="mt-7" 
         handlePress={submit} 
         isLoading={submitting}
         /> 
        <View className="flex justify-center pt-10 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn