import React, {useState,useEffect} from 'react';
import { Image,TouchableOpacity,TouchableNativeFeedback,TouchableHighlight } from 'react-native';
import { Content, Card, CardItem, Text, Left, Body, Right,Button,Icon } from 'native-base';
import database from "@react-native-firebase/database";
import {connect} from "react-redux"
import { changeisproduct, changeisuser } from '../Store/action';





const Cards=(props)=> {


  // useEffect(()=>{
  // console.log("cards",props.userInfo)


  // })
  // console.log("cards",props.userInfo)


  const AddToCart=(user,title,price,url,quantity,detail)=>{
  
    database().ref(`/Cart/${user}/${title}`).update({title,price,url,quantity,detail})
  
  }

//   const [user,setUser]=useState({})


//   useEffect(()=>{
//   if(props.userInfo!={}){
//   setUser(props.userInfo)
//   props.changeisuser(user)
// }})

//   for(var i=0;i<3;i++){
//     if(props.userInfo!=undefined){
//     setUser(props.userInfo.displayName)
// {console.log("asxsxsxsxsxsx",props.userInfo.displayName)}}
// }
  // console.log("qwerty",props.userInfo)

  const Todetails=()=>{
    
    props.changeisproduct([props.TITLE,props.PRICE,props.IMAGE,props.DETAILS])
    props.navigation.navigate("Detail");
  
  }
    return (

          <Card onPress={()=>Todetails()} style={{marginLeft:5,backgroundColor:"white",width:"48%",borderRadius:10,shadowColor: "#000",
          shadowOffset: {
            width: 10,
            height: 16,
          },
          shadowOpacity: 0.37,
          shadowRadius: 7.49,
          
          elevation: 12,}}>
            <CardItem  >
              <Body  >
                <Image  source={props.IMAGE} style={{height: 120, width: "100%"}}/>
              </Body >
            </CardItem>
            <CardItem style={{height:70}} >
                  <Text  style={{fontSize:18,fontWeight:"bold"}}>{props.TITLE}</Text>
  
            </CardItem>
            <CardItem style={{height:50,marginTop:-12}} >
                  <Text  style={{fontSize:18,textDecorationLine:"underline",color:"#ff6600"}}>RS: {props.PRICE}</Text>
            </CardItem>
            <CardItem style={{marginTop:-10,alignSelf:"center"}}>
            <Button onPress={()=>AddToCart(props.userInfo.displayName,props.TITLE,props.PRICE,props.IMAGE.uri,1,props.DETAILS)} rounded style={{backgroundColor:'#ff6600',height:35,width:130,alignSelf:"center"}}>
                      <Text>Add to Cart</Text>
                    </Button>
                    </CardItem>
          </Card>
    
    );
  
}



function mapStateToProps(state) {
  return {
      product:state.product,
      userInfo:state.userInfo
  }
}


function mapDispatchToProps(dispatch) {
  return {
    changeisproduct:(product)=>dispatch(changeisproduct(product)),
    changeisuser:(userInfo)=>dispatch(changeisuser(userInfo))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Cards)

