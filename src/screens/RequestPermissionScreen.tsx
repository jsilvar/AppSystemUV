import React from "react";
import { Button, PermissionsAndroid,Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

import {check, request, checkNotifications,PERMISSIONS, RESULTS} from 'react-native-permissions';

const requestPermission = async () => {
  console.log('request permission')

  await request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT).then((result) => {
    console.log('request: ', result)
  });

  await check(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT)
  .then((result) => {
    switch (result) {
      case RESULTS.UNAVAILABLE:
        console.log('This feature is not available (on this device / in this context)');
        break;
      case RESULTS.DENIED:
        console.log('The permission has not been requested / is denied but requestable');
        break;
      case RESULTS.LIMITED:
        console.log('The permission is limited: some actions are possible');
        break;
      case RESULTS.GRANTED:
        console.log('The permission is granted');
        break;
      case RESULTS.BLOCKED:
        console.log('The permission is denied and not requestable anymore');
        break;
    }
  })
  .catch((error) => {
    // …
  });
  
};

const checkPermission= async()=>{
  console.log('enter to validate permission')

  let response = await check(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT); // <-- always blocked
    let isPermissionsGranted = false;

    if (response === RESULTS.GRANTED) {
        isPermissionsGranted = true;
    } else if (response === RESULTS.DENIED) {
        response = request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT, {
            title: "FreeLine requires permission",
            message: "FreeLine needs access to your location so you can see your position",
            buttonPositive: "Ok",
            buttonNegative: "Don't show my position",
        });

        if (response === RESULTS.GRANTED) {
            isPermissionsGranted = true;
        } else if (response === RESULTS.DENIED) {
            //await openSettings();
        }
    }

    return isPermissionsGranted;

}

export const RequestPermissionScreen = () => (
  <View style={styles.container}>
    <Text style={styles.item}>Try permissions</Text>
    <Button title="check permission" onPress={checkPermission} />
    <Button title="request permissions" onPress={requestPermission} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  }
});
