 


import OTPInput from "./OTPInput";
import { ButtonContainer, ButtonText } from "./styles";
import React, {  useState, useEffect,useRef } from "react";
import { Text, View, StyleSheet, Image, Button, Keyboard , Alert, ActivityIndicator,Pressable ,TouchableOpacity } from 'react-native';
import * as FirebaseRecaptcha from 'expo-firebase-recaptcha';
import { initializeApp, getApp } from 'firebase/app';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { COLORS, NFTData ,assets} from "../constants";
import { getFirestore } from 'firebase/firestore';
import { HomeHeaderWhite} from "../components";


// Add your Firebase >=9.x.x config here
// https://firebase.google.com/docs/web/setup




export default function Verify({ route, navigation }) {
  const [otpCode, setOTPCode] = useState("");
  const [isPinReady, setIsPinReady] = useState(false);
  const maximumCodeLength = 6;
  const recaptchaVerifier = useRef(null);
  const [credential,setCredential]=React.useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationId, setVerificationId] = useState('');
  const [verifyError, setVerifyError] = useState();
  const [verifyInProgress, setVerifyInProgress] = useState(false);
  const [verificationCode, setVerificationCode] = useState(otpCode);
  const [confirmError, setConfirmError] = React.useState(null);
  const [confirmInProgress, setConfirmInProgress] =useState(false);
  const isConfigValid = !!FIREBASE_CONFIG.apiKey;
  const [userData,setUserData] = useState({});

   


  useEffect(() => {
   setVerificationCode(otpCode)
   setUserData(route.params)
   setPhoneNumber(route.params.contact)
   setVerificationId(route.params.verificationId)
  });


  return (

    <View style={styles.screen}>
       <HomeHeaderWhite/>
       <View style={styles.container}>
        <Image source={assets.otp}
               resizeMode="contain" 
                style={{ width: '60%',marginLeft:20 ,height:100}}/>

       <Text style={styles.title}>OTP verification</Text>
    <View>
    <Text style={styles.info}>Enter the OTP sent to  {route.params.contact}</Text>
    <View style={styles.content}>``
      <Pressable style={styles.container1} onPress={Keyboard.dismiss}>
        <OTPInput
          code={otpCode}
          setCode={setOTPCode}
          maximumLength={maximumCodeLength}
          setIsPinReady={setIsPinReady}  
        />
      </Pressable>
      <TouchableOpacity
        style={styles.appButtonContainer}
        disabled={!verificationCode}
        onPress={async () => { 
           try {
              setConfirmError(undefined);
              setConfirmInProgress(true);
              const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
              setCredential(credential);
              const authResult = await signInWithCredential(auth, credential);
              setConfirmInProgress(false);
              setVerificationId('');
              setVerificationCode('');
               signInWithCredential(auth, credential);
               Alert.alert('Phone authentication successful!');
          } catch (err) {
            setConfirmError(err);
            setConfirmInProgress(false);
          }
        }}>
          <Text style={styles.appButtonText}>Verify & Proceed</Text>
      </TouchableOpacity>

      { confirmInProgress && <ActivityIndicator style={styles.loader} /> }

    </View>
    {!isConfigValid && (
      <View style={styles.overlay} pointerEvents="none">
        <Text style={styles.overlayText}>
          To get started, set a valid firebaseConfig in App.js.
        </Text>
      </View>
    )}
    </View>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{
    flex: 1,
  },
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent:'center'
  },

  container1: {
    marginTop:30,
  },
  content: {
    marginTop: 50,
    width:'100%',
  },
  appButtonText:{
    fontSize: 17,
    color: "#fff",
    alignSelf: "center",
    fontFamily: 'RalewayRegular'
  },
  appButtonContainer:{
    backgroundColor: "#000",
    color:'#fff',
    marginTop:50,
    borderRadius: 25,
    width:'100%',
    height:45,
    paddingVertical:9,
    paddingHorizontal: 5,
},
  hiddenInput: {
    width: "300px",
    borderColor: "#e5e5e5",
    borderWidth: "1px",
    borderRadius: "5px",
    padding: 15
  },
  SplitOTPBoxesContainer:{
    width: "80%",
    flexDirection: "row",
    justifyContent:"space-evenly"
  },
  splitBoxes: {
    borderColor: "#e5e5e5",
    borderWidth: "2px",
    borderRadius: "5px",
    padding: "12px",
    minWidth: "50px"
  },

  splitBoxesFocused:{
    borderColor: "#ecdbba",
    borderWidth: "2px",
    borderRadius: "5px",
    padding: "12px",
    minWidth: "50px",
    backgroundColor:"grey"
  },
  title: {
    marginBottom: 2,
    fontSize: 29,
    fontWeight: 'bold',
    color: "#5d5f60",

  },
  subtitle: {
    marginBottom: 10,
    opacity: 0.35,
    fontWeight: 'bold',
  },
  text: {
    marginTop: 30,
    marginBottom: 4,
  },
  textInput: {
    marginBottom: 8,
    fontSize: 17,
    fontWeight: 'bold',
  },
  error: {
    marginTop: 10,
    fontWeight: 'bold',
    color: 'red',
  },
  success: {
    marginTop: 10,
    fontWeight: 'bold',
    color: 'blue',
  },
  loader: {
    marginTop: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#FFFFFFC0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
   
  },
  inputContainer: {
    width:"100%",
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom:10,
    padding:5
   
  },
  prefix: {
    paddingHorizontal: 5,
    marginBottom: 8,
    fontSize: 17,
    fontWeight: 'bold',
    marginRight:10,
   
    padding:5,
    borderRadius:5,
    

   
    
  },
  info:{
    marginTop:20,
    fontSize:15,
    color:'gray',
    textAlign: "center",

  }
});