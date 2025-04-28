import { View, Text, FlatList, TouchableOpacity,ImageBackground, Image } from 'react-native'
import React,{useState, useCallback} from 'react' 
import * as Animatable from "react-native-animatable"  
import { icons } from '../constants' 
import { Video, ResizeMode } from 'expo-av'



const zoomIn={
  0:{
    scale:0.9
},1:{
  scale:1.2
} } 
const zoomOut={
  0:{
    scale:1
  }, 1:{
    scale:0.9
  }
}


const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          style={{
            width: 208,
            height: 200,
            borderRadius: 35,
            backgroundColor: '#000',
          }}
          useNativeControls
          shouldPlay
          resizeMode={ResizeMode.COVER}
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) 
              setPlay(false);
            
          }}
        />
      ) : (
        <TouchableOpacity
          onPress={() => setPlay(true)}
          activeOpacity={0.7}
          style={{
            width: 208,
            height: 200,
            borderRadius: 35,
            overflow: 'hidden',
            marginVertical: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#eee',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            style={{ width: '100%', height: '100%' }}
            imageStyle={{ borderRadius: 35 }}
            resizeMode="cover"
          >
            <Image
              source={icons.play}
              style={{
                height: 48,
                width: 48,
                position: 'absolute',
                top: '40%',
                left: '40%',
              }}
              resizeMode="contain"
            />
          </ImageBackground>
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};




const Trending = ({posts}) => { 
  const [activeItem, setActiveItem]=useState(posts[1]) 
  const viewableItemsChanged=useCallback(({viewableItems})=>{ 
    if(viewableItems.length>0){
      setActiveItem(viewableItems[0].key)
    }
  },[])
  return (
    <FlatList 
    data={posts} 
    keyExtractor={(item)=>item.$id} 
    renderItem={({item})=>(
       <TrendingItem item={item} activeItem={activeItem}/>
    )} 
    horizontal 
    onViewableItemsChanged={viewableItemsChanged} 
    viewabilityConfig={{
      itemVisiblePercentThreshold:70
    }} 
    contentOffset={{x:170}}
    />
  )
}

export default Trending