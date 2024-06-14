import React from "react";
import { View, Text, Image, TextInput,Button,TouchableOpacity,StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES, assets } from "../constants";
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

  


TouchableOpacity.defaultProps = { activeOpacity: 0.8 };






const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16
  }
});




const AltHeader = ({ onSearch }) => {
  return (
    <View
      style={{
       
       
      }}
    >
      <View
        style={{
          backgroundColor:"white",
          width:'100%',
          height:70,
          marginBottom:20,
        }}
      >
        
        
        <Image
          source={assets.bannerLogoWhite}
          resizeMode="contain"
          style={{ width: '60%',marginLeft:20 ,height:'100%'}}
        />
        </View>
        <View style={{ width: '100%' ,borderBottom: '1px solid #64626246',marginBottom:5}}>
       
        </View>
      
        <View style={styles.screenContainer}>
      
    </View>
       
      
        

       
    </View>
  );
};

export default AltHeader;
