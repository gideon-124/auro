import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react' 
import { SafeAreaView } from 'react-native-safe-area-context' 
import FormField from "../../components/FormField" 
import CustomButton from "../../components/CustomButton"
import { Video, ResizeMode } from 'expo-video';
import * as DocumentPicker from 'expo-document-picker'
import { icons } from '../../constants' 

const Create = () => {    
  const[uploading, setUploading]=useState(false)
  const[form, setForm]=useState({
    title:"", 
    video:null,  
    thumbnail:null,
    prompt:'', 
  })  

  const openPicker=async (selectedType) => { 
    // const result=await DocumentPicker.getDocumentAsync ({
    //   type : selectedType==="image" ? 
    //   ['image/png', 'image/jpeg'] :['video/mp4', 'video/gif']
    // })  
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectedType === 'image' ?   'images' : 'videos',
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1, });
    if(!result.canceled){
      if(selectedType ==="image"){
        setForm({...form, thumbnail:result.assets[0]})
      } 
      if(selectedType ==="video"){
        setForm({...form, video:result.assets[0]})
      }
    } else{
      setTimeout(()=>{
         Alert.alert('Document picked', JSON.stringify(result, null, 2))
      },100)
    }
    
  }
  
  const submit=()=>{

  }

  return (
<SafeAreaView className="h-full bg-primary">
  <ScrollView className="px-4 my-6"> 
    <Text className="font-psemibold text-2xl text-white"> Upload Video</Text> 
   
    <FormField 
    title="Video Title"  
    value={form.title} 
    placeholder="Give your Video  a catch title ..." 
    handleChangeText={(e)=>setForm({...form, title:e})}
    otherStyles={{ marginTop: 40 }}
    /> 

    <View className="mt-7 space-y-2"> 
      <Text className="font-pmedium text-base text-gray-100">
        Upload Video
      </Text> 
      <TouchableOpacity onPress={()=>openPicker('video')}>
        {
          form.video ?(
            <Video 
             source={{uri:form.video.uri}} 
             className="w-full h-64 rounded-2xl" 
             useNativeControls 
             resizeMode={ResizeMode.COVER} 
             isLooping
            /> 

          ) :(
            <View className="w-full h-40 px-4 
            bg-black-100 justify-center rounded-2xl items-center"> 
            <View className="w-14 h-14 border border-dashed  
            border-secondary-100 justify-center items-center"> 
            <Image source={icons.upload} resizeMode='contain' 
            className="w-1/2 h-1/2"/>

            </View>

            </View>
          )
        }
      </TouchableOpacity>

    </View>  

    <View className="space-y-2 mt-7"> 
    <Text className="font-pmedium text-base text-gray-100">
        Thumbnail Image
      </Text>   
      <TouchableOpacity onPress={()=>openPicker('image')}>
        {
          form.thumbnail ?(
            <Image source={{uri:form.thumbnail.uri}} 
            resizeMode='cover' 
            className="w-full h-64 rounded-2xl"/>
          ) :(
            <View className="w-full h-16 px-4 
            bg-black-100 justify-center rounded-2xl items-center 
            border-2 border-black-200 flex-row space-x-2"> 
           
            <Image source={icons.upload} resizeMode='contain' 
            className="w-5 h-5"/> 
            <Text className="text-sm text-gray-100 font-pmedium"> Choose a file</Text>

            

            </View>
          )
        }
      </TouchableOpacity>


    </View> 
     
    <FormField 
    title="AI Prompt"  
    value={form.prompt} 
    placeholder="The Prompt used to create a video" 
    handleChangeText={(e)=>setForm({...form, prompt:e})}
    otherStyles={{ marginTop: 40 }}
    /> 
    <CustomButton 
    title="Submit & Publish"  
    handlePress={submit}   
    containerStyles={{marginTop:28}}
    isLoading={uploading}
    />


  </ScrollView>
</SafeAreaView>
  )
}

export default Create