import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';

const PaymentPage = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    {
      id: 1,
      percentage: '100%',
      price: '$2.73 per month',
      offset: '2.52 tons of CO2 per year',
    },
    {
      id: 2,
      percentage: '120%',
      price: '$3.28 per month',
      offset: '3.02 tons of CO2 per year',
    },
    {
      id: 3,
      percentage: '200%',
      price: '$5.46 per month',
      offset: '5.04 tons of CO2 per year',
    },
  ];

  const handleSelectOption = (id) => {
    setSelectedOption(id);
  };

  const handleSelectButton = () => {
    if (selectedOption !== null) {
      navigation.navigate('PaymentMethod');
    } else {
      alert('Please select an option');
    }
  };

  const windowHeight = Dimensions.get('window').height; // Get the window height

  return (
    <ScrollView contentContainerStyle={[styles.container, { minHeight: windowHeight }]}>
      <View style={styles.header}>
        <Image source={require('../assets/images/earth.png')} style={styles.logo} />
        <Text style={styles.title}>Thanks for taking climate action</Text>
        <Text style={styles.minititle}>Choose your impact</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>I want to offset...</Text>
        {options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.option,
              selectedOption === option.id && styles.selectedOption,
            ]}
            onPress={() => handleSelectOption(option.id)}
          >
            <Text style={styles.optionPercentage}>{option.percentage} of my footprint</Text>
            <Text style={styles.optionPrice}>{option.price}</Text>
            <Text style={styles.optionOffset}>{option.offset}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.selectButton} onPress={handleSelectButton}>
        <Text style={styles.selectButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 60,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  minititle: {
    fontSize: 22,
    textAlign: 'center',
    marginTop: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
  },
  selectedOption: {
    borderColor: '#007BFF',
    backgroundColor: '#E7F0FF',
  },
  optionPercentage: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  optionPrice: {
    fontSize: 14,
    color: '#007BFF',
    marginVertical: 5,
  },
  optionOffset: {
    fontSize: 12,
    color: '#666',
  },
  selectButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentPage;
