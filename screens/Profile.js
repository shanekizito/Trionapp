import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { IconComponentProvider, Icon } from '@react-native-material/core';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useNavigation and useRoute hooks // Import useNavigation hook
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const MainMenu = () => {
  const navigation = useNavigation(); // Get navigation object
 // const { firstname, email, phoneNumber } = route.params; // Extract parameters from rou
  const route = useRoute(); // Get route object
  const projectImages = [
    { title: 'Ngong Hills Wind Turbine', subtitle: 'Renewable Energy', image: require('../assets/images/forest.jpg') },
    { title: 'Marsabit Solar Farm', subtitle: 'Renewable Energy', image: require('../assets/images/solar.jpg') },
    { title: 'Nairobi Wind Turbine', subtitle: 'Renewable Energy', image: require('../assets/images/energy.jpg') },
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const sliderRef = React.useRef(null);

  const handleSlideChange = (index) => {
    setCurrentIndex(index);
  };

  const onCurrentImagePressed = (index) => {
    sliderRef.current.setCurrentIndex(index);
    setCurrentIndex(index);
  };

  const handleSeeAll = () => {
    navigation.navigate('Preferences'); // Navigate to Projects screen
  };

  const navigateToProfile = () => {
    navigation.navigate('Summary'); // Navigate to Profile screen
  };

  const navigateToSettings = () => {
    navigation.navigate('Profile'); // Navigate to Settings screen
  };

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <ImageBackground source={require('../assets/images/forest.jpg')} style={styles.header}>
            <View style={styles.overlay} />
            <View style={styles.headerContent}>
              <Text style={styles.headerSecondaryText}>Hi Shane </Text>
              <AnimatedCircularProgress
                size={120}
                width={5}
                fill={90}
                tintColor="#00e0ff"
                backgroundColor="#3d5875"
                style={styles.circularProgress}
              >
                {() => (
                  <Text style={styles.circularProgressText}>
                    90%
                  </Text>
                )}
              </AnimatedCircularProgress>
            </View>
            <TouchableOpacity onPress={navigateToProfile} style={[styles.iconContainer, styles.profileIcon]}>
              <MaterialCommunityIcons name="account" size={30} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={navigateToSettings} style={[styles.iconContainer, styles.settingsIcon]}>
              <MaterialCommunityIcons name="cog" size={30} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.tagline}>Kickstart Your Journey to Offset 1.69 Tons of Carbon</Text>
          </ImageBackground>
          <TouchableOpacity style={styles.banner}>
            <Image source={require('../assets/images/mainlogo.png')} style={styles.bannerLogo} />
            <View style={styles.bannerTextContainer}>
              <Text style={styles.bannerTitle}>Start Offsetting</Text>
              <Text style={styles.bannerSubtitle}>Visit Trion's Certified Projects</Text>
            </View>
            <IconComponentProvider IconComponent={MaterialCommunityIcons}>
              <Icon name="chevron-right-circle-outline" size={30} color="#fff" />
            </IconComponentProvider>
          </TouchableOpacity>
          <View style={styles.projectsSection}>
            <View style={styles.sectionTitleContainer}>
              <Text style={styles.sectionTitle}>Our Projects</Text>
              <TouchableOpacity onPress={handleSeeAll}>
                <Text style={styles.seeAllButton}>See All</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.sectionSubtitle}>Visit Trion's Projects</Text>
            <SliderBox
              ref={sliderRef}
              images={projectImages.map(project => project.image)}
              sliderBoxHeight={250}
              onCurrentImagePressed={onCurrentImagePressed}
              dotColor="#00A36C"
              dotStyle={{ width: 10, height: 10, borderRadius: 5, marginHorizontal: 0, marginVertical: 30 }}
              inactiveDotColor="#90A4AE"
              autoplay
              circleLoop
              ImageComponentStyle={styles.sliderImageComponentStyle}
              paginationBoxStyle={styles.paginationBoxStyle}
            />
            <View style={styles.captionContainer}>
              <Text style={styles.captionTitle}>{projectImages[currentIndex].title}</Text>
              <Text style={styles.captionSubtitle}>{projectImages[currentIndex].subtitle}</Text>
            </View>
          </View>
        </>
      }
      data={[]} // Adjusted to avoid warning, provide your actual data array here
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.contentContainer} // Updated to use contentContainerStyle for proper scrolling
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1, // Ensure the content can scroll properly
    paddingBottom: 20, // Add padding at the bottom for better spacing
  },
  container: {
    backgroundColor: '#f5f5f5', // Set the background color for the entire screen
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 400,
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  headerContent: {
    flexDirection: 'column', // Adjusted to column for better alignment
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  headerSecondaryText: {
    fontSize: 30,
    fontFamily: 'ChakraBold',
    color: 'white',
    marginVertical: 20,
  },
  circularProgress: {
    marginVertical: 10,
  },
  circularProgressText: {
    fontSize: 24, // Adjusted font size
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'ChakraBold',
  },
  tagline: {
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
    width: '50%',
    fontFamily: 'ChakraBold',
  },
  iconContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 10,
  },
  profileIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  settingsIcon: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2ecc71',
    marginHorizontal: 20,
    marginTop: -30,
    padding: 20,
    borderRadius: 20,
    height: 145,
    zIndex: 1,
    elevation: 1,
  },
  bannerLogo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  bannerTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  bannerTitle: {
    fontSize: 28,
    fontFamily: 'ChakraBold',
    color: 'white',
  },
  bannerSubtitle: {
    fontSize: 18,
    color: 'white',
    marginTop: 5,
    fontFamily: 'ChakraBold',
  },
  projectsSection: {
    padding: 20,
    paddingTop: 40, // to create space for the overlapping banner
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 26, // Increased font size
    fontWeight: 'bold',
    color: '#00A36C',
  },
  seeAllButton: {
    fontSize: 16,
    color: '#00A36C',
    fontWeight: 'bold',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    elevation: 1,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: 'rgba(0, 163, 108, 0.2)',
    marginBottom: 20,
    fontWeight: '600',
  },
  sliderImageComponentStyle: {
    borderRadius: 15,
    width: '100%', // Adjusted to fit screen with margins
    marginHorizontal: 10, // Left and right margin
    elevation: 5,
  },
  paginationBoxStyle: {
    position: 'absolute',
    bottom: -30,
    padding: 0,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  captionContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  captionTitle: {
    fontSize: 22, // Increased font size
    fontWeight: 'bold',
    color: '#00A36C', // Main title color
    marginTop: 15,
  },
  captionSubtitle: {
    fontSize: 16, // Increased font size
    color: 'rgba(0, 163, 108, 0.2)', // Subtitle color
    marginTop: 5,
  },
});

export default MainMenu;
