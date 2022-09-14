import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import {BLUETOOTH_DEVICE_CONNECT_SCREEN} from '../../constants/GlobalConstant'

interface Props {
  modalVisible: boolean;
  deviceUnique: any;
  connect(device: any): void;
  disconnect(device: any): void;
  onChange(visible: boolean): void;
}


export const ModalGeneric = (props: Props) => {

  const [modalVisible, setModal] = useState(props.modalVisible)
  const [deviceUnique, setDeviceUnique] = useState(props.deviceUnique)

  useEffect(() => {
    setModal(props.modalVisible)
    setDeviceUnique(props.deviceUnique)
  }, [props.modalVisible, props.deviceUnique])

  const setModalVisible = (visible) => {
    setModal(visible)
    onChange(visible)
  }

  const onChange = (visible) => {
    setModal(visible)
    props.onChange(visible)
  }

  const connect = () => {
    setModalVisible(!modalVisible)
    props.connect(deviceUnique)
  }

  const disconnect = () => {
    setModalVisible(!modalVisible)
    props.disconnect(deviceUnique)
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text style={styles.modalText}>{BLUETOOTH_DEVICE_CONNECT_SCREEN.MODAL.TITLE}</Text>
            </View>
            <View style={styles.separator}></View>
            <View style={styles.body}>
              {props.deviceUnique!=null && !props.deviceUnique.connected && (
                <Pressable
                  style={[styles.button, styles.buttonConnect]}
                  onPress={connect}
                >
                  <Text style={styles.textStyle}>{BLUETOOTH_DEVICE_CONNECT_SCREEN.MODAL.CONNECT_BUTTON}</Text>
                </Pressable>
              )}
              {props.deviceUnique!=null && props.deviceUnique.connected && (
                <Pressable
                  style={[styles.button, styles.buttonDisconnect]}
                  onPress={disconnect}
                >
                  <Text style={styles.textStyle}>{BLUETOOTH_DEVICE_CONNECT_SCREEN.MODAL.DISCONNECT_BUTTON}</Text>
                </Pressable>
              )}
            </View>

            <View style={styles.footer}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>{BLUETOOTH_DEVICE_CONNECT_SCREEN.MODAL.CLOSE_BUTTON}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal >
    </View >
  );
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(52,52,52,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  separator: {
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
    width: '95%'
  },
  modalView: {
    flexDirection: 'column',
    height: '25%',
    width: '70%',
    margin: 0,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    elevation: 2,
    height: '70%',
    marginTop: '3%'
  },
  buttonConnect: {
    backgroundColor: "#7f1ae5",
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisconnect:{ 
    backgroundColor: "red",
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
  },
  buttonClose: {
    height: '100%',
    backgroundColor: "#2196F3",
    width: '100%',
    textAlign: "center",
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: 'center',
    fontSize: 20,
  },
  modalText: {
    fontSize: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: "center",
    textAlignVertical: 'center',
  },
  header: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center'
  },
  body: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    textAlignVertical: 'center',
    alignSelf: 'center'
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    flex: 1,
  }
});

export default ModalGeneric;