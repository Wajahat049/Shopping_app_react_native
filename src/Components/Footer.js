
import React,{useState,useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,Button,Image
  
} from 'react-native';
import Cards from "./Cards"
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

import database from "@react-native-firebase/database";
import {connect } from "react-redux"






function Footer(props){


  return(
       <View  style={{backgroundColor:"#ff6600",marginTop:20,padding:10,paddingBottom:10}}>
        <Text style={{color:"white",margin:5,textAlign:'center',fontSize:25}}>Home</Text>
        <Text style={{color:"white",margin:5,textAlign:'center',fontSize:25}}>Categories</Text>
        <Text style={{color:"white",margin:5,textAlign:'center',fontSize:25}}>Products</Text>
      <View style={{alignSelf:"center",flexDirection:"row"}}>
      <Icon size={30} color="white" style={{margin:20}} name="logo-facebook"></Icon>
      <Icon size={30} color="white" style={{margin:20}} name="logo-instagram"></Icon>
      <Icon size={30} color="white" style={{margin:20}} name="logo-twitter"></Icon>
      </View>
      <View style={{alignSelf:"center",flexDirection:"row"}} >
      <FontAwesomeIcon  size={30} style={{margin:15}} name="copyright" />
      <Text style={{color:"black",fontSize:15,marginTop:20}}>All Rights Reserved</Text>
      </View>
      </View>
    )


}



function mapStateToProps(state) {
  return {
      Category:state.Category,
      userInfo:state.userInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // changeisuser:(userInfo)=>dispatch({type:"CHANGE_USER",userInfo:userInfo})
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(Footer)
