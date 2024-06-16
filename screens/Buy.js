// screens/Buy.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
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
      source={require('../assets/images/background.jpg')} // Replace with your background image
      style={styles.background}
    >
      <View style={styles.overlay} />
      <HomeHeaderWhite navigation={navigation} header={'Buy Page'} />
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
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black overlay with 50% opacity
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  co2Text: {
    fontSize: 35, // Larger size for "CO₂"
    color: '#2ecc71', // Same color as the button
  },
  card: {
    backgroundColor: 'rgba(18, 18, 18, 0.8)', // Darker translucent background
    padding: 30,
    borderRadius: 28,
    width: '100%',
    maxWidth: 350,
    marginVertical: 15,
    position: 'relative',
    elevation: 5, // Add elevation for Android
    shadowColor: '#000', // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    marginRight: 15,
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    color: '#fff',
  },
  cardText: {
    fontSize: 16,
    color: '#fff', // White text color for better visibility
    fontFamily: 'sans-serif',
  },
  continueButton: {
    backgroundColor: '#2ecc71', 
    borderRadius: 10,
    width: '90%',
    padding: 15,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 18,
    color: "#fff",
    fontFamily: 'sans-serif',
  },
});

export default Buy;
