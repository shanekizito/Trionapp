import React, { useEffect, useState } from 'react';
import { onSnapshot, doc, addDoc, collection, getDoc, setDoc, query, where } from 'firebase/firestore';
import { auth, database } from '../config/firebase';
import { SafeAreaView, View, TextInput, FlatList, ImageBackground, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { HomeHeaderWhite } from "../components";
import { useRoute, useNavigation } from '@react-navigation/native';
import Barcode from 'react-native-barcode-svg';
import { Stack, ActivityIndicator } from "@react-native-material/core";
import { mdiCardAccountDetailsOutline } from '@mdi/js';

const SingleTicket = ({ navigation }) => {
  const [venueData, setVenueData] = useState({});
  const route = useRoute();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showDefault, setShowDefault] = useState(true);
  const [booked, setBooked] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // added loading state

  const ticketsCollectionRef = collection(database, 'Tickets');

  useEffect(() => {
    // Simulating loading time
    const timer = setTimeout(() => {
      setLoading(true); // Hide the loading indicator after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Clear the timer when the component unmounts
  }, []);


  const CloseAppButton = ({  title }) => (
    <TouchableOpacity onPress={()=>{
       navigation.navigate('Details');
    }} style={styles.ProceedBtn}>
      <Text style={styles.CloseappButtonText}>
      Go Back</Text>
      <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        <Icon name="chevron-right" size={30} color="#fff"/>
        </IconComponentProvider>
    </TouchableOpacity>
  );


  const bookTicket = () => {
    try {
      const unsubscribeAuth = onAuthStateChanged(auth, async (authenticatedUser) => {
        if (authenticatedUser) {
          const userId = authenticatedUser.uid;
          const userDocRef = doc(ticketsCollectionRef, userId);
          const userDocSnapshot = await getDoc(userDocRef);
          const userDocData = userDocSnapshot.exists() ? userDocSnapshot.data() : {};
          const existingRecord = Object.values(userDocData).find(record => {
            return record.vibe === venueData.vibe && record.location === venueData.location && record.title === venueData.title;
          });
          if (existingRecord) {
            const timestamp = new Date().getTime();
            const updatedRecord = { ...existingRecord, booked: true, phoneNumber: phoneNumber }; // update the existing record by adding the 'booked' field with a value of true
            const newRecord = { [venueData.title]: updatedRecord };
            await setDoc(userDocRef, newRecord, { merge: true }).then(() => setBooked(true));
          }
        }
      });
      return unsubscribeAuth;
    } catch (err) {
      console.log(err);
    }
  }

  const SeeMapButton = ({ title }) => (
    <TouchableOpacity onPress={() => {
      navigation.navigate('Map', { item: venueData });
    }} style={styles.CloseappButtonContainer}>
      <Text style={styles.CloseappButtonText}>
        {title}
      </Text>
      <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        <Icon name="chevron-right" size={25} color="#fff" />
      </IconComponentProvider>
    </TouchableOpacity>
  );

  return (
    <View style={styles.contentContainer}>
      <HomeHeaderWhite navigation={navigation} header={'Transaction'} />
      <View style={styles.checkCard}>
       
        {!loading ? (
          <View>
          <ActivityIndicator size="large" color="#00ff00" />
          <Text style={styles.sendingTxt}>Sending Bitzza</Text>
          </View>
        ) : (
          <View style={{alignItems:"center"}}>
             <Text style={styles.sendingTxt}>Transaction Success!</Text>
          <Image
            source={require("../assets/images/checkmark.png")}
            style={{
              width: 120,
              height: 120,
              resizeMode: "cover",
              justifyContent: "center",
            }}
          />
           <CloseAppButton/>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  checkCard: {
    alignItems: "center",
    shadowColor: "#000",
    flexDirection: "column",
    backgroundColor: "#ffff",
    padding: 20,
    borderRadius: 10,
    width: "95%",
    height: 400,
    justifyContent: "center",
    marginVertical: 15,
    marginTop: 10,
    marginLeft:10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
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
  ProceedBtn: {
    elevation: 8,
    backgroundColor: "rgb(97, 23, 244)",
     flexDirection:"row",
     alignItems:"center",
  
    justifyContent:'center',
    marginTop:100,
    marginLeft:20,
    borderRadius: 15,
    width:320,
    height:65,
    paddingVertical:9,
    paddingHorizontal: 5,
  },
  sendingTxt: {
    fontSize: 20,
    fontFamily: "RalewayBold",
    marginBottom: 20,
    marginTop: 20
  }
});

export default SingleTicket;
