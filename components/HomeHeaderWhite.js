import React from "react";
import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from "react-native";
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useBottomSheetModal } from '@gorhom/bottom-sheet';

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const styles = StyleSheet.create({
  homeHeaderContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginTop: 30,
    height: 65,
    elevation: 2,
    paddingLeft: 16,
    paddingRight: 16,
  },
  headerText: {
    fontFamily: 'RalewayBold',
    fontSize: 18,
    color: '#363636',
    textAlign: 'center',
    flex: 1,
  },
  backButtonContainer: {
    borderRadius: 50,
    backgroundColor: 'transparent', // Transparent background
    marginLeft: 5,
  },
  iconStyle: {
    fontSize: 40,
    marginLeft: 0,
    color: '#ffff', // MediumSeaGreen
  },
});

const HomeHeaderWhite = ({ header, navigation }) => {
  const { dismissAll } = useBottomSheetModal();

  const BackButton = () => (
    <TouchableOpacity
      style={styles.backButtonContainer}
      onPress={() => {
        dismissAll();
        navigation.goBack();
      }}
    >
      <MaterialCommunityIcons name="arrow-left-circle" style={styles.iconStyle} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.homeHeaderContainer}>
      <StatusBar hidden />
      <BackButton />
      <Text style={styles.headerText}>{header}</Text>
    </View>
  );
};

export default HomeHeaderWhite;
