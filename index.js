/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);

async function onMessageReceived(message) {
    var messages = JSON.parse(JSON.stringify(message));
    var title = messages.notification.title;
    var description = messages.notification.body;
    console.log('Title >>>' + title);
    console.log('Body >>>' + description);
    onDisplayNotification(title,description);
  }

  async function onDisplayNotification(title,description) {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Firebase demo notification',
    });

    // Display a notification
    await notifee.displayNotification({
      title: title,
      body: description,
      android: {
        channelId,
        actions: [
          {
            title: 'Reply',
            pressAction: {
              id: 'reply',
            },
            input: {
              allowFreeFormInput: false, // set to false
              choices: ['Yes', 'No', 'Maybe'],
              placeholder: 'Reply to message...',
            },
          },
        ],
        // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
      },
    });
  }

  function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
      // App has been launched in the background by iOS, ignore
      return null;
    }
  
    return <App />;
  }

AppRegistry.registerComponent(appName, () => HeadlessCheck);
