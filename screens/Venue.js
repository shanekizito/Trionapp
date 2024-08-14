import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RoundedCheckbox } from 'react-native-rounded-checkbox';

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

const maxPercentagePerPage = 20; // Maximum percentage contribution per page
const totalAnnualFootprint = 1.74; // Total carbon footprint for the country

const Venue = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [footprintPercentage, setFootprintPercentage] = useState(0);

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

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    const selectedFootprint = carbonFootprints[option] / totalAnnualFootprint * 100;
    setFootprintPercentage(selectedFootprint > maxPercentagePerPage ? maxPercentagePerPage : selectedFootprint);
  };

  const handleProceed = () => {
    navigation.navigate('Car', { footprintPercentage });
  };

  return (
    <ImageBackground source={require('../assets/images/flight.jpg')} style={styles.backgroundImage}>
      <View style={styles.overlay}>
        <View style={styles.contentContainer}>
          <View style={styles.circularProgressContainer}>
            <Text style={styles.circularProgressTitle}>Percentage Contribution</Text>
            <AnimatedCircularProgress
              size={wp('30%')}
              width={wp('1%')}
              fill={footprintPercentage}
              tintColor="#00e0ff"
              backgroundColor="#fff"
            >
              {() => (
                <Text style={styles.circularProgressText}>
                  {footprintPercentage.toFixed(2)}%
                </Text>
              )}
            </AnimatedCircularProgress>
          </View>

          <View style={[styles.chatBubble, styles.leftChatBubble, selectedOption === null && styles.selectedChatBubble]}>
            <Text style={styles.chatText}>How would you describe your flying habits in a typical average year?</Text>
          </View>

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
                  size={wp('7.5%')}
                  isChecked={selectedOption === option}
                  onPress={() => handleOptionChange(option)}
                  text=''
                  borderColor="#fff"
                  fillColor="#2ecc71"
                  uncheckedColor="#fff"
                  active={selectedOption === option}
                />
                <Image source={getImageSource(option)} style={styles.checkboxIcon} />
                <Text style={styles.checkboxText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <TouchableOpacity style={styles.proceedBtn} onPress={handleProceed}>
          <Text style={styles.proceedBtnText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: "#000A13",
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    padding: wp('5%'),
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
    fontSize: wp('5.5%'),
    color: '#ffff',
    fontFamily: 'ChakraBold',
    marginBottom: hp('2.5%'),
  },
  circularProgressText: {
    fontSize: wp('6%'),
    color: '#fff',
    fontWeight: 'bold',
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

export default Venue;
