import { Image, ScrollView,  Text, View } from "react-native";  
import {StatusBar} from "expo-status-bar"
import { Link,Redirect,router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context"; 
import {image} from "../constants" ;
import CustomButton from "../components/CustomButton" 
import { useGlobalContext } from "@/context/GlobalProvider";


export default function Index() { 

  const{isloading, isLoggedIn} =useGlobalContext() 
  if(!isloading && isLoggedIn) 
    return <Redirect href="/home"/>
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView  contentContainerStyle={{height:"100%"}}>
       <View className="w-full min-h-[85vh] justify-center items-center px-4">
        <Image 
        source={image.logo} 
        className="w-[130px] h-[84px]" 
        resizeMode="contain"
        /> 
        <Image
            source={image.cards}
            className="max-w-[380px] w-full h-[298px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless{"\n"}
              Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>

            <Image
              source={image.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where Creativity Meets Innovation: Embark on a Journey of Limitless
            Exploration with Aora
          </Text> 
          <CustomButton  
          title="Continue with Email"
          handlePress={() => router.push("/sign-in")}
          containerStyles={{ width: "100%", marginTop: 28 }} /> 
          <StatusBar style="light" backgroundColor="#161622"/>
       </View>
      </ScrollView>
    </SafeAreaView>
  );
}
