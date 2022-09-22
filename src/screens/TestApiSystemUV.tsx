import React,{useState} from 'react'
import { View, Text, Button } from 'react-native'
import { PetitionAPI } from '../util/PetitionAPI'
import { USERS } from '../constants/ApiResource'

export const TestApiSystemUv = () => {

    const { tokenJWT, tokenJWTUser, getPetition } = PetitionAPI()
    const [listUser, setListUser] = useState()

    const getTokenGeneric = async () => {
        let tokenGeneric=await tokenJWT()
    }

    const getTokenUser = async () => {
        let tokenUSer=await tokenJWTUser('ja.silvarojas@gmail.com','@Sena1234')
    }

    const getListUsers = async () => {
        let tokenUSer=await tokenJWTUser('ja.silvarojas@gmail.com','@Sena1234')
        let data=await getPetition('get', USERS.LIST_USER, tokenUSer)
    }

    return (
        <View>
            <Text>TestApiSystemUv</Text>
            <Button title='getTokenGeneric' onPress={getTokenGeneric} />
            <Button title='getTokenUser' onPress={getTokenUser} />
            <Button title='listUsers' onPress={getListUsers} />
        </View>
    )
}
