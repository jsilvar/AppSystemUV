import React from "react";
import {
  ScrollView,
  Text,
  TouchableHighlight,
  View,
  RefreshControl,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Item,
  StatusBar
} from "react-native";
//import styles from "../../styles/styles";
import RowDevice from "./RowDevice";
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "d7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Fourth Item",
  },
  {
    id: "ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Fifth Item",
  },
  {
    id: "8694a0f-3da1-471f-bd96-145571e29d72",
    title: "Sixth Item",
  },
  {
    id: "7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Seventh Item",
  },
  {
    id: "c68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Eighth Item",
  },
  {
    id: "694a0f-3da1-471f-bd96-145571e29d72",
    title: "Ninth Item",
  },
];

class DeviceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null,
      devices:this.props.devices
    }
    this.onPress=this.onPress.bind(this)
    console.log('DEVICES PROPS CONSTRUCTOR',props.devices)
  }

  onPress(item) {
    console.log('ID', item.id)
    this.setState({
      selectedId: item.id
    })
    this.props.onDevicePressed(item.id);
  }

  renderItem(item) {
    const {id, name, paired,connected} = item
    const { selectedId} = this.state
    const backgroundColor = item.id === selectedId ? "#6e3b6e" : "#f9c2ff";
    const color = item.id === selectedId ? 'white' : 'black';


    return (
      <TouchableOpacity onPress={() => this.onPress(item)} style={[styles.item, { backgroundColor: backgroundColor }]}>
        <View  style={styles.container}>
          <View style={styles.container_text} >
            <Text style={styles.title}>
              {name}
            </Text>
            <Text style={styles.description}>
              {id}
            </Text>
          </View>
          {paired
            ? <IconMaterialCommunity name="bluetooth-off" style={styles.photo} color="#FFF" />
            : <IconMaterialCommunity name="bluetooth-transfer" style={styles.photo} color="#900" />}
          {connected
            ? <IconMaterial name="bluetooth-disabled" solid style={styles.photo} color="#F0F" />
            : <IconMaterial name="bluetooth-connected" solid style={styles.photo} color="#900" />}

        </View>
      </TouchableOpacity>
    )
  };

  render() {
    const {devices}=this.state
    return (
      <>
        <ScrollView>
          <FlatList
            data={devices}
            renderItem={({ item }) => this.renderItem(item)}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      </>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 5,
    marginVertical: 4,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 16,
    color: '#F0F',
  },
  container_text: {
    flexDirection: 'column',
    marginLeft: 12,
    justifyContent: 'center',
  },
  description: {
    fontSize: 11,
    fontStyle: 'italic',
  },
  photo: {
    height: 25,
    width: 25,
  },

});


export default DeviceList;