import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  ImageBackground,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { HomeHeader } from "../components";
import TypeWriter from "react-native-typewriter";
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { HomeHeaderWhite } from "../components";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";
import { useFonts } from "expo-font";
import { COLORS, NFTData, assets } from "../constants";

const Home = ({ navigation }) => {
  const [cityOpen, setCityOpen] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState([]);
  const [moodOpen, setMoodOpen] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(null);
  const [valueTown, setValueTown] = useState(null);

  const toggleSelection = (index) => {
    const newSelectedIndices = [...selectedIndices];
    const indexOfIndex = newSelectedIndices.indexOf(index);
    if (indexOfIndex > -1) {
      newSelectedIndices.splice(indexOfIndex, 1);
    } else {
      newSelectedIndices.push(index);
    }
    setSelectedIndices(newSelectedIndices);
  };

  const [items, setItems] = useState([
    {
      label: "What would you like to discover",
      value: "label",
      containerStyle: {
        backgroundColor: "#000",
        borderRadius: 5,
        color: "#fff",
        padding: 0,
      },
      labelStyle: {
        color: "#fff",
      },
    },
    { label: "Day Vibes", value: "day" },
    { label: " Happy hour", value: "hour" },
    { label: "Nature Parks", value: "parks" },
    { label: "Sightseeing & Attractions", value: "sight" },
    { label: "Weekly Specials", value: "specials" },
  ]);
  const [location, setLocation] = useState([
    {
      label: "Where in Kenya",
      value: "label",
      containerStyle: {
        backgroundColor: "#000",
        borderRadius: 5,
        color: "#fff",
        padding: 10,
      },
      labelStyle: {
        color: "#fff",
      },
    },
    { label: "Mombasa", value: "Mombasa" },
    { label: "Nairobi", value: "Nairobi" },
  ]);
  const [user, setUser] = useState(null);

  const DATA = [
    { mood: "Make payment", id: 1, banner: "red", icon: "hand-coin-outline" },
    { mood: "Buy coins", id: 2, banner: "#c3fe7f", icon: "cart-outline" },
    {
      mood: "Check Bills",
      id: 3,
      banner: "beige",
      banner: "#c3fe7f",
      icon: "cash",
    },
    {
      mood: "Savings",
      id: 4,
      banner: "#b5fca7",
      banner: "#c3fe7f",
      icon: "shield-check",
    },
    {
      mood: "Gift card",
      id: 5,
      banner: "purple",
      banner: "#c3fe7f",
      icon: "gift-outline",
    },
    {
      mood: "Referral",
      id: 7,
      banner: "#fccfa7",
      banner: "#c3fe7f",
      icon: "account-convert",
    },
  ];

  const Item = ({ title, banner, location, mood, id, icon }) => {
    const isSelected = selectedIndices.includes(id);

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => toggleSelection(id)}
        underlayColor={COLORS.ACCENT_3}
      >
        <View style={styles.mood}>
          <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <Icon name={icon} size={25} color="#000" />
          </IconComponentProvider>
          <Text style={styles.moodText}> {mood}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getDownloadURL(ref(storage, "images/hero.jpg"))
      .then((url) => {
        console.log(url);
      })
      .catch((err) => {
        s;
        console.log(err);
      });

    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        authenticatedUser ? setUser(authenticatedUser) : null,
          console.log(user);
        setIsLoading(false);
      }
    );
    return unsubscribeAuth;
  }, [1]);

  const onTownOpen = useCallback(() => {
    setMoodOpen(false);
  }, []);

  const onVibeOpen = useCallback(() => {
    setCityOpen(false);
  }, []);

  TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

  const AppButton = ({ title }) => (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("SignUp", { venue: valueTown })}
        style={styles.appButtonContainer}
      >
        <Text style={styles.appButtonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );

  const SignInButton = ({ title }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("SignIn")}
      style={styles.SignInButtonContainer}
    >
      <Text style={styles.SignInButtonText}>
        <IconComponentProvider IconComponent={MaterialCommunityIcons}>
          <Icon name="login" size={15} color="#5c5c5c" />
        </IconComponentProvider>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "rgb(246, 239, 227)" }}>
     
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          height: 200,
          flexWrap: "wrap",
          alignItems: "center",
          backgroundColor: "rgb(255, 248, 236)",
          borderWidth: 1,
          borderColor: "rgb(255, 248, 236)",
          borderBottomLeftRadius: 30,
          marginBottom: 50,
        }}
      >
        <Text
          style={{
            marginBottom: 15,
            fontSize: 28,
            marginTop: 25,
            color: "#000",
            marginLeft: 10,
            fontFamily: "RalewayBold",
          }}
        >
          The tasty way to pay for Pizza
        </Text>

        <Image
          source={require("../assets/images/pizzalogo.png")}
          style={{ width: 100, height: 100, marginTop: 20, marginLeft: 5 }}
        />
        <Text
          style={{
            position: "absolute",
            marginLeft: 150,
            top: 120,
            fontSize: 35,
            fontFamily: "RalewayRegular",
            color: "#000",
          }}
        >
          0 .0 1 £ / pzc
        </Text>
      </View>
      <View>
        <AppButton title="check balance" size="sm" />

        {useMemo(() => (
          <FlatList
            numColumns={2}
            style={styles.flatList}
            data={DATA}
            renderItem={({ item }) => (
              <Item
                mood={item.mood}
                id={item.id}
                banner={item.banner}
                icon={item.icon}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    height: 30,
    justifyContent: "center",
    padding: 16,
    zIndex: -1,
  },
  mood: {
    top: 15,
    alignItems: "center",
    width: "80%",
    height: "70%",
    borderRadius: 10,

    padding: 5,
  },
  moodText: {
    fontSize: 18,
    marginTop: 5,
    fontFamily: "RalewayBold",
  },

  appButtonContainer: {
    backgroundColor: "orange",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    color: "#fff",
    marginTop: 18,
    borderRadius: 25,
    width: 380,
    height: 45,
    paddingVertical: 9,
    paddingHorizontal: 5,
  },
  appButtonText: {
    fontSize: 20,
    color: "#000",
    alignSelf: "center",
    fontFamily: "RalewayBold",
  },
  bgBody: {
    backgroundColor: "#6d6b6b8e",
    flex: 1,
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
  SignInButtonContainer: {
    elevation: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f7f7f7f1",
    color: "#000",
    height: 40,
    borderRadius: 20,
    marginTop: 20,
    marginLeft: 10,
    width: 100,
  },
  SignInButtonText: {
    fontSize: 18,
    color: "#5c5c5c",
    alignSelf: "center",
    fontFamily: "RalewayRegular",
  },
  flatList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    width: 180,
    height: 90,
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 8,
    elevation: 1,
    marginTop: 10,
    backgroundColor: "orange",
  },
});

export default Home;
