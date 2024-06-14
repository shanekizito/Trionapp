import React, { useState } from "react";
import { View, SafeAreaView, Switch,ImageBackground,TextInput ,StyleSheet,TouchableOpacity,Text} from "react-native";
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { HomeHeaderWhite} from "../components";
import {signOut } from "firebase/auth";
import { auth } from '../config/firebase';  

const AppButton = ({  title }) => (
    <TouchableOpacity onPress={() =>
      navigation.navigate('Details', { name: 'Jane' })
    } style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>
      {title}</Text>
    </TouchableOpacity>
  );










const Profile = ({navigation}) => {

    const [isEnabled, setIsEnabled] = useState(false);
    const [locationisEnabled, setLocationIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const toggleSwitchLocation = () => setLocationIsEnabled(previousState => !previousState);
     

    const LogOutButton = () => (
     
        <TouchableOpacity style={styles.appButtonContainer} onPress={() =>{
            signOut(auth).then(() => {
                console.log("success")
               }).catch((error) => {
                 console.log("error");
               });
               
          return navigation.navigate("SignIn");
        }
        } >
            <Text style={styles.appButtonText}>
            Log out 
            </Text>
          
        </TouchableOpacity>
         
      );
   return (
    <SafeAreaView style={styles.container}>
    <HomeHeaderWhite header={'Settings'} navigation={navigation}/>

    
    <View style={styles.form}>
        
       
        <View style={styles.notification}>
            <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <Icon style={styles.notificationIcon} name="bell-outline" size={25} color="black"/>
                </IconComponentProvider>
            <Text style={{fontSize:17}}>Location </Text>
            <Switch
                    style={{marginLeft:"37%"}}
                    
                   
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
            />
        </View>
        <View style={styles.notification}>
            <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <Icon style={styles.inputIcon} name="map-marker" size={25} color="black"/>
                </IconComponentProvider>
            <Text style={{fontSize:17}}>Location </Text>
            <Switch
                    style={{marginLeft:"37%"}}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitchLocation}
                    value={locationisEnabled}
            />
            
        </View>


        <LogOutButton/>
        

    </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({


    container: {
        flex: 1,
       
        
    },
    header:{
    fontSize:20,
    fontWeight:"900",
    marginLeft:20
    },
    notification:{
        height:50,
        display:"flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        
        marginTop:5,
        paddingLeft:0
        
       
        
    
    },
    notificationIcon:{
      
       
        marginRight:6,
        borderRadius:5,
    },
    inputIcon: {
        
       
      
        marginRight:6,
        borderRadius:5,

    },

    inputSection:{
        height:50,
        display:"flex",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        
        marginTop:5,
        paddingLeft:10
    },
    form:{
        padding:20,
        backgroundColor:"#ffff" ,
        flex:1,
        marginTop:0,

    },
    text:{
        fontSize: 20,
         fontWeight :'bold',
         marginBottom:12,
    },
    input: {  
    color:'#000',
    height:40,
    fontSize:17,
    width:'90%',
    borderRadius:5,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    marginLeft:10,

   
    color: '#424242',
        

    },
    appButtonContainer:{
        backgroundColor: "#000",
        color:'#fff',
        marginTop:50,
        borderRadius: 25,
        width:'100%',
        height:49,
        paddingVertical:8,
        paddingHorizontal: 5,
    },
    appButtonText:{
        fontSize: 17,
        color: "#fff",
        alignSelf: "center",
       

       
    },
    registerLink:{
     marginTop:30,
     marginLeft:25,
     color:'grey',
     fontSize:15,
     flexDirection:'row',
     justifyContent:'flex-start',
     alignItems:'center'

    },
    registerButton:{
        color:'blue',
        marginLeft:5,
        
    }



});

export default Profile;