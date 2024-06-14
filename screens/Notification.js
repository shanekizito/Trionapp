import React, { useState } from "react";
import { View, SafeAreaView, Switch,ImageBackground,TextInput,Image,StyleSheet,TouchableOpacity,Text} from "react-native";
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { HomeHeaderWhite} from "../components";


const AppButton = ({  title }) => (
    <TouchableOpacity onPress={() =>
      navigation.navigate('Details', { name: 'Jane' })
    } style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>
      {title}</Text>
    </TouchableOpacity>
  );


const Notification = ({navigation}) => {

    const [isEnabled, setIsEnabled] = useState(false);
    
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

   return (
    <SafeAreaView style={styles.container}>
     <HomeHeaderWhite navigation={navigation} header={'Notifications'}/>
    
      <View style={styles.notificationContainer}>
        
      <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        <Icon name="circle-small" size={25} color="rgb(131, 195, 233)"/>
      </IconComponentProvider>
      <Image style={styles.tinyBanner}resizeMode="cover"source={{ uri:"https://kenyaonthego.com/wp-content/uploads/2021/11/black-pearl-4-520x397.jpg" }}/>
    
      <View style={styles.venueInfo}>
        <Text style={styles.location}>Club Da Place</Text>
        <Text  style={styles.Date}>14  Monday</Text>
      </View>
      <Text style={styles.timeLeft}>5 days</Text>
      </View>
      </SafeAreaView>

       
   )
};

const styles = StyleSheet.create({
container:{
  backgroundColor:'#252525',
  flex:1
},
notification:{
elevation:3,
color:"#666664",
fontSize:15,
marginLeft:20,

},
notificationsHeader:{
color:"#fff",
marginBottom:20,
marginTop:-30,
marginLeft:15,
fontSize:18,
fontWeight:"bold"
},
notificationContainer:{
  marginTop:10,
height:120,
backgroundColor:"#1f1e1ffa",
flexDirection:'row',
    padding:1,
    borderRadius:10,
    width:'95%',
    alignItems:"center",
    marginVertical: 15,
    
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: {
   	width: 0,
  	height: 1,
},
shadowOpacity: 0.18,
shadowRadius: 1.00,
elevation: 1,
  },

  tinyBanner:{
    width:90,
    height:90,
    borderRadius:15,
    marginRight:5,
  },
venueInfo:{
marginLeft:25,
marginRight:29,
color:'#fff',
},
location:{
marginBottom:10,
fontWeight:'700',
fontSize:15,
color:'#fff',


},Date:{
  fontSize:12,
  color:'grey',
},timeLeft:{

},timeLeft:{
  color:'#fff',
  backgroundColor:"#000",
  opacity:0.9,
  height:40,
  padding:10,
  borderRadius:5,

},
    Container:{

    }


})

        



export default Notification;