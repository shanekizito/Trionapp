import React, { useState } from 'react';
import { TouchableOpacity, Text, View, ImageBackground, StyleSheet } from 'react-native';
import { TextInput } from "@react-native-material/core";
import { HomeHeaderWhite } from '../components';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Venue = ({ navigation }) => {
  const [address, setAddress] = useState('');
  const [amount ,setAmount] = useState ('');

  const handlePastePress = async () => {
    const clipboardContent = await Clipboard.getString();
    setAddress(clipboardContent);
  };

  const handleCopyPress = () => {
    Clipboard.setString(address);
  };

  const AppButton = ({ title }) => (
    <TouchableOpacity onPress={()=>navigation.navigate('SingleTicket')} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>
        {title}</Text>
    </TouchableOpacity>
  );

  const AllButton = ({ title }) => (
    <TouchableOpacity onPress={onHandleSignup} style={styles.allButtonContainer}>
      <Text style={styles.allButtonText}>
        All</Text>
    </TouchableOpacity>
  );

  const pasteButton = ({ title }) => (
    <TouchableOpacity  style={styles.allButtonContainer}>
      <MaterialCommunityIcons name="content-paste" color={"#ffff"} size={25} />
    </TouchableOpacity>
  );

  const onHandleSignup = () => {
    if (email !== '' && password !== '') {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => console.log('Signup success'))
        .catch((err) => Alert.alert("Login error", err.message));
    }
  };

  const handleAddressChange = (value) => {
    setAddress(value);
  };

  const  handleAmountChange= (value) =>{
  setAmount(value);
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <HomeHeaderWhite header={"TRANSFER"} navigation={navigation} />
        <Text style={{ fontFamily: "ubuntu", fontSize: 25, marginLeft: 20, marginTop: 30 }}>sending bitzza</Text>
        <View style={styles.Inputscontainer}>
          <TextInput
            inputContainerStyle={{ color: "black", borderRadius: 16 }}
            variant="filled" label="paste address" style={{ margin: 19, borderRadius: 160, marginBottom: 20 }} color="rgb(97, 23, 244)"
            trailing={pasteButton}
            value={address}
            onChangeText={handleAddressChange}
          />
          <TextInput variant="filled"
            label="amount" style={{ margin: 19, borderRadius: 15, marginBottom: 20 }} color="rgb(97, 23, 244)"
            onChangeText={handleAmountChange}
            keyboardType={'numeric'}
            value={amount}
            trailing={AllButton}
          />
          <View style={{ width: "95%", alignItems: "flex-end" }}>
            <Text style={{ fontFamily: "Ubuntu", color: "grey", fontSize: 20 }}>123.43 btz</Text>
          </View>
          <AppButton title={'send'} />

          <View style={styles.learnMoreContainer}>
            <ImageBackground
              source={require("../assets/images/matic.png")}
              style={{
                position: "absolute",
                marginLeft: 20,
                alignSelf: "flex-end",
                width: 150,
                height: 140,
                resizeMode: "cover",
                justifyContent: "center",
              }}
            >
            </ImageBackground>
            <Text style={styles.learnMoreContainerText}>

              Make sure you are using the correct polygon chain address
            </Text>
            <Text style={styles.learnMoreContainerTextLittle}>
              {" "}
              More info here
            </Text>

          </View>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Inputscontainer: {
    marginTop: 10
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
  },
  learnMoreContainer: {
    backgroundColor: "rgb(97, 23, 244)",
    height: 160,
    alignItems: "flex-start",
    width: "95%",
    padding: 20,
    borderRadius: 10,
    marginLeft: 10,
    marginTop: 50,
    marginBottom: 10,
    fontSize: 45,
    color: "#000",
    elevation: 3,
  },
  learnMoreContainerText: {
    fontFamily: "Ubuntu",
    fontSize: 21,
    alignItems: "flex-start",
    color: "#fff",
    marginTop: 10,
  },
  learnMoreContainerTextLittle: {
    fontFamily: "Ubuntu",
    fontSize: 16,
    backgroundColor: "purple",
    width: 140,
    padding: 10,
    borderRadius: 5,
    color: "#fff",
    marginTop: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: 'blue',
    paddingVertical: 10,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  appButtonContainer: {
    backgroundColor: "rgb(97, 23, 244)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    color: "#ffff",
    marginTop: 18,
    borderRadius: 15,
    width: 370,
    height: 50,
    paddingVertical: 9,
    paddingHorizontal: 5,
  },
  allButtonContainer: {
    width: 65,
    backgroundColor: "rgb(97, 23, 244)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 53,
    borderRadius: 0,
    marginRight: 20,
  },
  allButtonText: {
    fontSize: 15,
    color: "#ffff",
    alignSelf: "center",
    fontFamily: "RalewayBold",
  },
  appButtonText: {
    fontSize: 20,
    color: "#fff",
    alignSelf: "center",
    fontFamily: "RalewayBold",
  },
})

export default Venue;
