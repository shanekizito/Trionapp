import React, { useState } from 'react';
import { Alert, TextInput, Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { FocusedStatusBar, HomeHeaderWhite } from "../components";
import { COLORS } from "../constants";
import { signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../config/firebase';

// Import logo images
import GoogleLogo from '../assets/google-logo.png';
import FacebookLogo from '../assets/facebook-logo.png';
import TwitterLogo from '../assets/twitter.png';
import HelloLogo from '../assets/images/hello.png'; // Import hello image

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    // Your existing code for email/password sign in
  };

  const handleGoogleSignIn = async () => {
    // Your existing code for Google sign in
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
      <HomeHeaderWhite navigation={navigation} header={'SIGN IN'} />
      <View style={styles.form}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.text}>Welcome back</Text>
          <Image source={HelloLogo} style={styles.helloLogo} />
        </View>

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
          <Text style={styles.appButtonText}>Sign in</Text>
        </TouchableOpacity>

        <View style={styles.continueWith}>
          <Text style={styles.continueWithText}>-or continue with</Text>
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
          <TouchableOpacity onPress={() => navigation.navigate('SignUp', { name: 'Jane' })}>
            <Text style={styles.registerButton}>create one</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Page background remains white
  },
  form: {
    padding: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  helloLogo: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  text: {
    fontSize: 24, // Increased font size for better visibility
    fontFamily: 'RalewayBold',
    color: '#2E8B57', // Environmental green
  },
  inputContainer: {
    borderRadius: 10,
    padding: 20,
    width: '90%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f0f0f0', // Lighter grey background for the input fields
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    fontFamily: 'RalewayRegular',
    color: 'black',
    fontSize: 16, // Increased font size for better visibility
  },
  appButtonContainer: {
    backgroundColor: "#3CB371", // MediumSeaGreen
    borderRadius: 10, // Matching input field border radius
    width: '90%', // Matching input field width
    padding: 15, // Matching input field padding
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appButtonText: {
    fontSize: 18, // Increased font size for better visibility
    color: "#fff",
    alignSelf: "center",
    fontFamily: 'RalewayRegular',
  },
  registerLink: {
    marginTop: 20,
    color: '#afafaf',
    fontSize: 15,
    fontFamily: 'RalewayRegular',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButton: {
    color: '#000',
    fontFamily: 'RalewayBold',
    marginLeft: 8,
    fontSize: 16, // Increased font size for better visibility
  },
  logo: {
    width: 30,
    height: 30,
  },
  continueWith: {
    marginTop: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueWithText: {
    color: '#929292',
    fontSize: 16,
    fontFamily: 'RalewayRegular',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  socialButton: {
    backgroundColor: '#f0f0f0', // Faint grey background for the social buttons
    borderRadius: 10, // Square shape with rounded corners
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  }
});

export default SignIn;
