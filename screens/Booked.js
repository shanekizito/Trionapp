import { useEffect, useState } from 'react';
import { onSnapshot, doc, collection, getDoc,query, where } from 'firebase/firestore';
import { auth, database } from '../config/firebase';
import { SafeAreaView, View, FlatList,ImageBackground, StyleSheet, Text,Image,TouchableOpacity} from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { HomeHeaderWhite} from "../components";


 const Booked = ({navigation}) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredata ,setFiltereData] =useState([]);

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async authenticatedUser => {
      if (authenticatedUser) {
        const userId = authenticatedUser.uid;
        const docRef = doc(database, "Tickets",userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        setData(docSnap.data());
        const dataArray = Object.values(docSnap.data());
      
        const filteredDataArray = dataArray.filter(function(item) {
          return Object.keys(item).length !== 0;
        });
    
        setFiltereData (filteredDataArray)
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
        
      } else {
        setData([]);
      }
    });
  
    return () => unsubscribe();
  }, []);



  

  

    const EmptyContainer=()=>{
      return(
     
      <View  style={styles.EmptyContainer}>
      <Text style={styles.emptyText}>no tickets</Text>
      </View>
      )
    }


  const renderData = () => {
    return filteredata.map(item => (
         <TouchableOpacity key={item.index} onPress={()=>navigation.navigate("SingleTicket",{Ticket:{item}})}>
        <View  style={styles.notificationContainer}>
          <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <Icon name="circle-small" size={25} color="rgb(131, 195, 233)"/>
          </IconComponentProvider>
          <Image style={styles.tinyBanner} resizeMode="cover" source={{ uri: item.banner }}/>
          <View style={styles.venueInfo}>
            <Text style={styles.location}>{item.title}</Text>
            <Text style={styles.timeLeft}>{item.date}</Text>
          </View>
          <Text style={{
            color:'#fff',
            backgroundColor: item.booked ? 'rgba(61, 245, 95, 0.883)' : 'red', // if booked is true, set the background color to green, otherwise set it to red,
            opacity:0.9,
            height:35,
            width:35,
            padding:5,
            borderRadius:5,
            marginTop:25
          }}>
            {item.booked?<IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <Icon name="check-all" size={25} color="#ffff"/>
          </IconComponentProvider>:<IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <Icon name="plus" size={25} color="#fff"/>
          </IconComponentProvider>}
            
            </Text>
        </View>
        </TouchableOpacity>
      ))
  };
  

  return (
    <SafeAreaView>
      <HomeHeaderWhite navigation={navigation} header={'Reservation'}/>
      {filteredata.length>0?renderData():<EmptyContainer/>}
    </SafeAreaView>
  );
}




const styles = StyleSheet.create({
  container:{
    
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

    EmptyContainer:{
      marginTop:10,
      height:120,
      backgroundColor:"#1f1e1ffa",
      flexDirection:'row',
      
          padding:1,
          borderRadius:10,
          width:'95%',
          alignItems:"center",
          justifyContent:"center",
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
    emptyText:{
    fontFamily:"RalewayBold",
    color:"white",
    fontSize:20
    },
  venueInfo:{
  marginLeft:25,
  width:150,
  marginRight:0,
  color:'#fff',
  },
  location:{
  marginBottom:10,
  fontWeight:'700',
  fontSize:13,
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
    width:100,
    padding:10,
    alignItems:"center",
    borderRadius:5,
  
  },
  bookedBTN:{
    color:'#fff',
    backgroundColor:"rgba(61, 245, 95, 0.883)",
    opacity:0.9,
    height:35,
    width:35,
    padding:5,
    borderRadius:5,
    marginTop:25
  },
  input: {
    marginTop:10,
    borderBottomColor:'rgba(196, 193, 193, 0.945)',
    borderBottomWidth:2,
    color:'#000',
    height:40,
    fontSize:17,
    marginTop:20,
    padding:10,
    fontFamily: 'sans-serif',
    width:"80%"
},
  
  
  })
  
  
  


export default Booked;