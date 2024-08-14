import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
      <CountryModalProvider>
        {/* Use HomeHeaderWhite component for header */}
        <View style={styles.card}>
          <Text style={styles.label}>Confirm your country of residence</Text>

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
    backgroundColor: "#000A13",
  },
  label: {
    fontSize: wp('7.5%'),
    marginBottom: hp('12.5%'),
    textAlign: "center",
    color: "#fff",
    alignSelf: "center",
    fontFamily: "ChakraBold",
  },
  card: {
    flex: 1,
    padding: wp('2.5%'),
    marginBottom: hp('10%'),
    justifyContent: "center",
    alignItems: "center",
    
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: wp('2.5%'),
    marginBottom: hp('2.5%'),
    width: "100%",
    backgroundColor:'#fff'
  },
  countryPickerButton: {
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
  },
  image: {
    width: wp('25%'),
    height: wp('25%'),
    resizeMode: "contain",
    marginTop: hp('2.5%'),
    marginBottom: hp('1.25%'),
  },
  explanation: {
    fontSize: wp('5%'),
    textAlign: "center",
    marginBottom: hp('5.5%'),
    color: "#fff",
    alignSelf: "center",
    fontFamily: "ChakraRegular",
  },
  button: {
    justifyContent: "center",
    borderRadius: wp('5%'),
    width: wp('80%'),
    height: hp('8%'),
    backgroundColor: "#2ecc71",
    alignItems: "center",
  },
  buttonText: {
    fontSize: wp('5%'),
    color: "#fff",
    alignSelf: "center",
    fontFamily: "ChakraBold",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: hp('1.25%'),
    paddingHorizontal: wp('5%'),
    backgroundColor: "#f2f2f2",
    borderRadius: wp('2.5%'),
    marginBottom: hp('1.25%'),
    
  },
  filterText: {
    fontSize: wp('4.5%'),
    color: "#fff",
    alignSelf: "center",
    fontFamily: 'sans-serif',
  },
  filterInput: {
    flex: 1,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
    fontSize: wp('3.5%'),
    borderRadius: wp('1.25%'),
    borderWidth: 1,
    borderColor: "#fff",
    color: "#fff",
    
  },
});

export default Card;
