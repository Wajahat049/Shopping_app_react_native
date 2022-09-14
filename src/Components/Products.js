
import React,{useState,useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,Button
  
} from 'react-native';
import Cards from "./Cards"
import Icon from 'react-native-vector-icons/Ionicons';
import database from "@react-native-firebase/database";
import {connect } from "react-redux"
import { FlatList } from 'react-native-gesture-handler';
import Footer from './Footer';






function Products(props){
//   const [user,setUser]=useState({})


//     useEffect(()=>{
//     if(props.userInfo!={}){
//     setUser(props.userInfo)
//     props.changeisuser(user)


// }
// },[]
//     )
  // console.log("pros",props.Category)

  const [items,setItems]=useState([])
  database().ref(`/Products/${props.Category}/`).once("value").then(snapshot=>{
    // console.log("SNAP",snapshot)
    // setItems(snapshot.val())
    var myArr = Object.values(snapshot.val())

    setItems(Object.values(snapshot.val()))
  })


  const renderItem=({item,index})=>{
    return(
      <Cards key={index}  navigation={props.navigation} TITLE={item.Title} PRICE={item.Price} DETAILS={item.Description} IMAGE={{uri:item.Url}} />
      )
  }
  return(
      <>
        <View  style={{backgroundColor:"#ff6600"}}>
            <View style={{ margin: 7 }}>
                    <Icon name='menu-sharp'
                        size={40}
                        color='white'
                        onPress={() => props.navigation.openDrawer()}
                    />
           
                </View>
        </View>
        <View>
        <Text style={{fontSize: 40,fontWeight: 'bold',color: '#ff6600',padding:10,textAlign:"center",backgroundColor:"white",marginBottom:20}}>
                          {props.Category}
          </Text>
        </View>
        

<FlatList data={items} renderItem={renderItem} keyExtractor={item => item.Title}
        numColumns={2}/>
        

      </>
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



export default connect(mapStateToProps,mapDispatchToProps)(Products)
