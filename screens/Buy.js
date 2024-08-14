import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HomeHeaderWhite from "../components/HomeHeaderWhite";

const Buy = ({ navigation }) => {
  const cards = [
    {
      logo: require('../assets/images/environment.png'),
      content: "Carbon credits help companies offset their carbon emissions by investing in environmental projects.",
      number: 1,
    },
    {
      logo: require('../assets/images/eco-logo.png'),
      content: "These credits are essential for achieving sustainability goals and reducing the overall carbon footprint.",
      number: 2,
    },
    {
      logo: require('../assets/images/factory-eco.png'),
      content: "By supporting renewable energy, reforestation, and other projects, companies contribute to environmental conservation.",
      number: 3,
    },
  ];

  return (
    <ImageBackground
      source={require('../assets/images/background2.png')} // Replace with your background image
      style={styles.background}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.pageTitle}>
          1.74 tonnes of{' '}
          <Text style={styles.co2Text}>CO₂</Text>
        </Text>
        {cards.map((card, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <Image source={card.logo} style={styles.logo} />
              <Text style={styles.cardNumber}>{card.number}</Text>
            </View>
            <Text style={styles.cardText}>{card.content}</Text>
          </View>
        ))}
        <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate('Venue')}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: "#000A13",
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp('3%'),
  },
  pageTitle: {
    fontSize: wp('10%'),
    color: '#fff',
    marginaTop: hp('2.5%'),
    textAlign: 'center',
    fontFamily: "ChakraBold",
  },
  co2Text: {
    fontSize: wp('8.75%'), // Larger size for "CO₂"
    color: '#2ecc71', // Same color as the button
  },
  card: {
    backgroundColor: '#000A13', // Darker translucent background
    padding: wp('5%'),
    borderRadius: wp('7%'),
    width: '100%',
    maxWidth: wp('112.5%'),
    marginVertical: hp('2%'),
    position: 'relative',
    elevation: 1, // Add elevation for Android
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2.5%'),
  },
  logo: {
    width: wp('12.5%'),
    height: wp('12.5%'),
    backgroundColor: '#000A13',
    borderRadius: wp('3%'),
    marginRight: wp('3.75%'),
  },
  cardNumber: {
    fontSize: wp('7.5%'),
    fontFamily: "ChakraBold",
    color: '#fff',
  },
  cardText: {
    fontSize: wp('4.25%'),
    color: '#fff', // White text color for better visibility
    fontFamily: "ChakraRegular",
  },
  continueButton: {
    justifyContent: "center",
    borderRadius: wp('5%'),
    width: wp('80%'),
    height: hp('8%'),
    backgroundColor: "#2ecc71",
    alignItems: "center",
  },
  continueButtonText: {
    fontSize: wp('5%'),
    color: "#fff",
    fontFamily: "ChakraBold",
  },
});

export default Buy;
