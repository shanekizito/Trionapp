import React from "react";
import { View, Text, Image, TextInput,Button,TouchableOpacity,StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES, assets } from "../constants";
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

  


TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
     <Icon name="login" size={20} color="black"/>
  </IconComponentProvider>{title}</Text>
  </TouchableOpacity>
);





const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#e2dddde0",
    color:'#000',
    borderRadius: 20,
    width:100,
    paddingVertical: 5,
    paddingHorizontal: 1
  },
  appButtonText: {
    fontSize: 18,
    color: "#000",
    alignSelf: "center",
  }
});




const Test = ({ onSearch }) => {
  return (
    <View
      style={{
       
       
      }}
    >
      <View
        style={{
          backgroundColor:"white",
          width:'100%',
          height:100
        }}
      >
        
        
        <Image
          source={assets.logo}
          resizeMode="contain"
          style={{ width: '90%', height:'100%' }}
        />
        </View>
        <View style={{ width: '100%', height:'30%' ,borderBottom: '1px solid #64626246',marginBottom:20}}>
       <Image
          source={assets.bannerLogo}
          resizeMode="contain"
          style={{ width: '60%', height:'100%',marginLeft:20 }}
        />
        </View>
      
      <View style={styles.screenContainer}>
      <AppButton title="Sign in" size="sm" backgroundColor="#007bff" />
    </View>
       
      
        

       
    </View>
  );
};

export default Test;
