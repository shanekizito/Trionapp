import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import HomeHeaderWhite from '../components/HomeHeaderWhite';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Import images statically
import veganImg from '../assets/images/vegan.png';
import vegetarianImg from '../assets/images/vegeterian.png';
import lessMeatImg from '../assets/images/meat.png';
import everythingImg from '../assets/images/noodles.png';

const carbonFootprints = {
  Vegan: 1.5,
  Vegeterian: 2.0,
  lessMeat: 3.0,
  everything: 4.0,
};

const totalAnnualFootprint = 10; // Adjust this value based on the maximum possible footprint

const Diet = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [footprint, setFootprint] = useState(0);

  const handleOptionChange = (option, isChecked) => {
    if (isChecked) {
      setSelectedOption(option);
      setFootprint(carbonFootprints[option]);
    } else {
      setSelectedOption(null);
      setFootprint(0);
    }
  };

  const handleProceed = () => {
    navigation.navigate('Diet'); // Replace 'Diet' with your actual next screen name
  };

  const calculateFill = () => (footprint / totalAnnualFootprint) * 100;

  const getImageSource = (option) => {
    switch (option) {
      case 'Vegan':
        return veganImg;
      case 'Vegeterian':
        return vegetarianImg;
      case 'lessMeat':
        return lessMeatImg;
      case 'everything':
        return everythingImg;
      default:
        return null;
    }
  };

  return (
    <ImageBackground source={require('../assets/images/food.jpg')} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <HomeHeaderWhite navigation={navigation} header={''} />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.pageTitle}>CO₂ footprint assessment</Text>
          
          {/* Circular Progress */}
          <View style={styles.circularProgressContainer}>
            <Text style={styles.circularProgressTitle}>Tons in CO₂</Text>
            <AnimatedCircularProgress
              size={130}
              width={18}
              fill={calculateFill()}
              tintColor="#00e0ff"
              backgroundColor="#3d5875"
            >
              {
                () => (
                  <Text style={styles.circularProgressText}>
                    {footprint.toFixed(1)} T
                  </Text>
                )
              }
            </AnimatedCircularProgress>
          </View>

          {/* Question Chat Bubble */}
          <View style={[styles.chatBubble, styles.leftChatBubble]}>
            <Text style={styles.chatText}>Which best describes your diet?</Text>
          </View>
          
          {/* Reply Chat Bubble */}
          <View style={[styles.chatBubble, styles.rightChatBubble]}>
            <Text style={styles.chatText}>Select one option</Text>
            {Object.keys(carbonFootprints).map((option) => (
              <View key={option} style={styles.checkboxContainer}>
                <Checkbox
                  style={styles.checkbox}
                  value={selectedOption === option}
                  onValueChange={(isChecked) => handleOptionChange(option, isChecked)}
                />
                <Image source={getImageSource(option)} style={styles.checkboxIcon} />
                <Text style={styles.checkboxText}>{option}</Text>
              </View>
            ))}
          </View>
          
          {/* Proceed Button */}
          <TouchableOpacity style={styles.proceedBtn} onPress={handleProceed}>
            <Text style={styles.proceedBtnText}>Continue</Text>
            <IconComponentProvider IconComponent={MaterialCommunityIcons}>
              <Icon name="chevron-right-circle-outline" size={30} color="#fff" />
            </IconComponentProvider>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black overlay with 50% opacity
  },
  contentContainer: {
    padding: 20,
    paddingTop: 20, // Adjust to make space for the header/title
  },
  pageTitle: {
    fontSize: 30,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  chatBubble: {
    maxWidth: '80%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  leftChatBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#00e0ff', // Left bubble color
    padding: 20,
  },
  rightChatBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#2ecc71', 
    padding: 20, // Right bubble color
  },
  chatText: {
    fontSize: 23,
    color: '#fff', // Text color
    fontFamily: 'sans-serif',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 8, // Vertical padding for checkbox sections
    paddingHorizontal: 12, // Horizontal padding for checkbox sections
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 23,
    color: '#fff', // Text color
    fontFamily: 'sans-serif',
  },
  checkboxIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  checkbox: {
    marginRight: 8, // Adjust spacing between checkbox and text
  },
  proceedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2ecc71', // MediumSeaGreen
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  proceedBtnText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'sans-serif',
    marginRight: 10,
  },
  circularProgressContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  circularProgressTitle: {
    fontSize: 20,
    color: '#2ecc71',
    fontFamily: 'sans-serif',
    marginBottom: 10,
  },
  circularProgressText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
});

export default Diet;
