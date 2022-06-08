import React, { useState, useEffect } from "react";
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
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  devices: any;
  onDevicePressed(item: any): void
}

export const DeviceDiscoveryList = (props: Props) => {
  const [selectedId, setSelectedId] = useState(null)
  const [devices, setDevices] = useState(props.devices)

  useEffect(() => {
    setDevices(props.devices)
  }, [props.devices])


  const onPress = (item) => {
    console.log('ID', item.id)
    setSelectedId(item.id)
    props.onDevicePressed(item.id);
  }

  const renderItem = (item: any) => {
    const { id, name, paired, connected } = item
    const backgroundColor = item.id === selectedId ? "#5dade2" : "#aed6f1";
    const color = item.id === selectedId ? 'black' : 'white';

    return (
      <TouchableOpacity onPress={() => onPress(item)} style={[styles.item, { backgroundColor }]}>
        <View style={styles.container}>
          <View style={styles.container_text} >
            <Text style={[styles.title, { color }]}>
              {name}
            </Text>
            <Text style={[styles.description, { color }]}>
              {id}
            </Text>
          </View>
          {/* {paired
            ? <IconFontAwesome name="bluetooth" style={styles.photo} size={40} color="#229954" />
            : <IconFontAwesome name="bluetooth-b" style={styles.photo} size={40} color="#e74c3c" />} */}
          {connected && (
            <View style={styles.container_icon}>
              <IconFontAwesome name="bluetooth" solid style={styles.photo} size={40} color="#229954" />
            </View>
          )}
          {/*<IconMaterialCommunity name="bluetooth-off" solid style={styles.photo} size={40} color="#e74c3c" />} */}

        </View>
      </TouchableOpacity>
    )
  }

  return (
    <FlatList
      data={devices}
      renderItem={({ item }) => renderItem(item)}
      keyExtractor={(item) => item.id}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    flexDirection: 'row',
    padding: 10,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
    elevation: 2,
  },
  item: {
    padding: 0,
    marginVertical: 4,
    marginHorizontal: 8,
  },
  title: {
    fontSize: 18,
    color: '#F0F',
  },
  container_text: {
    flexDirection: 'column',
    marginLeft: 12,
    justifyContent: 'center',
    width: '80%'
  },
  container_icon: {
    flexDirection: 'column',
    marginLeft: 12,
    justifyContent: 'center',
    width: '20%',
  },
  description: {
    fontSize: 13,
    fontStyle: 'italic',
  },
  photo: {
    height: '100%',
    width: '100%',
  },

});