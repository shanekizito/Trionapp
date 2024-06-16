import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import HomeHeaderWhite from '../components/HomeHeaderWhite';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Diet = ({ navigation }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [carbonFootprint, setCarbonFootprint] = useState(0);

  const handleOptionChange = (option, isChecked) => {
    if (isChecked) {
      setSelectedOptions([...selectedOptions, option]);
    } else {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    }
  };

  useEffect(() => {
    // Calculate carbon footprint based on selected options
    const footprintValues = {
      'Vegan': 1.5,
      'Vegeterian': 2.0,
      'lessMeat': 3.0,
      'everything': 4.0,
    };

    let totalFootprint = selectedOptions.reduce((total, option) => total + footprintValues[option], 0);
    setCarbonFootprint(totalFootprint);
  }, [selectedOptions]);

  const handleProceed = () => {
    navigation.navigate('Diet'); // Replace 'Diet' with your actual next screen name
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
              fill={(carbonFootprint / 10) * 100} // Assuming 10 is the max footprint value
              tintColor="#00e0ff"
              backgroundColor="#3d5875"
            >
              {
                () => (
                  <Text style={styles.circularProgressText}>
                    {carbonFootprint.toFixed(1)} T
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
            <View style={styles.checkboxContainer}>
              <Checkbox
                style={styles.checkbox}
                value={selectedOptions.includes('Vegan')}
                onValueChange={(isChecked) => handleOptionChange('Vegan', isChecked)}
              />
              <Image source={require('../assets/images/vegan.png')} style={styles.checkboxIcon} />
              <Text style={styles.checkboxText}>Vegan</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                style={styles.checkbox}
                value={selectedOptions.includes('Vegeterian')}
                onValueChange={(isChecked) => handleOptionChange('Vegeterian', isChecked)}
              />
              <Image source={require('../assets/images/vegeterian.png')} style={styles.checkboxIcon} />
              <Text style={styles.checkboxText}>Vegeterian</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                style={styles.checkbox}
                value={selectedOptions.includes('lessMeat')}
                onValueChange={(isChecked) => handleOptionChange('lessMeat', isChecked)}
              />
              <Image source={require('../assets/images/meat.png')} style={styles.checkboxIcon} />
              <Text style={styles.checkboxText}>I try to eat less meat</Text>
            </View>
            <View style={styles.checkboxContainer}>
              <Checkbox
                style={styles.checkbox}
                value={selectedOptions.includes('everything')}
                onValueChange={(isChecked) => handleOptionChange('everything', isChecked)}
              />
              <Image source={require('../assets/images/noodles.png')} style={styles.checkboxIcon} />
              <Text style={styles.checkboxText}>I eat everything</Text>
            </View>
          </View>

          {/* Proceed Button */}
          <TouchableOpacity style={styles.proceedBtn} onPress={handleProceed}>
            <Text style={styles.proceedBtnText}>Continue</Text>
            <IconComponentProvider IconComponent={MaterialCommunityIcons}>
              <Icon name="chevron-right-circle-outline" size={30} color="#fff" style={styles.proceedBtnIcon} />
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
    justifyContent: 'space-between',
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
  },
  proceedBtnIcon: {
    marginLeft: 10,
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
