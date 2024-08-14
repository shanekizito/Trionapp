import React, { useRef, useCallback, useMemo } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

const Onboarding = ({ navigation }) => {

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['35%']);

  const GetStartedButton = () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Card");
      }}
      style={styles.getStartedBtn}
    >
      <Text style={styles.getStartedButtonText}>Let's get started</Text>
    </TouchableOpacity>
  );

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <ImageBackground
     style={styles.container}
     source={require("../assets/images/haze.png")}>
      <Text style={styles.description}>TRION ENERGY</Text>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/haze.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.minidescriptionContainer}>
          <Text style={styles.minidescription}>
            Reduce Carbon Footprint
          </Text>
          <Text style={[styles.minidescription, { color: "#7ADB78" }]}>
            Earn Carbon Credits
          </Text>
          <Text style={[styles.minidescription, { color: "#7ADB78" }]}>
            Make An Impactrrr
          </Text>
        </View>
      </View>
      <GetStartedButton />/
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000A13",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: hp('3%'),
    marginBottom: hp('5%'),
    backgroundColor: "#7ADB78",
    borderRadius: wp('21.5%'),
    padding: wp('3.75%'),
    paddingVertical: wp('7.75%'),
  },
  logo: {
    width: wp('45%'),
    height: wp('45%'),
  },
  description: {
    fontFamily: "ChakraBold",
    fontSize: wp('8%'),
    lineHeight: wp('8.75%'),
    color: "#fff",
    textAlign: "center",
    marginTop: hp('10%'),
    marginBottom: hp('5%'),
    width: wp('80%'),
  },
  textContainer: {
    width: wp('80%'),
  },
  minidescriptionContainer: {
    alignItems: "center",
    marginVertical: hp('2%'),
  },
  minidescription: {
    fontFamily: "ChakraRegular",
    fontSize: wp('6%'),
    lineHeight: wp('6%'),
    color: "#fff",
    textAlign: "left",
    marginVertical: hp('1.5%'),
  },
  getStartedBtn: {
    backgroundColor: "#2ecc71",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: wp('5%'),
    width: wp('80%'),
    height: hp('8%'),
    marginTop: hp('5%'),
  },
  getStartedButtonText: {
    fontSize: wp('6%'),
    fontFamily: "ChakraRegular",
    fontWeight: "600",
    color: "#fff",
  },
});

export default Onboarding;
