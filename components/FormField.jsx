import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image,StyleSheet } from "react-native";

import { icons } from "../constants"; 


const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
        /> 
        {title==='Password' && (
        <TouchableOpacity onPress={()=>setShowPassword(!showPassword)}> 
            <Image source={!showPassword ? icons.eye : icons.eyeHide} 
            style={styles.icon}
            resizeMode="contain"
            />
        </TouchableOpacity>
        )}
       
        
      </View>
    </View>
  );
};  



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
      marginTop:40
      // marginBottom: 6, 
      
    },
    inputContainer: {
      width: "100%",
      height: 64,
      paddingHorizontal: 16,
      backgroundColor: "#1F2937",
      borderRadius: 16,
      borderWidth: 2,
      borderColor: "#374151",
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

export default FormField;