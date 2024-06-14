import React from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  navigation,
} from "react-native";
import { assets } from "../constants";
import { HomeHeaderWhite } from "../components";
import Barcode from "react-native-barcode-svg";






const Ticket = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <HomeHeaderWhite header={"YOUR TICKET"} navigation={navigation} />
      <View style={styles.ticket}>
        <View style={styles.venueContainer}>
          <Image
            style={styles.tinyBanner}
            resizeMode="cover"
            source={{
              uri: "https://kenyaonthego.com/wp-content/uploads/2021/11/black-pearl-4-520x397.jpg",
            }}
          />
          <View style={styles.venueInfoContainer}>
            <Text style={styles.place}>Club Da Place</Text>
            <Text style={styles.venueLocation}>Mamboleo stage - Kisumu</Text>
          </View>
        </View>
        <View style={styles.userInfoContainer}>
          <View style={styles.row1}>
            <Text style={styles.title}>Shane Kizito</Text>
            <Text style={styles.title}>MARCH 23 2023</Text>
          </View>

          <View style={styles.row2}>
            <Text style={styles.title}>4:30 PM</Text>
            <Text style={styles.title}></Text>
          </View>
        </View>
        <View style={styles.row3}>
          <Text style={styles.info}>Security barcode</Text>
          <Barcode value="Hello World" format="CODE128" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  place: {
    fontFamily: "RalewayBold",
    fontSize: 18,
    marginBottom: 10,
  },
  barCode: {
    height: 200,
    width: 300,
    color: "#0f0",
  },
  ticket: {
    shadowColor: "#000",
    flexDirection: "column",
    backgroundColor: "#ffff",
    padding: 20,
    borderRadius: 10,
    width: "95%",
    justifyContent: "center",
    marginVertical: 15,
    marginTop: 10,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  row3: {
    marginTop: 20,

    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    marginTop: 0,
    marginBottom: 15,
    color: "grey",
    fontFamily: "RalewayRegular",
  },

  venueContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e4e3e3",
    borderStyle: "dotted",
    paddingBottom: 40,
  },
  tinyBanner: {
    width: 90,
    height: 90,
    borderRadius: 15,
    marginRight: 20,
  },

  venueInfoContainer: {},
  venueName: {},
  venueLocation: {
    fontSize: 12,
    fontFamily: "RalewayRegular",
  },

  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e4e3e3",
    paddingBottom: 40,
  },
  row1: {
    marginRight: 100,
  },
  title: {
    fontSize: 18,
    fontFamily: "RalewayBold",
    marginTop: 15,
  },
  qrcode: {
    width: 110,
    height: 100,
  },
});

export default Ticket;
