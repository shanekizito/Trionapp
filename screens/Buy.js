import React from 'react';
import { View, Text, StyleSheet,ImageBackground } from 'react-native';

const Buy = () => {
  const thoughts = [
    "This is a thought bubble.",
    "I have cats.",
    "This is a CodePen on the internet.",
    "Qui inventore asperiores ipsum asperiores. Ullam voluptas quia quia voluptatem accusantium iste corrupti. Voluptatum deserunt vitae inventore.",
    "This is another thought bubble.",
    "I would walk a thousand miles just to see if you put your name in the Goblet of Fire, Harry.",
    "🆒",
  ];

  return (
    <View style={styles.container}>
      <ImageBackground
         source={require("../assets/images/background.jpg")}
        style={styles.imageBackground}
        resizeMode="cover"
      >
      {thoughts.map((thought, index) => (
        <View key={index} style={styles.thought}>
          <Text style={styles.thoughtText}>{thought}</Text>
        </View>
      ))}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  thought: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 30,
    minWidth: 40,
    maxWidth: 220,
    minHeight: 40,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  thoughtText: {
    fontFamily: 'Ubuntu', // Adjust to your desired font family
    fontSize: 16,
    color: '#333',
  },
});

export default Buy;
