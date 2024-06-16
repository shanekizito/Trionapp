import React, { useState } from 'react';
import { TextInput, Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native';
import { FocusedStatusBar, HomeHeaderWhite } from "../components";
import { COLORS } from "../constants";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, database } from '../config/firebase';

// Import hello image
import HelloLogo from '../assets/images/hello.png';
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
    // Assess password strength based on criteria
    if (password.length === 0) {
      return { label: "", color: "#ffffff" }; // Empty strength
    } else if (password.length < 6) {
      return { label: "Weak", color: "#FF6347" }; // Weak password
    } else if (password.length < 10) {
      return { label: "Moderate", color: "#FFA500" }; // Moderate password
    } else {
      return { label: "Strong", color: "#32CD32" }; // Strong password
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
      // Create user account with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User account created with UID:', userCredential.user.uid);

      // Save user details to Firestore
      await database.collection("users").doc(userCredential.user.uid).set({
        username: `${firstName} ${lastName}`,
        email,
        phoneNumber
      });

      // Navigate to the next screen
      navigation.navigate('PhoneNumberAuth', { user: { username: `${firstName} ${lastName}`, email, phoneNumber } });
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
      <HomeHeaderWhite navigation={navigation} header={'SIGN UP'} />
      <View style={styles.form}>
        <Text style={styles.text}>Join us now</Text>

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

        <TouchableOpacity onPress={()=>navigation.navigate('Deposit')} style={styles.appButtonContainer}>
          <Text style={styles.appButtonText}>Next</Text>
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
    backgroundColor: "#fff", // Page background remains white
  },
  form: {
    padding: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24, // Increased font size for better visibility
    fontFamily: 'RalewayBold',
    marginBottom: 12,
    color: '#2E8B57', // Environmental green
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#f0f0f0', // Lighter grey background for the input fields
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    fontFamily: 'sans-serif',
    color: 'black',
    fontSize: 16, // Increased font size for better visibility
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
    fontFamily: 'sans-serif',
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
    backgroundColor: "#3CB371", // MediumSeaGreen
    borderRadius: 10, // Matching input field border radius
    width: '90%', // Matching input field width
    padding: 15, // Matching input field padding
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appButtonText: {
    fontSize: 18, // Increased font size for better visibility
    color: "#fff",
    alignSelf: "center",
    fontFamily: 'sans-serif',
  },
  registerLink: {
    marginTop: 20,
    color: '#afafaf',
    fontSize: 15,
    fontFamily: 'sans-serif',
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
});

export default SignUp;
