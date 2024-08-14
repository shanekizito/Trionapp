import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import HomeHeaderWhite from '../components/HomeHeaderWhite';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { RoundedCheckbox } from 'react-native-rounded-checkbox';

// Import images statically
import veganImage from '../assets/images/vegan.png';
import vegetarianImage from '../assets/images/vegeterian.png';
import lessMeatImage from '../assets/images/meat.png';
import everythingImage from '../assets/images/noodles.png';

const carbonFootprints = {
    Vegan: 1.5,
    Vegetarian: 2.0,
    lessMeat: 3.0,
    everything: 4.0,
};

const totalAnnualFootprint = 1.74; // Total carbon footprint for the country

const Venue = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [footprint, setFootprint] = useState(0);

  const handleOptionChange = (option) => {
    if (selectedOption === option) {
      setSelectedOption(null);
      setFootprint(0);
    } else {
      setSelectedOption(option);
      setFootprint(carbonFootprints[option]);
    }
  };

  const handleProceed = () => {
    navigation.navigate('Diet'); // Replace 'Diet' with your actual screen name
  };

  const calculateFill = () => (footprint / totalAnnualFootprint) * 100;

  const getImageSource = (option) => {
    switch (option) {
      case 'Vegan':
        return veganImage;
      case 'Vegetarian':
        return vegetarianImage;
      case 'lessMeat':
        return lessMeatImage;
      case 'everything':
        return everythingImage;
      default:
        return null;
    }
  };

  return (
    <ImageBackground source={require('../assets/images/plane.jpg')} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <HomeHeaderWhite navigation={navigation} header={''} />
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.pageTitle}>CO₂ Footprint Assessment</Text>
          
          {/* Circular Progress */}
          <View style={styles.circularProgressContainer}>
            <Text style={styles.circularProgressTitle}>Tons in CO₂</Text>
            <AnimatedCircularProgress
              size={150}
              width={20}
              fill={calculateFill()}
              tintColor="#00e0ff"
              backgroundColor="#3d5875"
            >
              {() => (
                <Text style={styles.circularProgressText}>
                  {((footprint / totalAnnualFootprint) * 100).toFixed(2)}%
                </Text>
              )}
            </AnimatedCircularProgress>
          </View>

          {/* Question Chat Bubble */}
          <View style={[styles.chatBubble, styles.leftChatBubble, selectedOption === null && styles.selectedChatBubble]}>
            <Text style={styles.chatText}>How would you describe your flying habits in a typical average year?</Text>
          </View>
          
          {/* Reply Chat Bubble */}
          <View style={[styles.chatBubble, styles.rightChatBubble]}>
            <Text style={styles.chatText}>Select one option</Text>
            {Object.keys(carbonFootprints).map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.checkboxContainer}
                onPress={() => handleOptionChange(option)}
                disabled={selectedOption !== null && selectedOption !== option}
              >
                <RoundedCheckbox
                  size={30}
                  isChecked={selectedOption === option}
                  onPress={() => handleOptionChange(option)}
                  text=''
                  borderColor="#fff"
                  fillColor="#2ecc71"
                  uncheckedColor="#fff"
                  active={selectedOption === option} // Pass active prop based on selection
                />
                <Image source={getImageSource(option)} style={styles.checkboxIcon} />
                <Text style={styles.checkboxText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Proceed Button */}
          <TouchableOpacity style={styles.proceedBtn} onPress={handleProceed}>
            <Text style={styles.proceedBtnText}>Continue</Text>
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
    paddingTop: 40, // Adjusted to center the content vertically
    paddingBottom: 20, // Added padding at the bottom for spacing
  },
  pageTitle: {
    fontSize: 32,  // Increased font size for emphasis
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
  },
  chatBubble: {
    maxWidth: '80%',
    padding: 16, // Increased padding for better spacing
    marginBottom: 16, // Increased margin bottom for better separation
    borderRadius: 16, // Adjusted borderRadius for a more rounded look
  },
  leftChatBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#2ecc71', // Left bubble color
    marginTop: -16, // Adjusted position to be on top
  },
  selectedChatBubble: {
    backgroundColor: '#2ecc71', // Selected left bubble color
  },
  rightChatBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#2ecc71', // Right bubble color
  },
  chatText: {
    fontSize: 18, // Adjusted font size for readability
    color: '#fff', // Text color
    fontFamily: 'sans-serif',
    marginBottom: 8, // Adjusted margin bottom for better spacing
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12, // Increased margin bottom for better separation
  },
  checkboxText: {
    fontSize: 18, // Adjusted font size for readability
    color: '#fff', // Text color
    fontFamily: 'sans-serif',
    marginLeft: 12, // Adjusted margin left for spacing
  },
  checkboxIcon: {
    width: 24,
    height: 24,
    marginRight: 12, // Adjusted margin right for spacing
  },
  proceedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2ecc71', // MediumSeaGreen
    marginTop: 20,
    paddingVertical: 14, // Adjusted padding vertical for better button size
    paddingHorizontal: 24, // Adjusted padding horizontal for better button size
    borderRadius: 10,
  },
  proceedBtnText: {
    fontSize: 20,
    color: '#fff',
    fontFamily: 'sans-serif',
    marginRight: 8, // Adjusted margin right for spacing
  },
  circularProgressContainer: {
    alignItems: 'center',
    marginBottom: 24, // Increased margin bottom for better spacing
  },
  circularProgressTitle: {
    fontSize: 22, // Increased font size for emphasis
    color: '#2ecc71',
    fontFamily: 'sans-serif',
    marginBottom: 12, // Increased margin bottom for better spacing
  },
  circularProgressText: {
    fontSize: 32, // Increased font size for emphasis
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
});

export default Venue;
