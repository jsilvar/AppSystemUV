import React, { Component } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

class ModalGeneric extends React.Component {

  constructor(props){
    super(props)
    this.state={
      modalVisible: false
    }
    this.onChange=this.onChange.bind(this)
  }

  componentDidUpdate(prevProps){
    if(prevProps.modalVisible!==this.props.modalVisible){
        console.log('COMPONENT DID UPDATE MODAL GENERIC')
        console.log('\n UPDATE MODAL GENERIC',)
        this.setState({
            modalVisible: this.props.modalVisible 
        })
    }
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
    this.onChange(visible)
  }

  onChange(visible){
    this.setState({ modalVisible: visible });
    this.props.onChange(visible)
    console.log('\nMODAL GENERIC',visible)
  }


  render() {
    const { modalVisible } = this.state;
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {

  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default ModalGeneric;