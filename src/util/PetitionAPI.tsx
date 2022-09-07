import React from 'react'
import axios from 'axios'
import qs from 'qs'
import { Base64 } from "js-base64";
import { SERVER_PRODUCTION, TOKEN_JWT_GENERIC, AUTH_BASIC } from '../constants/ApiResource'

export const PetitionAPI = () => {
  
  /*
  axios.interceptors.request.use(request => {
    //console.log('Starting Request', JSON.stringify(request, null, 2))
    console.log('Starting Request ',' url ',JSON.stringify(request.url, null, 2) ,' method ',JSON.stringify(request.method, null, 2) ,' payload: ',JSON.stringify(request.data, null, 2))
    return request
  })
  
  axios.interceptors.response.use(response => {
    //console.log('Response:', JSON.stringify(response, null, 2))
    console.log('Response:',' status code: ' ,JSON.stringify(response.status, null, 2),' data: ', JSON.stringify(response.data, null, 2) )
    return response
  })
  */
  

  const tokenJWT = async () => {
    let basicAuth = 'Basic ' + Base64.encode(AUTH_BASIC.USER_NAME + ':' + AUTH_BASIC.PASSWORD);
    return await axios({
      headers: {
        'Authorization': basicAuth,
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      url: `${SERVER_PRODUCTION}${TOKEN_JWT_GENERIC.RESOURCE}`,
      data: qs.stringify({
        grant_type: TOKEN_JWT_GENERIC.GRANT_TYPE,
        username: TOKEN_JWT_GENERIC.USER_NAME,
        password: TOKEN_JWT_GENERIC.PASSWORD
      })
    })
      .then((response) => {
        return{
          code:response.status,
          data:response.data
        }
      })
      .catch((error) => {
        console.log(error)
        return {
          code: error.response?.status,
          data: error.response?.data
        };
      })
  }

  const tokenJWTUser = async (username: string, password: string) => {
    let basicAuth = 'Basic ' + Base64.encode(AUTH_BASIC.USER_NAME + ':' + AUTH_BASIC.PASSWORD);
    return await axios({
      headers: {
        'Authorization': basicAuth,
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'post',
      url: `${SERVER_PRODUCTION}${TOKEN_JWT_GENERIC.RESOURCE}`,
      data: qs.stringify({
        grant_type: TOKEN_JWT_GENERIC.GRANT_TYPE,
        username,
        password
      })
    })
      .then((response) => {
        return{
          code:response.status,
          data:response.data
        }
      })
      .catch((error) => {
        return {
          code: error.response?.status,
          data: error.response?.data
        };
      })
  }

  const requestPetition = async (verbHttp: string, resource: string, token: any, payload?:any) => {
    console.log('From petition api' + `${verbHttp} ${resource}`)
    console.log(`${SERVER_PRODUCTION}${resource}`)
    let bearerAuth = 'Bearer ' + token;
    return await axios({
      headers: {
        'Authorization': bearerAuth
      },
      method: verbHttp,
      url: `${SERVER_PRODUCTION}${resource}`,
      data: payload
    })
      .then((response) =>{
        return{
          code:response.status,
          data:response.data
        }
      })
      .catch(error => {
        return {
          code: error.response?.status,
          data: error.response?.data
        };
      })
  }

  return ({
    tokenJWT,
    tokenJWTUser,
    requestPetition
  })
}
