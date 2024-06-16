import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import CountryPicker, { CountryModalProvider } from "react-native-country-picker-modal";
import HomeHeaderWhite from "../components/HomeHeaderWhite"; // Import HomeHeaderWhite component

const Card = ({ navigation }) => {
  const [countryCode, setCountryCode] = useState("US");
  const [countryName, setCountryName] = useState("United States");

  const handleConfirm = () => {
    navigation.navigate("Buy", { countryCode, countryName });
  };

  return (
    <View style={styles.container}>
       <HomeHeaderWhite navigation={navigation} header={''} />
   
    <CountryModalProvider>
      {/* Use HomeHeaderWhite component for header */}
     <View style={styles.card}>
        <Text style={styles.label}>Please confirm your country of residence</Text>

        <View style={styles.pickerContainer}>
          <CountryPicker
            withFlag
            withFilter
            withAlphaFilter
            withCallingCode
            withEmoji
            withCountryNameButton
            onSelect={(country) => {
              setCountryCode(country.cca2);
              setCountryName(country.name);
            }}
            countryCode={countryCode}
            visible={false}
            containerButtonStyle={styles.countryPickerButton}
            modalProps={{
              animationType: "slide",
            }}
            renderFilter={({ value, onChange }) => (
              <View style={styles.filterContainer}>
                <Text style={styles.filterText}>Filter by Name or Code:</Text>
                <TextInput
                  style={styles.filterInput}
                  value={value}
                  onChangeText={onChange}
                />
              </View>
            )}
          />
        </View>

        <Image
          source={require("../assets/images/info.png")}
          style={styles.image}
        />

        <Text style={styles.explanation}>
          Providing your country of residence helps us provide you with relevant services and comply with legal requirements.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
        </View>
    </CountryModalProvider>
     </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  label: {
    fontSize: 25,
    marginBottom: 100,
    textAlign: "center",
    color: "#000",
    alignSelf: "center",
    fontFamily: 'sans-serif',
  },
  card:{
    flex: 1,
    padding:10,
    marginBottom:80,
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
  },
  countryPickerButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginTop: 20,
    marginBottom: 10,
  },
  explanation: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    fontSize: 18, // Increased font size for better visibility
    color: "#000",
    alignSelf: "center",
    fontFamily: 'sans-serif',
  },
  button: {
    backgroundColor: '#2ecc71', 
    borderRadius: 10, // Matching input field border radius
    width: '90%', // Matching input field width
    padding: 15, // Matching input field padding
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18, // Increased font size for better visibility
    color: "#fff",
    alignSelf: "center",
    fontFamily: 'sans-serif',
    
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginBottom: 10,
  },
  filterText: {
    fontSize: 18, // Increased font size for better visibility
    color: "black",
    alignSelf: "center",
    fontFamily: 'sans-serif',
  },
  filterInput: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default Card;
