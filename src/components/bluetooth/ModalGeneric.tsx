import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

interface Props {
  modalVisible: boolean;
  deviceUnique:any;
  connect(device:any):void;
  disconnect(device:any):void;
  onChange(visible: boolean): void;
}


export const ModalGeneric = (props: Props) => {

  const [modalVisible, setModal] = useState(props.modalVisible)
  const [deviceUnique,setDeviceUnique]=useState(props.deviceUnique)

  useEffect(() => {
    setModal(props.modalVisible)
    setDeviceUnique(props.deviceUnique)
  }, [props.modalVisible,props.deviceUnique])

  const setModalVisible = (visible) => {
    setModal(visible)
    onChange(visible)
  }

  const onChange = (visible) => {
    setModal(visible)
    props.onChange(visible)
    console.log('MODAL GENERIC', visible)
  }

  const connect=()=>{
    console.log('connect',deviceUnique)
    setModalVisible(!modalVisible)
    props.connect(deviceUnique)
  }

  const disconnect=()=>{
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
              <Text style={styles.modalText}>ESCOJA UNA OPCIÓN</Text>
            </View>
            <View style={styles.body}>
              <Pressable
                style={[styles.button, styles.buttonConnect]}
                onPress={connect}
              >
                <Text style={styles.textStyle}>Conectar</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonUnpaired]}
                onPress={disconnect}
              >
                <Text style={styles.textStyle}>Desvincular</Text>
              </Pressable>
            </View>

            <View style={styles.footer}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(52,52,52,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    flexDirection: 'column',
    height: '25%',
    width: '70%',
    margin: 0,
    backgroundColor: "red",
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
    backgroundColor: "#F194FF",
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonUnpaired: {
    backgroundColor: "#F194FF",
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    width: '80%',
    textAlign: "center",
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: 'center'
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
    backgroundColor: 'orange',
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
    backgroundColor: 'skyblue',
    justifyContent: 'space-evenly',
    textAlignVertical: 'center',
    alignSelf: 'center'
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: 'red',
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    flex: 1,
  }
});

export default ModalGeneric;