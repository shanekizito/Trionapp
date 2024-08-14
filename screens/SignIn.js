import React, { useState, useEffect } from 'react';
import { Alert, TextInput, Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { FocusedStatusBar, HomeHeaderWhite } from "../components";
import { COLORS } from "../constants";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from '../config/firebase';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

// Import logo images
import GoogleLogo from '../assets/google-logo.png';
import FacebookLogo from '../assets/facebook-logo.png';
import TwitterLogo from '../assets/twitter.png';
import HelloLogo from '../assets/images/hello.png';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '596897853249-4qnna0rccca63m6pcumae75jh8mmulbu.apps.googleusercontent.com',
    });
  }, []);

  const handleSignIn = async () => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in with UID:', user.uid);
      navigation.navigate('MainMenu', { person: user });
    } catch (error) {
      console.log('Error signing in:', error.message);
      Alert.alert('Sign In Error', error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const googleCredential = GoogleAuthProvider.credential(userInfo.idToken);
      const userCredential = await signInWithCredential(auth, googleCredential);
      console.log('User signed in with Google:', userCredential.user.uid);
      navigation.navigate('MainMenu', { person: userCredential.user });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services not available or outdated');
      } else {
        console.log('Error signing in with Google:', error.message);
        Alert.alert('Google Sign In Error', error.message);
      }
    }
  };

  const handleFacebookSignIn = async () => {
    // Your existing code for Facebook sign in
  };

  const handleTwitterSignIn = async () => {
    // Your existing code for Twitter sign in
  };

  return (
    <SafeAreaView style={styles.container}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <View style={styles.form}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.textGreetings}>Hi!</Text>
        </View>
        <Text style={styles.text}>Welcome</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={'Email'}
            placeholderTextColor={'grey'}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder={'Password'}
            placeholderTextColor={'grey'}
            style={styles.input}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <TouchableOpacity onPress={handleSignIn} style={styles.appButtonContainer}>
          <Text style={styles.appButtonText}>Log In</Text>
        </TouchableOpacity>

        <View style={styles.continueWith}>
          <Text style={styles.continueWithText}>-or continue with-</Text>
        </View>

        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity onPress={handleGoogleSignIn} style={styles.socialButton}>
            <Image source={GoogleLogo} style={styles.logo} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFacebookSignIn} style={styles.socialButton}>
            <Image source={FacebookLogo} style={styles.logo} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleTwitterSignIn} style={styles.socialButton}>
            <Image source={TwitterLogo} style={styles.logo} />
          </TouchableOpacity>
        </View>

        <View style={styles.registerLink}>
          <Text style={{ color: "#929292" }}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.registerButton}>Create one</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  form: {
    padding: wp('5%'),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
    alignSelf: 'flex-start',
  },
  helloLogo: {
    width: wp('20%'),
    height: wp('20%'),
    marginLeft: wp('3%'),
  },
  textGreetings: {
    fontSize: wp('15%'),
    fontFamily: 'ChakraBold',
    color: '#2E8B57',
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: wp('15%'),
    fontFamily: 'ChakraBold',
    color: '#2E8B57',
    marginBottom: hp('3%'),
    alignSelf: 'flex-start',
  },
  inputContainer: {
    width: '100%',
    marginBottom: hp('4%'),
    marginTop: hp('5%'),
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: wp('5%'),
    padding: hp('2%'),
    marginVertical: hp('1.5%'),
    fontFamily: 'ChakraRegular',
    color: 'black',
    fontSize: wp('4%'),
    width: '100%',
  },
  appButtonContainer: {
    backgroundColor: "#2ecc71",
    borderRadius: wp('5%'),
    width: wp('90%'),
    padding: hp('2%'),
    marginTop: hp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  appButtonText: {
    fontSize: wp('5%'),
    color: "#fff",
    alignSelf: "center",
    fontFamily: 'ChakraBold',
  },
  registerLink: {
    marginTop: hp('3%'),
    color: '#afafaf',
    fontSize: wp('4%'),
    fontFamily: 'ChakraRegular',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButton: {
    color: '#000',
    fontFamily: 'ChakraBold',
    marginLeft: wp('2%'),
    fontSize: wp('4%'),
  },
  logo: {
    width: wp('8%'),
    height: wp('8%'),
  },
  continueWith: {
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueWithText: {
    color: '#929292',
    fontSize: wp('3.5%'),
    fontFamily: 'sans-serif',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  socialButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: wp('5%'),
    width: wp('12%'),
    height: wp('12%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp('3%'),
  }
});

export default SignIn;
