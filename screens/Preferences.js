import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, SafeAreaView, Dimensions } from 'react-native'; // Import Dimensions from react-native
import HomeHeaderWhite from "../components/HomeHeaderWhite";
import { COLORS } from "../constants";

// Sample local images for each mood
const efficientEnergy = require('../assets/images/energy.jpg');
const community = require('../assets/images/community.jpg');
const forest = require('../assets/images/forest.jpg');
const factoryGas = require('../assets/images/factory-gas.jpg');
const waterTank = require('../assets/images/water-tank.jpg');
const bulb = require('../assets/images/bulb.jpg');

const Preferences = ({ navigation }) => {
  const [selectedIndices, setSelectedIndices] = useState([]);

  const toggleSelection = (index) => {
    const newSelectedIndices = [...selectedIndices];
    const indexOfIndex = newSelectedIndices.indexOf(index);
    if (indexOfIndex > -1) {
      newSelectedIndices.splice(indexOfIndex, 1);
    } else {
      newSelectedIndices.push(index);
    }
    setSelectedIndices(newSelectedIndices);
  };

  const windowWidth = Dimensions.get('window').width; // Get the window width

  const DATA = [
    { mood: "Afforestation and Reforestation", id: 1, banner: forest },
    { mood: "Renewable Energy Projects", id: 2, banner: efficientEnergy },
    { mood: "Methane Capture and Utilization", id: 3, banner: factoryGas },
    { mood: "Community-Based Projects", id: 4, banner: community },
    { mood: "Climate Adaptation and Resilience", id: 5, banner: waterTank },
    { mood: "Energy Efficiency Improvements", id: 7, banner: bulb },
  ];

  const CloseAppButton = () => (
    <TouchableOpacity onPress={() => navigation.navigate('Payment')} style={styles.proceedBtn}>
      <Text style={styles.closeAppButtonText}>Select</Text>
    </TouchableOpacity>
  );

  const Item = ({ mood, banner, id }) => {
    const isSelected = selectedIndices.includes(id);

    return (
      <TouchableOpacity style={[styles.item, { width: windowWidth * 0.45 }]} onPress={() => toggleSelection(id)}>
        <Image style={styles.image} source={banner} />
        <Text style={styles.mood}>{mood}</Text>
        <View style={[styles.overlay, { backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.5)' : 'rgba(22, 21, 21, 0.4)' }]} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContent}>
        <Image source={require('../assets/images/mainlogo.png')} style={styles.logo} />
        <Text style={styles.headerText}>Trion Energy</Text>
      </View>
      <Text style={styles.header}>Which offsetting efforts are meaningful to you?</Text>
      <FlatList
        numColumns={2}
        contentContainerStyle={styles.flatList}
        data={DATA}
        renderItem={({ item }) => <Item mood={item.mood} id={item.id} banner={item.banner} />}
        keyExtractor={item => item.id.toString()}
      />
      <View style={styles.buttonContainer}>
        <CloseAppButton />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  header: {
    fontFamily: 'sans-serif',
    fontSize: 20,
    marginHorizontal: 20,
    marginBottom: 15,
    textAlign: 'center',
    color: '#00A36C', // Updated color
  },
  flatList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  item: {
    aspectRatio: 1,
    margin: 5,
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 1, // Add elevation here
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  mood: {
    position: "absolute",
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    backgroundColor: 'rgba(24, 24, 24, 0.4)',
    color: '#ffff',
    paddingVertical: 5,
    fontSize: 20,
    fontFamily: 'sans-serif',
    fontWeight: '500',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  proceedBtn: {
    backgroundColor: '#2ecc71',
    borderRadius: 10,
    width: '80%',
    padding: 15,
    marginTop: 20, // Adjusted margin to move it lower
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeAppButtonText: {
    fontSize: 17,
    fontFamily: 'sans-serif',
    color: "#fff",
    marginRight: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 18, // Adjusted marginBottom to create more space
  },
  headerContent: {
    flexDirection: 'row',
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
  },
  headerText: {
    fontFamily: 'sans-serif',
    fontSize: 24,
    color: '#00A36C',
  },
});

export default Preferences;
