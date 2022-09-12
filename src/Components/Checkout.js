import * as React from 'react';
import {useState,useEffect} from "react"
import Icon from 'react-native-vector-icons/Ionicons';
import {
    flex,
    FormRow,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    Button,TextInput,Alert,ToastAndroid,Dimensions
} from 'react-native';
import database from "@react-native-firebase/database";
import {connect } from "react-redux"



function Checkout(props) {
    const [name,setName]=useState("")
    const [address,setAddress]=useState("")
    const [city,setCity]=useState("")
    const [phone,setPhone]=useState("")
    const [items,setitems]=useState([])
    const [itemsList,setitemsList]=useState([])
    const [subTotal,setSubTotal]=useState(0)
    const [Total,setTotal]=useState(0)
    const [Tax,setTax]=useState(0)

    useEffect(()=>{
    database().ref(`Cart/${props.userInfo.displayName}`).once("value").then(snapshot => {
        var data=Object.values(snapshot.val())
        setitems(data)
        setitemsList(Object.values(data))
    })},[])

    
    // console.log(itemsList)

    
    

    const Done=()=>{
        if(name=="" || address=="" || city=="" || phone==""){
            ToastAndroid.show("Fill all the Details",ToastAndroid.SHORT)
    
        }
global.qn=0
        for(var i=0;i<itemsList.length;i++){
            global.qn+=itemsList[i].price
        }
        setSubTotal(global.qn)
        setTax(Math.floor(global.qn/300))
        setTotal(subTotal+Tax)
    
    }
   


    
const SaveOrder=()=>{
    if(name=="" || address=="" || city=="" || phone==""){
        ToastAndroid.show("Fill all the Details",ToastAndroid.SHORT)

    }
    else{
    database().ref(`/Orders/${props.userInfo.displayName}/`).update({"Name":name,"Address":address,"City":city,"Phone Number":phone})
    database().ref(`/Orders/${props.userInfo.displayName}/Products`).update(props.Order)
    database().ref(`/Orders/${props.userInfo.displayName}`).update({"Total Price":Total,"Tax":Tax,"Sub Total":subTotal})
    ToastAndroid.show("We have taken your Order",ToastAndroid.SHORT)
    }

}


    return (
        <>
        <View style={{ backgroundColor:"rgb(80, 80, 90)"}}>
                <View style={{ margin: 7 }}>
                    <Icon name='menu-sharp'
                        size={40}
                        color='#ff6600'
                        onPress={() => props.navigation.openDrawer()}
                    />
                </View>
            </View>

        <ScrollView style={{ backgroundColor: 'white' }}>

            {
                
                items.map((element,index) => {
                    return (
                        <View key={index} style={{ flexDirection: 'row', flex: 1 ,borderColor:'#ff6600',borderRadius: 10, borderWidth: 2,margin:5}}>
                            <View style={{ flexDirection: 'row', flex: 1 }}>
                                <Image source={{ uri: element.url }} style={{ borderColor: '#ff6600', borderRadius: 10, borderWidth: 5, width: 120, height: 150, marginTop: 20, margin:10 }} />
                            </View>
                            <View style={{  marginTop:30, flex:1, marginRight:25 }}>
                                <Text style={{ color: "#ff6600", fontSize: 25, fontWeight: 'bold', textAlign: 'center', }}>{element.title}</Text>
                                <Text style={{ color: "#ff6600", fontSize: 20, textAlign: 'center',margin:5 }}>RS. {element.price}</Text>
                                <Text style={{ color: "#ff6600", fontSize: 20, textAlign: 'center', }}>{element.quantity}</Text>
                            </View>
                        </View>
                        
                    )
                
                })}
          

            <View style={{marginTop:80}}>
                <Text style={{ color: "black", fontSize: 30, fontWeight: 'bold', textAlign: 'center', color: "#ff6600", marginTop: 10, marginBottom: 10 }}>Payment Details</Text>
                <View style={{ borderColor: '#ff6600', borderRadius: 10, borderWidth: 3, margin: 15, backgroundColor: 'white', }}>
                    <TextInput value={name} onChangeText={(e) => setName(e)} placeholder="Password" placeholder="Enter your Name" style={{ fontWeight: 'bold', color: '#ff6600',fontSize:18 }}/>
                </View>
                <View style={{ borderColor: '#ff6600', borderRadius: 10, borderWidth: 3, margin: 15, backgroundColor: 'white', }}>
                    <TextInput value={address} onChangeText={(e) => setAddress(e)} placeholder="Enter your Full Address" style={{ fontWeight: 'bold', color: '#ff6600',fontSize:18 }}/>
                </View>
                 <View style={{ borderColor: '#ff6600', borderRadius: 10, borderWidth: 3, margin: 15, backgroundColor: 'white', }}>
                    <TextInput value={city} onChangeText={(e) => setCity(e)} placeholder="Enter your City" style={{ fontWeight: 'bold', color: '#ff6600',fontSize:18 }}/>
                </View>
                <View style={{ borderColor: '#ff6600', borderRadius: 10, borderWidth: 3, margin: 15, backgroundColor: 'white', }}>
                    <TextInput keyboardType={"numeric"} value={phone} onChangeText={(e) => setPhone(e)} placeholder="Enter your Phone Number" style={{ fontWeight: 'bold', color: '#ff6600',fontSize:18 }}/>
                </View>
              
            </View>
            <View style={{ margin: 20 }}>
                    <Button
                        color="#ff6600"
                        title="Show prices"
                        onPress={() =>Done() }
                    />
                </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 1, margin:15,paddingLeft:40,paddingRight:50 }}>
                <View style={{marginRight:80}}>
                    <Text style={{ color: "#ff6600", fontSize: 20, fontWeight: 'bold', textAlign:"left",margin:5,marginLeft:45 }}>SubTotal: </Text>
                    <Text style={{ color: "#ff6600", fontSize: 20, fontWeight: 'bold', textAlign: 'left',margin:5,marginLeft:45 }}>Tax: </Text>
                    <Text style={{ color: "#ff6600", fontSize: 20, fontWeight: 'bold', textAlign: 'left',margin:5,marginLeft:45  }}>Total: </Text>

                </View>
                <View style={{marginLeft:50}}>
                    <Text style={{ color: "black", fontSize: 20, textAlign:"left",margin:5,marginRight:25 }}>RS.{subTotal}</Text>
                    <Text style={{ color: "black", fontSize: 20,  textAlign:"left",margin:5,marginRight:25 }}>RS.{Tax}</Text>
                    <Text style={{ color: "black", fontSize: 22, fontWeight: 'bold', textAlign:"left",margin:5,marginRight:30 }}>RS.{Total}</Text>
                </View>
            </View>
            <View style={{ margin: 20 }}>
                    <Button
                        color="#ff6600"
                        title="ORDER"
                        onPress={() =>SaveOrder() }
                    />
                </View>
        </ScrollView >
        </>


    )

}


function mapStateToProps(state) {
    return {
        Order:state.Order,
        userInfo:state.userInfo
    }
  }
  

  
  export default connect(mapStateToProps)(Checkout)

