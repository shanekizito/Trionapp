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
import HomeHeaderWhite from "../components/HomeHeaderWhite";

const IMG =
  "https://cdn.uc.assets.prezly.com/8f4a921a-814e-4032-9b87-77ff8e40323c/-/preview/1200x1200/-/format/auto/";

const Deposit = ({ navigation }) => {
  const CloseAppButton = ({ title }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Card");
      }}
      style={styles.proceedBtn}
    >
      <Text style={styles.closeAppButtonText}>Let's get started</Text>
      <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        <Icon name="chevron-right-circle-outline" size={30} color="#fff" />
      </IconComponentProvider>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require("../assets/images/background.jpg")}
      style={styles.imageBackground}
    >
       <HomeHeaderWhite navigation={navigation} header={'Buy Page'} />
      <SafeAreaView style={styles.container}>
       

        {/* Overlay View */}
        <View style={styles.overlay} />

        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/mainlogo.png")}
              style={styles.logo}
            />
          </View>
          <Text style={styles.description}>TRION ENERGY</Text>
          <View style={styles.detailContainer}>
            <Text style={styles.detail}>Calculate your footprint</Text>
          </View>
          <CloseAppButton />
        </View>
      </SafeAreaView>
    </ImageBackground>
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
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 34,
    fontWeight: "bold",
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
  proceedBtn: {
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
  closeAppButtonText: {
    fontSize: 17,
    fontFamily: "RalewayBold",
    color: "#fff",
    marginRight: 10,
    marginLeft: 10,
  },
});

export default Deposit;
