import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native'
import { TableDetailDesinfectionUser } from '../components/generic/TableDetailDesinfectionUser'
import { Card, Title, Paragraph, Avatar, Divider, Snackbar } from 'react-native-paper';
import { USER_INFO_GENERAL_SCREEN } from '../constants/GlobalConstant'

const itemList = [
  {
    key: '1',
    area: 'Classroom1',
    date: '01/01/2022',
    time: 16,
  },
  {
    key: '2',
    area: 'Classroom2',
    date: '01/01/2022',
    time: 16,
  },
  {
    key: '3',
    area: 'Classroom2',
    date: '01/01/2022',
    time: 6,
  },
  {
    key: '4',
    area: 'Classroom2',
    date: '01/01/2022',
    time: 3.7,
  },
  {
    key: '5',
    area: 'Classroom2',
    date: '01/01/2022',
    time: 5,
  },
  {
    key: '6',
    area: 'Classroom2',
    date: '01/01/2022',
    time: 6,
  },
  {
    key: '7',
    area: 'Classroom2',
    date: '01/01/2022',
    time: 7,
  },
  {
    key: '8',
    area: 'Classroom2',
    date: '01/01/2022',
    time: 8,
  },
  {
    key: '9',
    area: 'Classroom2',
    date: '01/01/2022',
    time: 9,
  },
  {
    key: '10',
    area: 'Classroom2',
    date: '02/03/2022',
    time: 10,
  },
];

export const UserInfoGeneralScreen = () => {

  const [visible, setVisible] = useState(false)
  const onDismissSnackBar = () => setVisible(true);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.cardUser}>
          <Avatar.Image style={styles.cardImage} size={128} source={require('../images/splash.png')} />
          <View style={styles.detailUser}>
            <Title>Name User</Title>
            <Paragraph>email</Paragraph>
            <Paragraph>role</Paragraph>
          </View>
        </View>
      </Card>
      <Text style={styles.titleTable}>{USER_INFO_GENERAL_SCREEN.TITLE_TABLE}</Text>
      <Divider style={styles.divider} />
      {itemList.length == 0 ? (
        <View>
        <Snackbar
          visible='show'
          onDismiss={onDismissSnackBar}
          theme={{ colors: { surface: 'white', accent: 'green', background: 'cyan' }, }}
          style={styles.snackbar}
        >
          {USER_INFO_GENERAL_SCREEN.EMPTY_LIST}
        </Snackbar>
        </View>
      ) : (
        <TableDetailDesinfectionUser
          style={styles.tableGeneric}
          itemsList={itemList}
        />
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 7,
    backgroundColor: '',
    margin: 5
  },
  card: {
    //flex: 1,
    height: 150,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 5,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'gray',
    shadowColor: "red",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 3,
      width: 3
    }
  },
  cardUser: {
    //flex:1,
    flexDirection: 'row'
  },
  cardImage: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  detailUser: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleTable: {
    //flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    margin: 10,
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold'
  },
  tableGeneric: {
    flex: 6,
  },
  divider: {
    margin: 2,
    height: 2
  },
  snackbar: { 
    backgroundColor: '#7f1ae5', 
    flex: 1,
    top:100
  }
})