import React, { useState } from 'react';
import { TextInput, Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native';
import { FocusedStatusBar } from "../components";
import { COLORS } from "../constants";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore"; 
import { auth, database } from '../config/firebase';

import EyeIcon from '../assets/images/eye.png'; // Import eye icon

const SignUp = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    label: "Weak",
    color: "#FF6347", // Default color for weak password
  });

  const handlePasswordChange = (password) => {
    setPassword(password);
    const strength = assessPasswordStrength(password);
    setPasswordStrength(strength);
  };

  const assessPasswordStrength = (password) => {
    if (password.length === 0) {
      return { label: "", color: "#ffffff" };
    } else if (password.length < 6) {
      return { label: "Weak", color: "#FF6347" };
    } else if (password.length < 10) {
      return { label: "Moderate", color: "#FFA500" };
    } else {
      return { label: "Strong", color: "#32CD32" };
    }
  };

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword) {
      Alert.alert("Sign Up Error", "All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Sign Up Error", "Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User account created with UID:', userCredential.user.uid);

      await setDoc(doc(database, "users", userCredential.user.uid), {
        username: `${firstName} ${lastName}`,
        email,
        phoneNumber
      });

      navigation.navigate('MainMenu', { firstname: `${firstName}`,secondname: `${lastName}`, email, phoneNumber });
    } catch (error) {
      console.log('Error creating user account:', error.message);
      Alert.alert("Signup Error", error.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <View style={styles.form}>
    
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/mainlogo.png")}
            style={styles.logo}
          />
        </View>
        <Text style={styles.description}>TRION ENERGY</Text>
        <View style={styles.detailContainer}></View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder={'First Name'}
            placeholderTextColor={'#929292'}
            value={firstName}
            style={styles.input}
            onChangeText={(text) => setFirstName(text)}
          />
          <TextInput
            placeholder={'Last Name'}
            placeholderTextColor={'#929292'}
            value={lastName}
            style={styles.input}
            onChangeText={(text) => setLastName(text)}
          />
          <TextInput
            placeholder={'Email'}
            placeholderTextColor={'#929292'}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholderTextColor={'#929292'}
            value={phoneNumber}
            placeholder={!phoneNumber ? '+254' : 'Phone Number'}
            maxLength={13}
            onChangeText={(text) => setPhoneNumber(text)}
            style={styles.input}
          />
          <View style={[styles.passwordInputContainer, { borderColor: passwordStrength.color }]}>
            <TextInput
              placeholder={'Password'}
              style={styles.passwordInput}
              placeholderTextColor={'#929292'}
              secureTextEntry={!showPassword}
              onChangeText={handlePasswordChange}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIconContainer}>
              <Image source={EyeIcon} style={styles.eyeIcon} />
            </TouchableOpacity>
          </View>
          <TextInput
            placeholder={'Confirm Password'}
            style={styles.input}
            placeholderTextColor={'#929292'}
            secureTextEntry={!showPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <View style={styles.passwordStrengthBar}>
            <View style={[styles.strengthBar, { backgroundColor: passwordStrength.color }]} />
            <Text style={[styles.passwordStrengthLabel, { color: passwordStrength.color }]}>
              {passwordStrength.label}
            </Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleSignUp} style={styles.appButtonContainer}>
          <Text style={styles.appButtonText}>Create account</Text>
        </TouchableOpacity>

        <View style={styles.registerLink}>
          <Text style={{ color: "#929292" }}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn', { name: 'Jane' })}>
            <Text style={styles.registerButton}>Login</Text>
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
    padding: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
   
  },
  logo: {
    width: 90, // Adjust the size as needed
    height: 100, // Adjust the size as needed
    resizeMode: 'contain',
  },
  text: {
    fontSize: 40,
    fontFamily: 'ChakraBold',
    marginTop: 20,
    marginBottom:15,
    color: '#2E8B57',
  },
  description: {
    fontFamily: "ChakraBold",
    fontSize: 30,
    lineHeight: 35,
    color: '#2E8B57',
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  detailContainer: {
    width: "100%",
    alignItems: "center",
  },
  detail: {
    fontFamily: "ChakraBold",
    fontSize: 25,
    lineHeight: 35,
    color: '#000',
    textAlign: "center",
    marginTop: 10,
    marginBottom: 70,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    fontFamily: 'ChakraRegular',
    color: 'black',
    fontSize: 16,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'ChakraRegular',
    color: 'black',
  },
  eyeIconContainer: {
    padding: 10,
  },
  eyeIcon: {
    width: 24,
    height: 24,
  },
  passwordStrengthBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  strengthBar: {
    height: 8,
    flex: 1,
    borderRadius: 5,
    marginRight: 5,
  },
  passwordStrengthLabel: {
    fontSize: 12,
    fontFamily: 'sans-serif',
  },
  appButtonContainer: {
    backgroundColor: "#2ecc71",
    borderRadius: 10,
    width: '90%',
    padding: 15,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appButtonText: {
    fontSize: 20,
    color: "#fff",
    alignSelf: "center",
    fontFamily: 'ChakraBold',
  },
  registerLink: {
    marginTop: 20,
    color: '#afafaf',
    fontSize: 15,
    fontFamily: 'ChakraRegular',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerButton: {
    color: '#000',
    fontFamily: 'ChakraBold',
    marginLeft: 8,
    fontSize: 20,
  },
});

export default SignUp;
