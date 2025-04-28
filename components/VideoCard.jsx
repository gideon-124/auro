import { View, Text, Image, TouchableOpacity } from 'react-native'
import React,{useState, useRef} from 'react' 
import { ResizeMode, Video } from "expo-av";
import { icons } from '../constants';

const VideoCard = ({video:{title,thumbnail, video, creator:{username, avatar} }}) => {  
  const [play, setPlay] = useState(false); 
  const videoRef = useRef(null); 
    console.log("avatar", avatar)
  return (
    <View className="flex-col items-center px-4 mb-14">   
     <View className="flex-row gap-3 items-start">  
      <View className="justify-center items-center flex-row flex-1">
      <View style={{
    width: 46,
    height: 46,
    borderWidth: 1,
    borderColor: 'orange',
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  }}>
         <Image source={{uri:avatar}} 
         className="w-full h-full rounded-lg" resizeMode='cover'/> 

        </View> 
        <View className="justify-center flex-1 ml-3 gap-y-1" style={{ marginLeft: 12, gap: 4 }} >
         <Text className="text-white text-sm font-psemibold"  numberOfLines={1}>{title}</Text>  
         <Text className="text-xs text-gray-100 font-pregular">{username}</Text>
        </View>
      </View> 

      <View className="pt-2"> 
        <Image className="w-5 h-5" resizeMode='contain' source={icons.menu}/>

      </View>

     </View> 

     {play?( 
             <Video  
             ref={videoRef}
               source={{ uri: video }}
               style={{
                width: '100%',
                height: 240,
                borderRadius: 12,
                backgroundColor: '#000',
                marginTop: 12,
               }}
               useNativeControls
               shouldPlay
               resizeMode={ResizeMode.COVER}
               onPlaybackStatusUpdate={(status) => {
                 if (status.didJustFinish) 
                   setPlay(false);
                 
               }}
             />
     ):( 
      <TouchableOpacity   
      activeOpacity={0.7} 
      onPress={()=>setPlay(true)}
      style={{width: '100%',
              height: 240, 
              borderRadius: 12,
              position: 'relative',
              marginTop: 12,
              justifyContent: 'center',
              alignItems: 'center' 
      }}  

      >  
        <Image  source={{uri:thumbnail}}  
        className="h-full w-full rounded-xl mt-3" 
        resizeMode='cover'/> 
        <Image source={icons.play} 
        className="w-12 h-12 absolute" resizeMode='contain'/>
        
      </TouchableOpacity>
     )}
    
  
      
    </View>
  )
}

export default VideoCard 

