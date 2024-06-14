import {  FocusedStatusBar, HomeHeaderWhite } from "../components";
import { COLORS, NFTData ,assets} from "../constants";
import { SafeAreaView, View, FlatList,ImageBackground, StyleSheet, Dimensions,Text,Image,TouchableOpacity} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, {useState,useEffect,useRef,useMemo,useCallback} from "react";



const IMG="https://cdn.uc.assets.prezly.com/8f4a921a-814e-4032-9b87-77ff8e40323c/-/preview/1200x1200/-/format/auto/"


const Preferences = ({navigation}) => {

    const [selectedIndices, setSelectedIndices] = useState([]);

  const toggleSelection = (index) => {
    const newSelectedIndices = [...selectedIndices];
    const indexOfIndex = newSelectedIndices.indexOf(index);
    if (indexOfIndex > -1) {
      newSelectedIndices.splice(indexOfIndex, 1);
    } else {
      newSelectedIndices.push(index);
    }
    setSelectedIndices(newSelectedIndices);
  };
    



const DATA=[
    {mood:"Happy hour",
     id:1,
     banner:"https://images.squarespace-cdn.com/content/v1/5dcc78e38b58236558d18a10/1575245358040-TTT7ERF0N5OT5DJBHKEV/d70ec4_b943ea69a1444b5392f5c2d244735244_mv2.jpg?format=2500w"
    },
    {mood:"Day vibes",
     id:2,
     banner:"https://eatout.co.ke/wp-content/uploads/2021/04/pallet-3-540x480.jpg"
    },
    {mood:"Night Club",
    id:3,
    banner:"https://campusbee.ug/wp-content/uploads/2020/02/WhatsApp-Image-2020-02-21-at-12.28.22.jpeg"
},
    {mood:"Out door",
     id:4,
     banner:"https://asset---north-carolina.bldg15.net/img/e/e/ee6db755-6d35-48fa-a9a3-8eb5c0ab94be/HaywoodCounty-crop(1,0.848,0,0.152,r4).26cef42a.jpeg"
    },
    {mood:"Fun and Games",
     id:5,
     banner:"https://www.hapakenya.com/wp-content/uploads/2017/09/Lunar-Park.jpg"
    },
    {mood:"Music concerts",
     id:7,
     banner:"https://novice2star.com/wp-content/uploads/2022/05/Rema_in_Nairobi-1024x577.jpeg"},

];


const CloseAppButton = ({  title }) => (
  <TouchableOpacity onPress={()=>{
   
     navigation.navigate('SignUp');
  }} style={styles.ProceedBtn}>
    <Text style={styles.CloseappButtonText}>Proceed</Text>
      <IconComponentProvider IconComponent={MaterialCommunityIcons}>
      <Icon name="chevron-right" size={25} color="#fff"/>
      </IconComponentProvider>
  </TouchableOpacity>
);

const Item=({ title ,banner,location,mood,id})=>{
  

    const isSelected = selectedIndices.includes(id);
     
    return (<TouchableOpacity style={styles.item} onPress={() => toggleSelection(id)} underlayColor={COLORS.ACCENT_3}>
     

      <Image
      style={{width:"100%",height:"100%", borderRadius:8,resizeMode:'cover',}}
      source={{uri:banner}}/>
      <Text style={styles.mood}> {mood}</Text>
      <View style={[styles.overlay, { backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.5)' : 'backgroundColor:"rgba(22, 21, 21, 0.4)' }]} />
     
    </TouchableOpacity>)}



  return (
    <SafeAreaView style={styles.container}>
      <HomeHeaderWhite navigation={navigation} header={'On The Go'}/>
       <Text style={styles.header}>Pick your vibes</Text>
       <View style={{width:400}}>
       {useMemo(
          () => (
        <FlatList
        numColumns={2}
        style={styles.flatList}
        data={DATA}
        renderItem={({item}) => <Item mood={item.mood} id={item.id} banner={item.banner}/>}
        keyExtractor={item => item.id}
      />))}
      </View>
      <CloseAppButton/>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    },
    flatList:{
        display:"flex",
        flexDirection:"row",
        flexWrap:"wrap",
        width:650,

    },
    header:{
      fontFamily: 'RalewayBold',
      fontSize:20,
      marginLeft:20,
      marginTop:20,
      marginBottom:15
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      ProceedBtn: {
        elevation: 8,
        backgroundColor: "#000",
         flexDirection:"row",
         alignItems:"center",
         justifyContent:'center',
        marginTop:50,
        marginLeft:20,
        borderRadius: 115,
        width:320,
        height:45,
        paddingVertical:9,
        paddingHorizontal: 5,
      },
    item:{
        display:"flex",
        flexDirection:"column",
        alignItems:'center',
        justifyContent:'center',
        
        width:180,
        height:120,
        flexDirection:'column',
        backgroundColor:'#ffff',
        marginHorizontal: 8,
        shadowColor: "#000",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
         },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
        marginTop:10,
       
    },
    mood:{
     marginTop:-51,
     position:"absolute",
     fontSize: 15,
     color:'#ffff',
     fontWeight: '800',
     textAlign:'center',
     fontFamily: 'RalewayRegular',
     minWidth:90,
     borderRadius:10,
     backgroundColor:"rgba(24,24,24,0.4)",
     padding:5,
    
    },
    CloseappButtonText: {
      fontSize: 17,
      fontFamily: 'RalewayBold',
      color: "#fff",
      flexDirection:"row",
      alignItems:"center",
      justifyContent:"flex-end",
      marginRight:10,
      marginLeft:10
  
    },
    
})

export default Preferences;