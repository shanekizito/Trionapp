import React from "react";
import {
  SafeAreaView,
  View,
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { assets } from "../constants";

const Onboarding = ({ navigation }) => {
  const GetStartedButton = ({ title }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("SignIn");
      }}
      style={styles.getStartedBtn}
    >
      <Text style={styles.getStartedButtonText}>Let's get started</Text>
      <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        <Icon name="chevron-right-circle-outline" size={30} color="#fff" />
      </IconComponentProvider>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
         source={require("../assets/images/background.jpg")}
        style={styles.imageBackground}
        resizeMode="cover"
      >
        {/* Overlay View */}
        <View style={styles.overlay} />

        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/mainlogo.png")}
            style={styles.logo}
          />
        </View>
        <Text style={styles.description}>TRION ENERGY</Text>
        <View style={styles.detailContainer}>
          <Text style={styles.detail}>
            Join the Journey to a Carbon-Free World
          </Text>
        </View>
        <GetStartedButton />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black overlay
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 60,
  },
  logo: {
    width: 100,
    height: 100,
  },
  description: {
    fontFamily: "Ubuntu",
    fontWeight: "bold",
    fontSize: 34,
    lineHeight: 35,
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 25,
  },
  detailContainer: {
    width: "100%",
    alignItems: "center",
  },
  detail: {
    fontFamily: "Ubuntu",
    fontSize: 25,
    lineHeight: 35,
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 70,
  },
  getStartedBtn: {
    elevation: 8,
    backgroundColor: "#3CB371", // MediumSeaGreen
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    borderRadius: 15,
    width: 320,
    height: 65,
    paddingVertical: 9,
    paddingHorizontal: 5,
  },
  getStartedButtonText: {
    fontSize: 17,
    fontFamily: "RalewayBold",
    color: "#fff",
    marginRight: 10,
    marginLeft: 10,
  },
});

export default Onboarding;
