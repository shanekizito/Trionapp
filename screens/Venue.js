import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import HomeHeaderWhite from '../components/HomeHeaderWhite';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// Import images statically
import plane1 from '../assets/images/plane1.png';
import plane2 from '../assets/images/plane2.png';
import plane3 from '../assets/images/plane3.png';
import plane4 from '../assets/images/plane4.png';

const carbonFootprints = {
  Rarely: 0.1,
  Occasionally: 0.3,
  Regularly: 0.5,
  Custom: 1.0,
};

const totalAnnualFootprint = 1.74; // Total carbon footprint for the country

const Venue = ({ navigation }) => {
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
    navigation.navigate('Diet'); // Replace 'NextScreen' with your actual screen name
  };

  const calculateFill = () => (footprint / totalAnnualFootprint) * 100;

  const getImageSource = (option) => {
    switch (option) {
      case 'Rarely':
        return plane1;
      case 'Occasionally':
        return plane2;
      case 'Regularly':
        return plane3;
      case 'Custom':
        return plane4;
      default:
        return null;
    }
  };

  return (
    <ImageBackground source={require('../assets/images/plane.jpg')} style={styles.backgroundImage}>
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
                    {((footprint / totalAnnualFootprint) * 100).toFixed(2)}%
                  </Text>
                )
              }
            </AnimatedCircularProgress>
          </View>

          {/* Question Chat Bubble */}
          <View style={[styles.chatBubble, styles.leftChatBubble]}>
            <Text style={styles.chatText}>How would you describe your flying habits in a typical average year?</Text>
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

export default Venue;
