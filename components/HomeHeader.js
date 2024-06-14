import React from "react";
import { View, Text, Image, TextInput,Button,TouchableOpacity,StyleSheet,StatusBar } from "react-native";
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




const HomeHeader = ({ onSearch }) => {
  return (
    
      <View
        style={{
          backgroundColor: "#fc9e3b",
          elevation:5,
          height:60,
          flexDirection:"row",
          alignItems:"center",
          justifyContent:"center"

        }}
      >
      
        <View style={{padding:30,flexDirection:'row'}}>
       
        <Image
          source={assets.iconpizza}
          resizeMode="contain"
          style={{ width:40,height:40}}
        />
      </View>

       
       
      
      </View>
       

    
       
      
        

       
    
  );
};

export default HomeHeader;



