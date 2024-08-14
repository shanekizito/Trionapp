import { Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Home from "./screens/Home";
//import Details from "./screens/Details";
import Card from "./screens/Card";
import Profile from "./screens/Profile";
import Summary from "./screens/Summary";
import Ticket from "./screens/Ticket";
import PhoneNumberAuth from './screens/PhoneNumberAuth';
import OTP from './screens/Otp';
import SingleTicket from './screens/SingleTicket';
import Venue from "./screens/Venue";
import Preferences from "./screens/Preferences";
import Notification from './screens/Notification';
import SignUp from './screens/SignUp';
import Diet from './screens/Diet';
import Buy from './screens/Buy';
import Deposit from './screens/Deposit';
import PaymentPage from './screens/Payment';
import Verify from './screens/Verify';
import Booked from './screens/Booked';
import SignIn from './screens/SignIn';
import Car from './screens/Car';
import MainMenu from './screens/MainMenu';
import PaymentMethod from './screens/PaymentMethod';
import Onboarding from './screens/Onboarding';
import { useFonts } from 'expo-font';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { BaseButton, GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ref, getDownloadURL } from "firebase/storage";
import { firebaseConfig } from './config/firebase';
import { auth } from './config/firebase';
import { storage } from './config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useState, useEffect } from "react";
import { mdiUbuntu } from '@mdi/js';

const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const [initial, setInitial] = useState('');
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [firstLaunch, setFirstLaunch] = useState(null);

  useEffect(() => {
    getDownloadURL(ref(storage, 'images/hero.jpg'))
      .then((url) => {
        console.log(url);
      }).catch((err) => {
        console.log(err)
      });

    const unsubscribeAuth = onAuthStateChanged(
      auth, async authenticatedUser => {
        if (authenticatedUser) {
          setUser(authenticatedUser);
          setInitial(authenticatedUser.email.charAt(0));
        }
      }
    );

    return unsubscribeAuth;
  }, [1]);

  useEffect(() => {
    async function setData() {
      const appData = await AsyncStorage.getItem("appLaunched");
      if (appData == null) {
        setFirstLaunch(true);
        AsyncStorage.setItem("appLaunched", "false");
      } else {
        setFirstLaunch(false);
      }
    }
    setData();
  }, []);

  const Screens = () => {
    return (
      <Stack.Navigator
        initialRouteName="Onboarding"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Payment' component={PaymentPage} />
        <Stack.Screen name='Summary' component={Summary} />
        <Stack.Screen name='OTP' component={OTP} />
        <Stack.Screen name='Car' component={Car} />
        <Stack.Screen name='PaymentMethod' component={PaymentMethod} />
        <Stack.Screen name='Profile' component={Profile} />
        <Stack.Screen name='Diet' component={Diet} />
        <Stack.Screen name='Venue' component={Venue} />
       <Stack.Screen name='MainMenu' component={MainMenu} />
        <Stack.Screen name='Buy' component={Buy} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='Card' component={Card} />
        <Stack.Screen name='Verify' component={Verify} />
        <Stack.Screen name='PhoneNumberAuth' component={PhoneNumberAuth} />
        <Stack.Screen name='SignIn' component={SignIn} />
        <Stack.Screen name='Onboarding' component={Onboarding} />
        <Stack.Screen name='Deposit' component={Deposit} />
        <Stack.Screen name='Preferences' component={Preferences} />
      </Stack.Navigator>
    );
  }

  const [loaded] = useFonts({
    RalewayRegular: require('./assets/fonts/Raleway-Regular.ttf'),
    RalewayBold: require('./assets/fonts/Raleway-Bold.ttf'),
    UbuntuBold: require('./assets/fonts/Ubuntu-Bold.ttf'),
    Ubuntu: require('./assets/fonts/Ubuntu-Light.ttf'),
    ChakraBold:require('./assets/fonts/Blinker-Bold.ttf'),
    ChakraRegular:require('./assets/fonts/Blinker-Regular.ttf'),
    BlinkerLight:require('./assets/fonts/Blinker-Light.ttf'),
    ChakraRegular:require('./assets/fonts/ChakraPetch-Regular.ttf'),
    ChakraBold:require('./assets/fonts/ChakraPetch-Bold.ttf'),

  });

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <NavigationContainer>
          <Screens />
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default App;
