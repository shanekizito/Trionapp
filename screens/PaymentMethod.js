import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Dimensions } from 'react-native';

const PaymentMethod = () => {
  const [paymentOption, setPaymentOption] = useState(null);

  const handleSelectOption = (option) => {
    setPaymentOption(option);
  };

  const windowHeight = Dimensions.get('window').height; // Get the window height

  return (
    <ScrollView contentContainerStyle={[styles.container, { minHeight: windowHeight }]}>
      <Text style={styles.title}>Summary</Text>
      <View style={styles.mainCard}>
        <Text style={styles.annualOffsetsTitle}>Annual offsets</Text>
        <Text style={styles.annualOffsetsValue}>2.06</Text>
        <Text style={styles.annualOffsetsUnit}>Tons in CO2</Text>
        <View style={styles.summaryCardsContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryCardTitle}>Footprint Coverage</Text>
            <Text style={styles.summaryCardValue}>120%</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryCardTitle}>Monthly Charge</Text>
            <Text style={styles.summaryCardValueBlue}>$2.24</Text>
          </View>
        </View>
      </View>
      <Text style={styles.paymentOptionsTitle}>Choose Payment Options</Text>
      <View style={styles.paymentOptionsContainer}>
        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentOption === 'creditCard' && styles.selectedPaymentOption,
          ]}
          onPress={() => handleSelectOption('creditCard')}
        >
          <Image source={require('../assets/images/card.png')} style={styles.paymentLogo} />
          <Text style={styles.paymentOptionText}>Credit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.paymentOption,
            paymentOption === 'mpesa' && styles.selectedPaymentOption,
          ]}
          onPress={() => handleSelectOption('mpesa')}
        >
          <Image source={require('../assets/images/mpesa.png')} style={styles.paymentLogo} />
          <Text style={styles.paymentOptionText}>Mobile Money (M-Pesa)</Text>
        </TouchableOpacity>
      </View>
      {paymentOption === 'creditCard' && (
        <View style={styles.paymentDetails}>
          <TextInput style={styles.input} placeholder="Card Number" keyboardType="number-pad" />
          <TextInput style={styles.input} placeholder="Expiry Date (MM/YY)" keyboardType="number-pad" />
          <TextInput style={styles.input} placeholder="CVV" keyboardType="number-pad" secureTextEntry />
        </View>
      )}
      {paymentOption === 'mpesa' && (
        <View style={styles.paymentDetails}>
          <TextInput style={styles.input} placeholder="M-Pesa Number" keyboardType="phone-pad" />
        </View>
      )}
      <View style={styles.termsContainer}>
        <Text style={styles.termsTitle}>Subscription Terms</Text>
        <Text style={styles.termsText}>
          Your subscription will automatically renew each month. You will be charged the applicable monthly fee, which may change based on your selected offset level. You can cancel your subscription at any time through your account settings.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  mainCard: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 30,
  },
  annualOffsetsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#a9a9a9',
    textAlign: 'center',
    marginBottom: 10,
  },
  annualOffsetsValue: {
    fontSize: 45,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
  },
  annualOffsetsUnit: {
    fontSize: 22,
    color: '#a9a9a9',
    textAlign: 'center',
    marginBottom: 20,
  },
  summaryCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryCard: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  summaryCardTitle: {
    fontSize: 18,
    color: '#a9a9a9',
    marginBottom: 5,
  },
  summaryCardValue: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  summaryCardValueBlue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  paymentOptionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  paymentOptionsContainer: {
    marginBottom: 30,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0', // Fainter border color
    marginBottom: 20,
    width: '95%',
    alignSelf: 'center',
  },
  selectedPaymentOption: {
    borderColor: '#007BFF',
    backgroundColor: '#E7F0FF',
  },
  paymentLogo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  paymentOptionText: {
    fontSize: 18,
  },
  paymentDetails: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
  },
  termsContainer: {
    marginTop: 20,
  },
  termsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  termsText: {
    fontSize: 14,
    color: '#666',
  },
});

export default PaymentMethod;
