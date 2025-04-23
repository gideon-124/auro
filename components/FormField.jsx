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
      marginBottom: 12, // Adjust spacing between fields
    }, 
    placeholder:{
        color:"7b7b8b"
    },
    label: {
      fontSize: 16,
      color: "#D1D5DB", // Equivalent to text-gray-100
      fontFamily: "Poppins-Medium",
      marginBottom: 6,
    },
    inputContainer: {
      width: "100%",
      height: 64, // Equivalent to h-16
      paddingHorizontal: 16, // px-4
      backgroundColor: "#1F2937", // Equivalent to bg-black-100
      borderRadius: 16, // rounded-2xl
      borderWidth: 2, // border-2
      borderColor: "#374151", // border-black-200
      flexDirection: "row",
      alignItems: "center",
    },
    input: {
      flex: 1,
      color: "#FFFFFF", // Equivalent to text-white
      fontSize: 16,
      fontFamily: "Poppins-SemiBold",
    },
    icon: {
      width: 24, // w-6
      height: 24, // h-6
      
    },
  });

export default FormField;