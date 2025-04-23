import { View, Text, Image } from "react-native";
import React from "react";
import { image } from "../constants"; 
import CustomButton  from "./CustomButton" 
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className='justify-center items-center px-4'>
      <Image
        source={image.empty}
        className='w-[270px] h-[215px]'
        resizeMode='contain'
      /> 
      <Text className='text-xl  text-center mt-2 font-psemibold text-white '>
        {title}
      </Text> 
      <Text className='font-pmedium text-gray-100 text-sm'>{subtitle}</Text>
      
      <CustomButton 
      title="Create video"  
       handlePress={() => router.push("/create")}  
       containerStyles={{ flex:1, marginVertical: 20 }}
      />  
    </View>
  );
};

export default EmptyState;
