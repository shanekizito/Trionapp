
import {  FocusedStatusBar, HomeHeader } from "../components";
import { COLORS, NFTData ,assets} from "../constants";
import Home from './Home';
import { ButtonContainer, ButtonText } from "./styles";
import React, {  useState, useEffect,useRef } from "react";
import { Text, View, StyleSheet, TextInput,Image, Button, Keyboard , Alert, ActivityIndicator,Pressable ,TouchableOpacity ,SafeAreaView} from 'react-native';
import * as FirebaseRecaptcha from 'expo-firebase-recaptcha';
import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import OTPInput from "./OTPInput";
import { firebaseConfig } from '../config/firebase';

import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot
} from 'firebase/firestore';

import { auth, database } from '../config/firebase';


// Add your Firebase >=9.x.x config here
// https://firebase.google.com/docs/web/setup

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration




const PhoneNumberAuth = ({navigation,route}) => {

  const [phoneNumber, setPhoneNumber] = useState("");
  const recaptchaVerifier = useRef(null);
  const [otpCode, setOTPCode] = useState("");
  const [isPinReady, setIsPinReady] = useState(false);
  const [verificationId, setVerificationId] = useState(null);
  const [credential,setCredential]=React.useState("");
  const [verifyError, setVerifyError] = useState();
  const [verifyInProgress, setVerifyInProgress] = useState(false);
  const [codeSent,setCodeSent] = useState(false);
  const isConfigValid = !!firebaseConfig.apiKey;
  const [userData,setUserData]=useState({});
  const [verificationCode, setVerificationCode] = useState(otpCode);
  const [confirmError, setConfirmError] = React.useState(null);
  const [confirmInProgress, setConfirmInProgress] =useState(false);
  const maximumCodeLength = 6;
  const collectionRef = collection(database, 'users');



  
  useEffect(() => {
    setUserData(route.params.user)
    console.log(userData);
    setPhoneNumber(route.params.user.phoneNumber);
   },[])



  const AppButton = ({  title }) => (
    <TouchableOpacity onPress={() =>
      navigation.navigate('Verify',{contact:phoneNumber })
    } style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>
      {title}</Text>
    </TouchableOpacity>
  );



  return (
    
        <SafeAreaView style={styles.container}>
        <HomeHeader/>
      <View style={styles.form}>
      <Image
          source={assets.otp}
          resizeMode="contain"
          style={{ width: '60%',marginLeft:20 ,height:100}}
        />

      <Text style={styles.text}>OTP Verification</Text>
     
      
        <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={true }
      />
       {!codeSent ? (
       <View style={{width:"100%",display:"flex",alignItems:"center",justifyContent:"center"}}>
       <Text style={styles.info}>We will send a one time password on this mobile number {phoneNumber}</Text>
       
       
   
      
      <TouchableOpacity style={styles.appButtonContainer}
        disabled={!phoneNumber}
        onPress={async () => {
          const phoneProvider = new PhoneAuthProvider(auth);
           try {
            setVerifyError(undefined);
            setVerifyInProgress(true);
            setVerificationId('');
            const verificationId = await phoneProvider.verifyPhoneNumber(
              phoneNumber,
              recaptchaVerifier.current
            );
            setVerifyInProgress(false);
            setVerificationId(verificationId);
            setCodeSent(true);
          } catch (err) {
            setVerifyError(err);
            setVerifyInProgress(false);
          }
        }}>


   <Text style={styles.appButtonText}>
      GET OTP</Text> 
      </TouchableOpacity>
      {verifyError && <Text style={styles.error}>{`${verifyError} please use a valid format`}</Text>}
      {verifyInProgress && <ActivityIndicator style={styles.loader} />}
      {verificationId ? (
        <Text style={styles.success}>A verification code has been sent to your phone</Text>
      ) : undefined}
      </View>

      ):(
      <View>
     <Text style={styles.info}>Enter the OTP sent to  {phoneNumber}</Text>
     <View style={styles.content}>
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
       
        onPress={async () => { 
           try {
              setConfirmError(undefined);
              setConfirmInProgress(true);
              const credential = PhoneAuthProvider.credential(verificationId, otpCode);
              console.log('yert')
              setConfirmInProgress(false);
              setVerificationId('');
              setVerificationCode('');
              await signInWithCredential(auth, credential).then(()=>{
                addDoc(collectionRef,{
                  //username:userData.username,
                 // email:userData.email,
                  phoneNumber:phoneNumber,   
               }).then(()=>{
                Alert.alert('Phone authentication successful!')
                setTimeout(()=>{
                  navigation.navigate('Home', { name: 'Jane' })
                }, 1000)});
              }
              ).catch((e)=>{
              console.log(e);
              })
              inputRef.current?.clear();
          } catch (err) {
            setConfirmError(err);
            setConfirmInProgress(false);
          }
        }}><Text style={styles.appButtonText}>Verify & Proceed</Text>
          
          </TouchableOpacity>

      {confirmInProgress && <ActivityIndicator style={styles.loader} />}
      </View>
     {!isConfigValid && (
      <View style={styles.overlay} pointerEvents="none">
        <Text style={styles.overlayText}>
          To get started, set a valid firebaseConfig in App.js.
        </Text>
      </View>
    )}
     
      </View>)}
        
       
      
       
  
        
      </View>
        
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({


  container: {
      flex: 1,
      width:"100%",
      
  },
  form:{
      padding:20,
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      justifyContent:"center",

      shadowColor: '#000',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
      width:'98%',
      
       


  },
  text:{
      fontSize: 25,
      fontFamily: 'RalewayBold',
       marginBottom:12,
  },
  input: {
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
  mobileNumberContainer:{
  
 width:"100%",

  },
  appButtonContainer:{
    backgroundColor:"#fc9e3b",
      color:'#fff',
      marginTop:50,
      borderRadius: 25,
      width:'100%',
      height:45,
      paddingVertical:9,
      paddingHorizontal: 5,
  },
  appButtonText:{
      fontSize: 17,
      color: "#fff",
      alignSelf: "center",
      fontFamily: 'RalewayRegular'
  },
  registerLink:{
   marginTop:30,
   marginLeft:25,
   color:'#afafaf',
   fontSize:15,
   fontFamily: 'sans-serif',
   flexDirection:'row',
   justifyContent:'flex-start',
   alignItems:'center'

  },
  registerButton:{
      color:'#000',
      fontFamily: 'RalewayBold',
      marginLeft:8,
      
  },
  prefix:{
    marginTop:50,
   
   fontWeight:"bold",
    fontSize:15,
    color:'gray',
  },
  info:{
    marginTop:10,
    fontSize:15,
    color:'gray',
    textAlign: "center",

  }
});

export default PhoneNumberAuth;