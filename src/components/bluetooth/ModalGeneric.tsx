import React, { Component } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

class ModalGeneric extends Component {

  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false
    }
    this.onChange = this.onChange.bind(this)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.modalVisible !== this.props.modalVisible) {
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

  onChange(visible) {
    this.setState({ modalVisible: visible });
    this.props.onChange(visible)
    console.log('\nMODAL GENERIC', visible)
  }


  render() {
    const { modalVisible } = this.state;
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
                  onPress={() => this.setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Conectar</Text>
                </Pressable>

                <Pressable
                  style={[styles.button, styles.buttonUnpaired]}
                  onPress={() => this.setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Desvincular</Text>
                </Pressable>
              </View>

              <View style={styles.footer}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => this.setModalVisible(!modalVisible)}
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
    height:'25%',
    width:'70%',
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
    height:'70%',
    marginTop:'3%'
  },
  buttonConnect: {
    backgroundColor: "#F194FF",
    width:'40%',
    flexDirection:'row',
    justifyContent:'center',
    alignCenter:'center',
  },
  buttonUnpaired: {
    backgroundColor: "#F194FF",
    width:'40%',
    justifyContent:'center',
    alignCenter:'center',
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    width:'80%',
    textAlign: "center",
    textAlignVertical:'center',
    justifyContent:'center',
    alignCenter:'center',
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical:'center'
  },
  modalText: {
    fontSize:20,
    justifyContent:'center',
    alignCenter:'center',
    textAlign: "center",
    textAlignVertical:'center',
  },
  header: {
    flex:1,
    backgroundColor:'orange',
    width:'100%',
    justifyContent:'center',
    alignCenter:'center',
    textAlignVertical:'center'
  },
  body: {
    flex:1,
    flexDirection:'row',
    width:'100%',
    alignItemns: 'center',
    backgroundColor:'skyblue',
    justifyContent:'space-evenly',
    textAlignVertical:'center',
    alingSelf:'center'
  },
  footer: {
    flexDirection:'row',
    backgroundColor:'red',
    width:'100%',
    alignContent:'center',
    justifyContent:'center',
    textAlignVertical:'center',
    flex:1,
  }
});

export default ModalGeneric;