import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, ImageBackground } from 'react-native';
import { BarChart } from "react-native-gifted-charts";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const screenWidth = Dimensions.get("window").width;

const Summary = ({ navigation, route }) => {
  const { footprintPercentage } = route.params || { footprintPercentage: 0 };
  const userFootprint = 2.95; // User's footprint in T
  const worldFootprint = 4.5; // Average world footprint in T

  const barData = [
    { value: 90, label: 'Diet', spacing: 45,labelTextStyle: {color: '#c2c0c4'}, frontColor: '#2ecc71',
    },
    { value: 60, label: 'Mobility', frontColor: '#2ecc71',labelTextStyle: {color: '#c2c0c4'}, spacing: 45, 
    },
    { value: 10, label: 'Bills', frontColor: '#2ecc71', spacing: 45,labelTextStyle: {color: '#c2c0c4'},
    },
    { value: 60, label: 'Energy', spacing: 45,frontColor: '#2ecc71',labelTextStyle: {color: '#c2c0c4'},
    },
    { value: 55, label: 'Power', frontColor: '#2ecc71', spacing: 45,labelTextStyle: {color: '#c2c0c4'}, 
    },
  ];

  const renderTopLabel = (value, index) => {
    // Customize this function to return your desired Image component
    let imageSource;
    switch (index) {
      case 1:
        imageSource = require('../assets/images/vegeterian.png');
        break;
      case 2:
        imageSource = require('../assets/images/plane2.png');
        break;
      case 3:
        imageSource = require('../assets/images/plane2.png');
        break;
      case 4:
        imageSource = require('../assets/images/plane2.png');
        break;
      default:
        imageSource = require('../assets/images/car2.png');
        break;
    }

    return (
      <Image
        source={imageSource}
        style={{ width: 24, height: 24, marginBottom: 6 }}
      />
    );
  };

  return (
   
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.mainTitle}>CO₂ Contribution Summary</Text>
        <View style={styles.upperSection}>
          {/* Annual CO2 Contribution Card */}
          <View style={[styles.cardContainer, { backgroundColor: '#2ecc71' }]}>
            <Image
              source={require('../assets/images/chart.png')}
              style={styles.logoImage}
            />
            <Text style={[styles.cardTitle,{ color: '#ffff' }]}>Annual  Contribution</Text>
            <Text style={[styles.cardValue,{ color: '#ffff' }]}>{userFootprint} tons</Text>
          </View>

          {/* Average World Card */}
          <View style={[styles.cardContainer, { backgroundColor: '#ffff' }]}>
            <Image
              source={require('../assets/images/world.png')}
              style={styles.logoImage}
            />
            <Text style={[styles.cardTitle,{color:"#2ecc71"}]}>Average World</Text>
            <Text style={[styles.cardValue,{color:"#2ecc71"}]}>{worldFootprint} tons</Text>
          </View>
        </View>

        {/* Lower Section */}
        <View style={styles.lowerSection}>
          {/* Bar Chart Section */}
          <View style={[styles.chartContainer, { backgroundColor: '#ffff' }]}>
            <Text style={styles.chartTitle}>CO₂ Footprint by Activity</Text>
            <BarChart
              barWidth={15}
              noOfSections={3}
              hideRules
              barBorderRadius={4}
              frontColor="#ffa1a1"
              data={barData}
              yAxisThickness={0} // Removed y-axis labels
              xAxisThickness={0}
              width={screenWidth * 0.9} // Adjusted width to fill the card
              height={100} // Reduced height for better fitting
              topLabelComponent={({ value, index }) => renderTopLabel(value, index)}
            />
          </View>
        </View>

        {/* Proceed Button */}
        <TouchableOpacity style={styles.proceedBtn} onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.proceedBtnText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    padding: wp('5%'),
    paddingTop: hp('5%'),
    paddingBottom: hp('5%'),
    backgroundColor: '#fff',
  },
  upperSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('3%'),
  },
  lowerSection: {
    alignItems: 'center',
  },
  cardContainer: {
    width: '48%',
    alignItems: 'center',
    padding: wp('4%'),
    borderRadius: wp('2.5%'),
    elevation: 1,
    backgroundColor: '#fff',
    marginBottom: hp('3%'),
    overflow: 'hidden',
    position: 'relative',
    height: hp('20%'),
    display: 'flex',
    justifyContent: 'center',
  },
  logoImage: {
    position: 'absolute',
    top: hp('2%'),
    left: hp('2%'),
    width: wp('9%'),
    height: wp('9%'),
    resizeMode: 'contain',
  },
  cardTitle: {
    fontSize: wp('4.5%'),
    marginTop: hp('2%'),
    marginBottom: hp('3%'),
    textAlign: 'center',
    fontFamily: 'ChakraRegular',
  },
  mainTitle: {
    fontSize: wp('6%'),
    fontFamily: 'ChakraBold',
    color: '#000',
    marginBottom: hp('5%'),
    textAlign: 'center',
  },
  cardValue: {
    fontSize: wp('7.5%'),
    fontFamily: 'ChakraBold',
    color: '#333',
    textAlign: 'center',
  },
  chartContainer: {
    marginBottom: hp('3%'),
    alignItems: 'center',
    padding: wp('5%'),
    borderRadius: wp('2.5%'),
    elevation: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  chartTitle: {
    fontSize: wp('4.5%'),
    color: '#2ecc71',
    marginBottom: hp('3%'),
    textAlign: 'center',
    fontFamily: 'ChakraBold',
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
  },
});

export default Summary;





