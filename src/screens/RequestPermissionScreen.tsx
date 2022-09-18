import React from "react";
import { Button, PermissionsAndroid,Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

const requestPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

const checkPermission= async()=>{
  console.log('enter to validate permission')
  const permissionCamera= await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)
  // .then(response =>{ console.log('response',response)})
  // .error(error => console.log('error',error))
  console.log('permission camera', permissionCamera)

  if(Platform.OS=="android"){
    const permissionAndroid = await PermissionsAndroid.check('android.permission.CAMERA');
    if(permissionAndroid != PermissionsAndroid.RESULTS.granted){
      const reqPer = await PermissionsAndroid.request('android.permission.CAMERA');
      if(reqPer != 'granted'){
        console.log('permission doesnt granted')
        return false;
      }
    }
  }
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
