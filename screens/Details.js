import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { HomeHeaderWhite } from "../components";
import { useRoute, useNavigation } from "@react-navigation/native";
import Venue from "./Venue";
import DropDownPicker from "react-native-dropdown-picker";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { LineChart, Grid } from "react-native-svg-charts";

const DropPicker = () => {
  return (
    <View>
      <DropDownPicker
        open={cityOpen}
        onOpen={onTownOpen}
        listItemLabelStyle={{
          color: "#535353",
          marginTop: 0,
          fontSize: 13,
        }}
        setOpen={setCityOpen}
        zIndex={2000}
        zIndexInverse={2000}
        placeholder="Pay with"
        placeholderStyle={{
          color: "#535353",
          marginLeft: 15,
          fontFamily: "Rubik",
          backgroundColor: "#EDEDED",
          height: "100%",
          borderRadius: 5,
          padding: 10,
        }}
        dropDownContainerStyle={{
          borderWidth: 0,
          padding: 15,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.18,
          shadowRadius: 1.0,
          elevation: 1,
          width: "95%",
          marginLeft: 0,
          marginTop: 2,
        }}
        containerStyle={{}}
        textStyle={{
          fontSize: 15,
          fontFamily: "Rubik",
          color: "#535353",
        }}
        value={valueTown}
        items={location}
        setValue={setValueTown}
        setItems={setLocation}
        style={{
          backgroundColor: "#EDEDED",
          flexDirection: "row",
          borderWidth: 0,
          marginLeft: "3%",
          height: 50,
          width: "90%",
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 1,
          padding: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.18,
          shadowRadius: 1.0,
          elevation: 1,
        }}
      />
      <Text style={styles.coinAmount}>Available : 0.0000</Text>
      <DropDownPicker
        open={moodOpen}
        onOpen={onVibeOpen}
        setOpen={setMoodOpen}
        zIndex={1000}
        zIndexInverse={1000}
        dropDownDirection="BOTTOM"
        placeholder="Receive"
        placeholderStyle={{
          color: "#535353",
          marginLeft: 15,
          fontFamily: "Rubik",
        }}
        listItemLabelStyle={{
          color: "#535353",
          marginTop: 0,
          fontSize: 13,
          fontFamily: "Rubik",
        }}
        value={value}
        items={items}
        setValue={setValue}
        setItems={setItems}
        dropDownContainerStyle={{
          borderWidth: 0,
          padding: 15,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.18,
          shadowRadius: 1.0,
          elevation: 1,
          width: "95%",
          marginLeft: 0,
          marginTop: 2,

          flexDirection: "column",
        }}
        containerStyle={{}}
        textStyle={{
          fontSize: 15,
          fontFamily: "Rubik",
          color: "#535353",
        }}
        maxHeight={200}
        style={{
          backgroundColor: "#EDEDED",
          borderWidth: 0,
          borderWidth: 0,
          marginLeft: "3%",
          flexDirection: "row",
          zIndex: 2,

          height: 50,
          width: "90.5%",
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.18,
          shadowRadius: 1.0,
          elevation: 1,
        }}
      />
      <Text style={styles.coinAmount}>Available : 0.0000</Text>
    </View>
  );
};

const CryptoCard = ({ imageFilename = "coin.png", name, price, data }) => {
  const trendColor = data[data.length - 1] >= data[0] ? "#00FF00" : "#FF0000";
  const percentageChange = ((data[data.length - 1] - data[0]) / data[0]) * 100;
  const percentageIndicatorColor =
    percentageChange >= 0 ? "#00FF00" : "#FF0000";

  return (
    <View style={styles.coinContainer}>
      <Image source={imageFilename} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
      <View style={styles.chartContainer}>
        <LineChart
          style={styles.chart}
          data={data}
          svg={{
            stroke: trendColor,
            strokeWidth: 2,
          }}
          contentInset={{ top: 10, bottom: 10 }}
          gridMin={Math.min(...data)}
          gridMax={Math.max(...data)}
          numberOfTicks={2}
          showGrid={false}
        />
        <View style={styles.percentageContainer}>
          <Text
            style={[
              styles.percentageIndicator,
              { color: percentageIndicatorColor },
            ]}
          >
            {percentageChange.toFixed(2)}%
          </Text>
        </View>
      </View>
    </View>
  );
};

const bitcoinData = [35000, 34000, 36000, 37000, 38000, 39000, 38000];
const ethereumData = [2900, 3000, 3100, 2900, 2800, 2900, 3000];
const usdtData = [1.05, 1.03, 1.02, 1.06, 1.08, 1.1, 1.05];

const Details = ({ navigation }) => {
  const [venue, setVenue] = useState("");
  const route = useRoute();
  const [user, setUser] = useState(null);
  const [cityOpen, setCityOpen] = useState(false);
  const [moodOpen, setMoodOpen] = useState(false);
  const [valueTown, setValueTown] = useState(null);
  const [value, setValue] = useState(null);
  const bottomSheetModalRefVenue = useRef(null);
  const [items, setItems] = useState([
    {
      label: "BITCOIN",
      value: "label",
      icon: () => (
        <Image
          source={require("../assets/images/bitcoin.png")}
          style={{ width: 20, height: 20 }}
        />
      ),
      containerStyle: {
        backgroundColor: "#EDEDED",
        borderRadius: 5,
        color: "#535353",
        padding: 10,
      },
      labelStyle: {
        color: "#535353",
      },
    },
    {
      label: "ETHEREUM",
      value: "Mombasa",
      icon: () => (
        <Image
          source={require("../assets/images/ethereum.png")}
          style={{ width: 20, height: 20 }}
        />
      ),
    },
    {
      label: "USDT",
      value: "Nairobi",
      icon: () => (
        <Image
          source={require("../assets/images/usdt.png")}
          style={{ width: 20, height: 20 }}
        />
      ),
    },
  ]);

  const [location, setLocation] = useState([
    {
      label: "BITCOIN",
      value: "label",
      icon: () => (
        <Image
          source={require("../assets/images/bitcoin.png")}
          style={{ width: 20, height: 20 }}
        />
      ),
      containerStyle: {
        backgroundColor: "#EDEDED",
        borderRadius: 5,
        color: "#535353",
      },
      labelStyle: {
        color: "#535353",
        backgroundColor: "#EDEDED",
      },
    },
    {
      label: "ETHEREUM",
      value: "Mombasa",
      icon: () => (
        <Image
          source={require("../assets/images/ethereum.png")}
          style={{ width: 20, height: 20 }}
        />
      ),
    },
    {
      label: "USDT",
      value: "Nairobi",
      icon: () => (
        <Image
          source={require("../assets/images/usdt.png")}
          style={{ width: 20, height: 20 }}
        />
      ),
    },
  ]);

  const handlePresentModalPress = useCallback(() => {
    !bottomSheetModalRefVenue.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const onTownOpen = useCallback(() => {
    setMoodOpen(false);
  }, []);

  const onVibeOpen = useCallback(() => {
    setCityOpen(false);
  }, []);

  /*
  useEffect(() => {
    setVenue(route.params.venue);
    console.log(route.params.venue);
  }, [route.params.venue]);
*/

  const Item = ({ title, banner, location, vibe, date, email }) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Venue", {
            item: { title, banner, location, vibe, date },
          })
        }
      >
        <Image
          style={styles.tinyLogo}
          resizeMode="cover"
          source={{ uri: banner }}
        />
        <View style={styles.heartIcon}>
          <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <Icon name="bookmark-outline" size={24} color="white" />
          </IconComponentProvider>
        </View>

        <Text style={styles.vibe}>{vibe}</Text>
      </TouchableOpacity>
      <View style={styles.cardDetails}>
        <View style={styles.bannerDetails}>
          <Text style={styles.location}>{title}</Text>
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      navigation={navigation}
      banner={item.banner}
      location={item.location}
      email={item.email}
      vibe={item.vibe}
      date={item.date}
    />
  );

  const Card = () => {
    return (
      <View style={styles.card}>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.portfolio}>WALLET</Text>
          <Text style={styles.cardNumber}>**** 5567 890</Text>
        </View>
        <View
          style={{
            width: "95%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={styles.portfolio}>Balance (BTZ)</Text>
            <Text style={styles.balance}>$5,499.30</Text>
          </View>
          <Image
            source={require("../assets/images/matic.png")}
            style={{ width: 70, height: 70, marginTop: 20 }}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 0 }}>
        <HomeHeaderWhite header="WALLET" navigation={navigation} />
      </View>
      <ScrollView style={{ flex: 1 }}>
        <Card />
        <View style={styles.widgets}>
          <View style={styles.WidgetContainer}>
            <TouchableOpacity
              style={styles.sendWidget}
              onPress={() => navigation.navigate("Venue")}
            >
              <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                <Icon name="arrow-up" size={35} color="#fff" />
              </IconComponentProvider>
            </TouchableOpacity>
            <Text style={styles.widgetText}>send</Text>
          </View>
          <View style={styles.WidgetContainer}>
            <TouchableOpacity
              style={styles.receiveWidget}
              onPress={() => navigation.navigate("Deposit")}
            >
              <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                <Icon name="file-clock-outline" size={35} color="#fff" />
              </IconComponentProvider>
            </TouchableOpacity>
            <Text style={styles.widgetText}>transactions</Text>
          </View>

          <View style={styles.WidgetContainer}>
            <TouchableOpacity
              style={styles.receiveWidget}
              onPress={() => navigation.navigate("Deposit")}
            >
              <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                <Icon name="arrow-down" size={35} color="#fff" />
              </IconComponentProvider>
            </TouchableOpacity>
            <Text style={styles.widgetText}>receive</Text>
          </View>
        </View>
        <View style={styles.learnMoreContainer}>
          <Text style={styles.learnMoreContainerText}>
            spend earn and track easily with bitzza
          </Text>
          <Text style={styles.learnMoreContainerTextLittle}>
            {" "}
            More info here
          </Text>
        </View>
        <Text style={styles.watchList}> Watchlist</Text>
        <View style={styles.coinsCard}>
          <CryptoCard
            imageFilename={require("../assets/images/bitcoin.png")}
            name="Bitcoin"
            price="$26,000"
            data={bitcoinData}
          />
          <CryptoCard
            imageFilename={require("../assets/images/ethereum.png")}
            name="Ethereum"
            price="$1,237"
            data={ethereumData}
          />
          <CryptoCard
            imageFilename={require("../assets/images/usdt.png")}
            name="USDT"
            price="$1"
            data={usdtData}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  coinContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    height: 75,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    marginTop: 5,
    flexDirection: "row",
  },
  watchList: {
    fontFamily: "Rubik",
    marginLeft: 20,
    fontSize: 20,
    marginTop: 10,
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "Rubik",
  },
  price: {
    fontSize: 15,
    color: "#777777",
    fontFamily: "Rubik",
    fontWeight: "bold",
  },
  chartContainer: {
    flex: 1,
    height: 40,
    marginLeft: 10,
  },
  chart: {
    height: 30,
    width: 50,
  },

  iconStyle: {
    width: 20,
    height: 20,
  },
  Header: {
    color: "#000",
  },
  coinsCard: {
    marginTop: 20,
    shadowColor: "#000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  learnMoreContainer: {
    backgroundColor: "#6177F4",
    height: 150,
    width: "97%",
    borderRadius: 10,
    marginLeft: 5,
    marginBottom: 10,
    alignItems: "flex-start",
    fontSize: 45,
    color: "#000",
    elevation: 3,
  },
  learnMoreContainerText: {
    fontFamily: "Rubik",
    fontSize: 21,
    width: 300,
    marginLeft: 50,
    color: "#fff",

    marginTop: 20,
  },
  learnMoreContainerTextLittle: {
    fontFamily: "Rubik",
    fontSize: 16,
    backgroundColor: "#8A64D7",
    width: 140,
    marginLeft: 50,
    padding: 10,
    borderRadius: 5,
    color: "#fff",
    marginTop: 10,
  },

  card: {
    flexDirection: "column",
    backgroundColor: "#6177F4",
    borderRadius: 10,
    width: "98%",
    height: 190,
    marginTop: 10,
    marginHorizontal: 5,
    marginBottom: 60,
    shadowColor: "#000",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  balance: {
    fontSize: 25,
    color: "#fff",
    fontFamily: "Rubik",
    marginTop: 0,
    marginLeft: 20,
  },
  cardNumber: {
    fontSize: 19,
    color: "#fff",
    fontFamily: "Rubik",
    marginTop: 0,
    marginLeft: 20,
  },
  portfolio: {
    fontSize: 15,
    color: "#c4c3c3",
    fontFamily: "Rubik",
    letterSpacing: 2,
    marginTop: 25,
    marginBottom: 5,
    marginLeft: 20,
  },
  balanceTitle: {
    fontSize: 17,
    color: "#c4c3c3",
    fontFamily: "Rubik",
    letterSpacing: 5,
  },
  coinAmount: {
    fontSize: 15,
    fontFamily: "Rubik",
    color: "#c4c3c3",
    marginLeft: 15,
    marginVertical: 13,
  },
  widgetText: {
    fontSize: 18,
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "Rubik",
    marginTop: 10,
    color: "#000",
  },
  WidgetContainer: {
    width: 120,
    height: 150,
    alignItems: "center",
  },
  receiveWidget: {
    alignItems: "center",
    justifyContent: "center",
    width: 55,
    height: 55,
    backgroundColor: "#6177F4",
    padding: 9,
    borderRadius: 30,
  },
  sendWidget: {
    alignItems: "center",
    justifyContent: "center",
    width: 55,
    height: 55,
    backgroundColor: "#6177F4",
    padding: 9,
    borderRadius: 30,
  },
  infoContainersScreen: {
    flexDirection: "row",
    marginTop: 70,
    marginLeft: -7,
  },
  infoContainers: {
    backgroundColor: "#6177F4",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    height: 120,
    marginLeft: 6,
    borderRadius: 15,
  },
  BackButtonContainer: {
    backgroundColor: "black",
    opacity: 0.5,
    borderRadius: 200,
    alignItems: "center",
    marginTop: -20,
    marginBottom: 120,
    marginLeft: 10,
    padding: 5,
    width: 50,
  },

  widgets: {
    fontFamily: "Rubik",
    alignItems: "center",
    flexDirection: "row",
    height: 70,
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
  },
  heartIcon: {
    position: "absolute",
    alignItems: "center",
    height: 40,
    width: 40,
    marginTop: 3,
    marginLeft: "80%",
    padding: 8,
    borderRadius: 50,
  },
  cardDetails: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    marginTop: -50,
    flex: 1,
  },
  tinyLogo: {
    width: "100%",
    height: 170,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  item: {
    backgroundColor: "#6177F4",
    borderRadius: 20,
    marginVertical: 8,
    marginHorizontal: 10,
    height: 250,
    width: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bannerDetails: {
    alignItems: "center",
    marginTop: -100,
    marginLeft: 5,
    flexDirection: "row",
  },
  vibe: {
    position: "absolute",
    zIndex: 2,
    marginTop: 200,
    marginLeft: 10,
    fontSize: 15,
    color: "#fff",
    fontFamily: "Rubik",
  },
  location: {
    fontSize: 20,
    fontFamily: "Rubik",
    color: "#fff",
    marginLeft: 5,
  },
  percentageContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  percentageIndicator: {
    fontSize: 12,
    fontFamily: "Rubik",
    color: "#000",
  },
});

export default Details;
