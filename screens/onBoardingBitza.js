import { FocusedStatusBar, HomeHeader } from "../components";
import { COLORS, NFTData, assets } from "../constants";
import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const IMG =
  "https://cdn.uc.assets.prezly.com/8f4a921a-814e-4032-9b87-77ff8e40323c/-/preview/1200x1200/-/format/auto/";

const Onboarding = ({ navigation }) => {
  const CloseAppButton = ({ title }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("SignIn");
      }}
      style={styles.ProceedBtn}
    >
      <Text style={styles.CloseappButtonText}>Let's get started</Text>
      <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        <Icon name="chevron-right" size={30} color="#fff" />
      </IconComponentProvider>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={require("../assets/images/gradient.png")}>
        <View style={styles.card}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../assets/images/altLogo.png")}
              style={{ width: 70, height: 70, marginTop: 60, marginLeft: 60 }}
            />
          </View>
        </View>
        <Text style={styles.description}>BITZZA COIN</Text>
        <View style={{width:"100%"}}>
          
          <Text style={styles.detail}>The safe way to purchase Pitzza</Text>
        </View>

        <CloseAppButton />
        <View style={styles.cardBottom}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../assets/images/wallet.png")}
              style={{ width: 70, height: 70, marginTop: 50 }}
            />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#D15837",
  },
  card: {
    flexDirection: "column",
    backgroundColor: "#D74826",
    width: 200,
    height: 180,
    marginLeft: -70,
    marginTop: -39,
    transform: [{ rotate: "380deg" }],
    shadowColor: "#000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,

    elevation: 3,
  },
  cardBottom: {
    flexDirection: "column",
    backgroundColor: "#D74826",
    width: 200,
    height: 150,
    marginLeft: "60%",
    marginTop: "38%",
    transform: [{ rotate: "120deg" }],
    shadowColor: "#000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    elevation: 3,
  },

  flatList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: 600,
  },

  description: {
    fontFamily: "Ubuntu",
    fontSize: 34,
    lineHeight: 35,
    color: "#ffff",
    marginLeft: "30%",
    marginTop: 10,
    marginBottom: 25,
  },
  detail:{
    fontFamily: "Ubuntu",
    fontSize: 25,
    lineHeight: 35,
    color: "#ffff",
    marginLeft: 10,
    marginTop: 120,
    marginBottom: 70,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  ProceedBtn: {
    elevation: 8,
    backgroundColor: "#D74826",
    flexDirection: "row",
    alignItems: "center",

    justifyContent: "center",
    marginTop: 20,
    marginLeft: 20,
    borderRadius: 15,
    width: 320,
    height: 65,
    paddingVertical: 9,
    paddingHorizontal: 5,
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
    borderRadius: 10,
    width: 170,
    height: 120,
    flexDirection: "column",
    backgroundColor: "#ffff",
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    marginTop: 10,
  },
  mood: {
    marginTop: -51,
    position: "absolute",
    fontSize: 15,
    color: "#ffff",
    fontWeight: "800",
    textAlign: "center",
    fontFamily: "RalewayRegular",
    minWidth: 90,
    borderRadius: 10,
    backgroundColor: "rgba(24,24,24,0.4)",
    padding: 5,
  },
  CloseappButtonText: {
    fontSize: 17,
    fontFamily: "RalewayBold",
    color: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginRight: 10,
    marginLeft: 10,
  },
});

export default Onboarding;
