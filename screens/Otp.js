import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert, Pressable } from 'react-native';

import { getAuth, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import OTPInput from './OTPInput';
import { firebaseConfig } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { auth, database } from '../config/firebase';

const OTP = ({ navigation, route }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOTPCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [verifyError, setVerifyError] = useState(null);
  const [verifyInProgress, setVerifyInProgress] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [confirmError, setConfirmError] = useState(null);
  const [confirmInProgress, setConfirmInProgress] = useState(false);
  const [isConfigValid, setIsConfigValid] = useState(false);
  const recaptchaVerifier = useRef(null);
  const collectionRef = collection(database, 'users');

  useEffect(() => {
    setIsConfigValid(!!firebaseConfig.apiKey);
   

    setPhoneNumber(route.params.user.phoneNumber);
  }, []);

  const handleSendOTP = async () => {
    try {
      setVerifyError(null);
      setVerifyInProgress(true);
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      setVerifyInProgress(false);
      setVerificationId(verificationId);
      setCodeSent(true);
      Alert.alert('OTP Sent', 'A verification code has been sent to your phone.');
    } catch (error) {
      setVerifyError(error.message);
      setVerifyInProgress(false);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setConfirmError(null);
      setConfirmInProgress(true);
      const credential = PhoneAuthProvider.credential(verificationId, otpCode);
      await signInWithCredential(auth, credential);
      await addDoc(collectionRef, { phoneNumber });
      setConfirmInProgress(false);
      Alert.alert('Phone authentication successful!');
      setTimeout(() => {
        navigation.navigate('Home', { name: 'Jane' });
      }, 1000);
    } catch (error) {
      setConfirmError(error.message);
      setConfirmInProgress(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Image
          source={require('../assets/images/otp.png')}
          resizeMode="contain"
          style={{ width: '60%', marginLeft: 20, height: 100 }}
        />
        <Text style={styles.text}>OTP Verification</Text>
       
        {!codeSent ? (
          <View style={styles.infoContainer}>
            <Text style={styles.info}>We will send a one-time password to</Text>
            <Text style={styles.phoneNumber}>{phoneNumber}</Text>
            <TouchableOpacity
              style={styles.appButtonContainer}
              disabled={!phoneNumber}
              onPress={handleSendOTP}
            >
              <Text style={styles.appButtonText}>GET OTP</Text>
            </TouchableOpacity>
            {verifyError && <Text style={styles.error}>{verifyError}</Text>}
            {verifyInProgress && <ActivityIndicator style={styles.loader} />}
          </View>
        ) : (
          <View>
            <Text style={styles.info}>Enter the OTP sent to</Text>
            <Text style={styles.phoneNumber}>{phoneNumber}</Text>
            <OTPInput
              code={otpCode}
              setCode={setOTPCode}
              maximumLength={6}
              setIsPinReady={() => {}}
            />
            <TouchableOpacity
              style={styles.appButtonContainer}
              onPress={handleVerifyOTP}
            >
              <Text style={styles.appButtonText}>Verify & Proceed</Text>
            </TouchableOpacity>
            {confirmError && <Text style={styles.error}>{confirmError}</Text>}
            {confirmInProgress && <ActivityIndicator style={styles.loader} />}
          </View>
        )}
        {!isConfigValid && (
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>
              To get started, set a valid firebaseConfig in App.js.
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  form: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: '98%',
  },
  text: {
    fontSize: 25,
    fontFamily: 'RalewayBold',
    marginBottom: 12,
  },
  infoContainer: {
    width: '100%',
    alignItems: 'center',
  },
  info: {
    fontSize: 15,
    color: 'gray',
    textAlign: 'center',
  },
  phoneNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  appButtonContainer: {
    backgroundColor: '#fc9e3b',
    color: '#fff',
    marginTop: 20,
    borderRadius: 25,
    width: '100%',
    height: 45,
    paddingVertical: 9,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appButtonText: {
    fontSize: 17,
    color: '#fff',
    alignSelf: 'center',
    fontFamily: 'RalewayRegular',
  },
  error: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  loader: {
    marginTop: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default OTP;
