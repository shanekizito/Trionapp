import React, { useEffect, useState, useCallback } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import axios from 'axios';
import {  HomeHeaderWhite } from "../components";


const ChatScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const onSend = useCallback(async (newMessages = []) => {
    const userMessage = newMessages[0].text;
    setMessages((prevMessages) =>
      GiftedChat.append(prevMessages, [
        {
          _id: Math.random().toString(36).substring(7),
          text: userMessage,
          createdAt: new Date(),
          user: {
            _id: 1,
          },
        },
      ]),
    );
    setIsTyping(true);
    try {
      const response = await axios.post('https://app-8ade6ee5-d556-41d6-969e-cafc4be2d9b6.cleverapps.io/questions', {
        message: userMessage,
      });
      const aiMessage = response.data;
      setMessages((prevMessages) =>
        GiftedChat.append(prevMessages, [
          {
            _id: Math.random().toString(36).substring(7),
            text: aiMessage,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'ChatGPT3',
              avatar: 'https://img.icons8.com/ios-filled/100/null/go.png',
            },
          },
        ]),
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsTyping(false);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
     <HomeHeaderWhite header="Ask GO AI " navigation={navigation}/>
      <View style={styles.chatContainer}>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
          renderBubble={(props) => {
            return (
              <Bubble
                {...props}
                textStyle={{
                  right: {
                    color: 'black',
                    fontFamily: 'sans-serif',
                  },
                  left: {
                    color: 'white',
                    fontFamily: 'sans-serif',
                  },
                }}
                wrapperStyle={{
                  left: {
                    backgroundColor: '#070f1abe',
                  },
                  right: {
                    backgroundColor: '#d9d9d9',
                  },
                }}
              />
            );
          }}
          renderChatEmpty={() => {
            return (
              <View style={styles.chatEmptyContainer}>
                <Text style={styles.chatText}>Ask Go AI best travel destinations to visit or fun activities to do in your area today . Have fun !</Text>
              </View>
            );
          }}
          renderFooter={() => {
            if (isTyping) {
              return (
                <View style={styles.typingContainer}>
                  <Text style={styles.typingText}>Go AI is typing...</Text>
                </View>
              );
            } else {
              return null;
            }
          }}
          
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    marginBottom: 80,
    flex: 1,
   
  },
  chatEmptyContainer:{
    transform: [ { scaleY: -1 } ],
    marginBottom: 100,
    flex:3,
    width:"95%",
    alignItems:'center'
  },
  typingContainer: {
    alignSelf: 'center',
    marginVertical: 10,
   
  },
  typingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey',
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey',
  },
  chatText:{
  marginLeft:10,
   fontSize: 23,
   fontWeight: 'RalewayBold',
    color: 'grey',
  },
  typingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey',
  },
});

export default ChatScreen;
