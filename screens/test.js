import React, {useState, useEffect, useRef, useMemo, useCallback} from "react";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { SafeAreaView, View, FlatList, ImageBackground, StyleSheet, Dimensions, Text, Image, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import { HomeHeaderWhite } from "../components";
import { useBottomSheetModal } from '@gorhom/bottom-sheet';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Barcode from 'react-native-barcode-svg';
import { useFocusEffect } from '@react-navigation/native';
import AnimatedLoader from 'react-native-animated-loader';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Animated } from 'react-native';
import { doc, setDoc, getFirestore, addDoc, collection } from 'firebase/firestore';
import { auth, database } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

const Map = ({navigation}) => {
  const [originData, setOrigin] = useState({latitude: 28.450127, longitude: -1.269045});
  const [errorMsg, setErrorMsg] = useState(null);
  const { width, height } = Dimensions.get('window');
  const bottomSheetModalRefVenue = useRef(null);
  const { dismiss, dismissAll } = useBottomSheetModal();
  const map = useRef();
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const snapPoints = useMemo(() => ['10%', '25%', '30%']);
  const [time, setTime] = useState(false);
  const GOOGLE_MAPS_APIKEY = 'AIzaSyCmcpx4SLKG6wLsdIeD6RT5ioDYihSRNM0';
  const [destination, setDestination] = useState({latitude: 37.4226711, longitude: -122.0849872});
  const [visible, setVisible] = useState(false);
  const [CoordinatesReady, setCoordinatesReady] = useState(false);
  const [venueData, setVenueData] = useState({});
  const route = useRoute();
  const anim = useRef(new Animated.Value(1));
  const [user, setUser] = useState(null);
  const firestore = getFirestore();
  const ticketsCollectionRef = collection(firestore, 'Tickets');
  
  useEffect(() => {
    // makes the sequence loop
    Animated.loop(
      // runs given animations in a sequence
      Animated.sequence([
        // increase size
        Animated.timing(anim.current, {
          toValue: 2, 
          duration: 2000,
          useNativeDriver: true
        }),
        // decrease size
        Animated.timing(anim.current, {
          toValue: 1, 
          duration: 2000,
          useNativeDriver: true
        }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    try {
      setVenueData(route.params.item);
      const unsubscribeAuth = onAuthStateChanged(auth, async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : null;
        console.log(authenticatedUser);
        if (authenticatedUser) {
          const userId = authenticatedUser.uid;
          await addDoc(ticketsCollectionRef, { userId, venueData });
        }
      });
      return unsubscribeAuth;
    }catch(err){
     console.log(err)
    }
  },[venueData]);


  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 10000);
  }, [0]);


  const handlePresentModalPress = useCallback(() => {
    !bottomSheetModalRefVenue.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  




  useFocusEffect(


    useCallback(() => {
      handlePresentModalPress();
      
      
    }, []))
  

  useEffect(() => {
   
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      getCordinates();
      
    })();
  }, []);

 
  const getCordinates= async ()=>{
    let location = await Location.getCurrentPositionAsync({});

    const currentLocation={
      latitude:location.coords.latitude,
      longitude:location.coords.longitude
    }
   
    setOrigin(currentLocation);
    console.log(currentLocation,"locationnnnnn");
    
  
}





 

  return (
    <SafeAreaView style={styles.container}>
     
      <HomeHeaderWhite navigation={navigation} header={'Go direction'}/>
     
     
    {!CoordinatesReady?(
      <View style={styles.indicator}>
      <Animated.View
      useNativeDriver={true}
      style={{ transform: [{ scale: anim.current }] }}>
     <Image
        source={{uri:'https://img.icons8.com/ios-filled/100/null/go.png'}}
        resizeMode="contain"
        style={{width:50,height:50}}
      />
      </Animated.View>
    </View>
    ):null}
   
    <MapView ref={map}
     style={!CoordinatesReady?
      {height: 10,width:10} :
      {height: "100%",width:"100%" }}
    
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      initialRegion={{
        latitude: -1.3221119,
        longitude: 36.7983279,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
      }}>
        
      <MapViewDirections
        origin={originData}
        languege="en"
        region="KE"
        destination={venueData.location}
        onStart={(params) => {
          console.log(`Started routing between "${params.originData}" and "${params.destination}"`);
        }}
        onReady={result => {
          
          setDestination(result.coordinates[result.coordinates.length-1]);
          console.log(`Distance: ${result.distance} km`)
          console.log(`Duration: ${result.duration} min.`)
          setDistance(result.distance);
          setDuration(result.duration);
          map.current.fitToCoordinates(result.coordinates, {
            edgePadding: {
              right: (width / 20),
              bottom: (height / 20),
              left: (width / 20),
              top: (height / 20),
            }})
            if(result.coordinates){
              setCoordinatesReady(true)
              console.log("trueee");
           
            }else{
              console.log(result);
              setCoordinatesReady(false)

            }
        }}
        onError={(errorMessage) => {
          console.log('GOT AN ERROR');
        }}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={5}
        strokeColor="red"
      />
      
      <Marker
        coordinate={originData}
        title={'Origin'}
      />
      <Marker
        coordinate={destination}
        image={{uri:'https://img.icons8.com/ios-filled/100/null/go.png'}}
        title={'Destination'}

      />
    </MapView>
    
    
    
    
    <BottomSheetModal
            ref={bottomSheetModalRefVenue}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            enablePanDownToClose={false}
            
             >
          <View style={styles.contentContainer}>
          
               <View style={styles.ticket}>
                
                  <View style={styles.venueContainer}>
                    <Image style={styles.tinyBanner}resizeMode="cover"source={{ uri:venueData.banner }}/>
                  <View style={styles.venueInfoContainer}>
                    <Text style={styles.place}>{venueData.title}</Text>
                    <Text style={styles.venueLocation}>{venueData.location}</Text>
                 </View>
               </View>
 
              <View style={styles.userInfoContainer}>
                <View style={styles.row1}>
                <Text style={styles.title}>{duration.toFixed(0)} KM </Text>
                <Text style={styles.title}>{distance.toFixed(0)} Minutes</Text>

                <Text style={styles.title}>Feb 29 2023</Text>
                </View>

              <View style={styles.row2}> 
                  <Text style={styles.title}>4:30 PM</Text>
                  
                  <View style={{marginTop:19}}>
        
          <Text  style={styles.title}><IconComponentProvider IconComponent={MaterialCommunityIcons}>
            
        <Icon name="tag-outline" size={25} color="#000"/>
           free 
        </IconComponentProvider></Text>
        </View>
              
              </View>


          </View>
      
              </View>
            
       </View>
        </BottomSheetModal>
    </SafeAreaView>
    
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
  indicator: {
   backgroundColor:"rgba(24,24,24,0.4)",
    flex:2,
    alignItems: 'center',
    display:'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    

  },
  bottomSheetRef: {
    flex: 1,
    padding: 24,
    

    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  item:{
    marginTop:-10,
    height:'99%',
  },
  eventDetails:{
  marginTop:30,
  marginBottom:70,
  marginLeft:20,

  },
  dateTextContainer:{
    fontSize:15, 
    flexDirection:"column",
    justifyContent:"center",

  },
  
  bannerImage:{
    width:'100%',
    height:'98%',
    borderRadius:100,
  },
  card:{
     flexDirection:'column',
     position:'absolute',
     
     marginTop:70,
     borderRadius:35,
     borderBottomLeftRadius:0,
     borderBottomRightRadius:0,
     width:'100%',
     alignItems:'center',
     height:"100%",
  },
  linearGrd:{
    flex:1,
    height:'100%',
    alignItems:'flex-start',
    width:'100%',
    justifyContent:'flex-start',
    width:'100%',
     borderRadius:25,
     textAlign:'center',
     borderBottomLeftRadius:0,
     borderBottomRightRadius:0,
     borderTopRightRadius:0,
  },
  vibe:{
    lineHeight:25,
    fontSize:15,
    marginLeft:20,
    fontFamily: 'sans-serif',
    color:'#fff',
    marginBottom:15,
    
  },
  date:{
    fontFamily: 'sans-serif',
    fontSize:12,
    color:'grey',
     justifyContent:'flex-start',
     marginTop:30,
     backgroundColor:"#ffff",
     width:70,
     marginLeft:127,
     marginTop:-20,
     padding:12,
     borderRadius:12,

  },
  venueContent:{
 flexDirection:'row',
  },
  dateText:{
color:'#000',
borderTopWidth:3,
borderTopColor:'grey',
 
fontWeight:'bold',
fontSize:25,
fontFamily: 'RalewayRegular',

  },
  venue:{
    fontSize:15,
    alignItems:'center',
    flexDirection:'row',
    color:'#fff',
    fontFamily: 'sans-serif',
  },

  area:{
    fontSize:22,
    fontFamily: 'sans-serif',
    marginLeft:20,
    fontWeight:'600',
    marginTop:30,
    textAlign:'center',
    color:'white',
  },

  road:{
    fontSize:10,
    textAlign:'center',
    fontFamily: 'sans-serif',
    marginTop:20,
    alignSelf:'stretch',
  },CloseappButtonContainer: {
    elevation: 8,
     backgroundColor: "#000",
     flexDirection:"row",
     alignItems:"center",
     justifyContent:'center',
    marginTop:120,
    marginLeft:10,
    borderRadius: 115,
    width:320,
    height:45,
 
    zIndex:3
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#fff",
     flexDirection:"row",
     alignItems:"center",
     justifyContent:'center',
    marginTop:120,
    marginLeft:20,
    borderRadius: 115,
    width:320,
    height:45,
    paddingVertical:9,
    paddingHorizontal: 5,
    zIndex:3
  },
  appButtonText: {
    fontSize: 17,
    fontFamily: 'sans-serif',
    color: "#000",
    alignSelf: "center",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    marginRight:10,
    marginLeft:10

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
  BackButtonContainer:{
    backgroundColor:"black",
    borderRadius:200,
    alignItems:'center',
    justifyContent:'center',
    marginTop:-20,
    marginBottom:40,
    marginLeft:10,
    padding:5,
    width:40,
    height:40
  },
  place:{
    fontFamily: 'RalewayBold',
    fontSize:18,
    marginBottom:10,

},
barCode:{
height:100,
width:100,
color:"#0f0",


},
ticket:{
shadowColor: "#000",
flexDirection:'column',
backgroundColor: '#ffff',
padding:20,
borderRadius:10,
width:'95%',
justifyContent:'center',
marginVertical: 15,
marginTop:10,
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
row3:{
marginTop:20,

alignItems:'center',
justifyContent:"center",


}
,
info:{
marginTop:0,
marginBottom:15,
color:"grey",
fontFamily: 'RalewayRegular',
},

venueContainer: {
    flexDirection:'row',
    alignItems:'center',
    borderBottomWidth:1,
    borderBottomColor:'#e4e3e3',
    
    paddingBottom:20
},
tinyBanner:{
    width:40,
    height:40,
    borderRadius:15,
    marginRight:20,
},

venueInfoContainer: {
    
}
,
title:{
  fontSize:15,
  fontFamily: 'RalewayBold',
  marginTop:5,
},

venueName: {
},
venueLocation: {
    fontSize:12,
    fontFamily: 'sans-serif',
},
});
export default Map;