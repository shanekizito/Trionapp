import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HomeHeaderWhite from '../components/HomeHeaderWhite';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { RoundedCheckbox } from 'react-native-rounded-checkbox';

// Import images statically
import veganImage from '../assets/images/car1.png';
import vegetarianImage from '../assets/images/car2.png';
import lessMeatImage from '../assets/images/car3.png';
import everythingImage from '../assets/images/car4.png';

const footprintValues = {
  "I don't drive or ride": 1,
  "Up to 5,000 km": 2.0,
  "5,000-10,000 km": 3.0,
  "10,000-15,000 km": 4.0,
};

const totalAnnualFootprint = 10; // Total carbon footprint for the country
const maxPercentagePerPage = 20; // Maximum percentage contribution per page

const Car = ({ navigation, route }) => {
  const { footprintPercentage } = route.params || { footprintPercentage: 0 }; // Default to 0 if not provided
  const [selectedOption, setSelectedOption] = useState(null);
  const [footprint, setFootprint] = useState(footprintPercentage * totalAnnualFootprint / 100);

  const handleOptionChange = (option) => {
    const optionValue = footprintValues[option];
    let newFootprint = footprint;

    if (selectedOption === option) {
      setSelectedOption(null);
      newFootprint -= optionValue;
    } else {
      const previousOptionValue = selectedOption ? footprintValues[selectedOption] : 0;
      newFootprint = footprint - previousOptionValue + optionValue;
      setSelectedOption(option);
    }

    if ((newFootprint / totalAnnualFootprint) * 100 > maxPercentagePerPage) {
      newFootprint = (maxPercentagePerPage / 100) * totalAnnualFootprint;
    }

    setFootprint(newFootprint);
  };

  const handleProceed = () => {
    navigation.navigate('Diet', { footprintPercentage: (footprint / totalAnnualFootprint) * 100 }); // Pass the updated footprintPercentage
  };

  const calculateFill = () => (footprint / totalAnnualFootprint) * 100;

  const getImageSource = (option) => {
    switch (option) {
      case "I don't drive or ride":
        return veganImage;
      case 'Up to 5,000 km':
        return vegetarianImage;
      case '5,000-10,000 km':
        return lessMeatImage;
      case '10,000-15,000 km':
        return everythingImage;
      default:
        return null;
    }
  };

  return (
    <ImageBackground source={require('../assets/images/traffic.jpg')} style={styles.backgroundImage}>
    <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
        
          <View style={styles.circularProgressContainer}>
            <Text style={styles.circularProgressTitle}>Percentage Contribution</Text>
            <AnimatedCircularProgress
              size={wp('30%')}
              width={wp('1%')}
              fill={calculateFill()}
              tintColor="#2ecc71"
              backgroundColor="#fff"
            >
              {() => (
                <Text style={styles.circularProgressText}>
                  {calculateFill().toFixed(2)}%
                </Text>
              )}
            </AnimatedCircularProgress>
          </View>

          {/* Question Chat Bubble */}
          <View style={[styles.chatBubble, styles.leftChatBubble, selectedOption === null && styles.selectedChatBubble]}>
            <Text style={styles.chatText}>What is your annual mileage by car?</Text>
          </View>
          
          {/* Reply Chat Bubble */}
          <View style={[styles.chatBubble, styles.rightChatBubble]}>
            <Text style={styles.chatText}>Select one option</Text>
            {Object.keys(footprintValues).map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.checkboxContainer}
                onPress={() => handleOptionChange(option)}
                disabled={selectedOption !== null && selectedOption !== option}
              >
                <RoundedCheckbox
                  size={hp('4%')}
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
            <Text style={styles.proceedBtnText}>Next</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'center',

  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
  
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  categoryBanner: {
    width: wp('43%'),
    height: hp('18%'),
    resizeMode: 'cover',
    alignSelf: 'center',
    marginBottom: hp('2%'),
  },
  circularProgressContainer: {
    alignItems: 'center',
    marginBottom: hp('5%'),
  },
  circularProgressTitle: {
    fontSize: wp('6.5%'),
    color: '#fff',
    fontFamily: 'ChakraBold',
    marginBottom: hp('2.5%'),
  },
  circularProgressText: {
    fontSize: wp('6%'),
    color: '#fff',
    fontFamily: 'ChakraBold',
  },
  chatBubble: {
    maxWidth: '80%',
    padding: wp('4%'),
    marginBottom: hp('2%'),
    borderRadius: wp('4%'),
  },
  leftChatBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#2ecc71',
    marginTop: hp('-2%'),
  },
  selectedChatBubble: {
    backgroundColor: '#2ecc71',
  },
  rightChatBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#2ecc71',
  },
  chatText: {
    fontSize: wp('4.5%'),
    color: '#fff',
    fontFamily: 'ChakraRegular',
    marginBottom: wp('1%'),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1.25%'),
  },
  checkboxText: {
    fontSize: wp('4.5%'),
    color: '#fff',
    fontFamily: 'ChakraRegular',
    marginLeft: wp('3%'),
  },
  checkboxIcon: {
    width: wp('6%'),
    height: wp('6%'),
    marginRight: wp('3%'),
  },
  proceedBtn: {
    justifyContent: "center",
    borderRadius: wp('5%'),
    width: wp('95%'),
    height: hp('8%'),
    backgroundColor: "#2ecc71",
    alignItems: "center",
    flexDirection: 'row',
    alignSelf: 'center',
  },
  proceedBtnText: {
    fontSize: wp('5%'),
    color: '#fff',
    fontFamily: 'ChakraBold',
    marginRight: wp('2%'),
  },
});




export default Car;
