
import React, { useState, useEffect } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View, Button, Image, TouchableOpacity, Dimensions

} from 'react-native';
import Cards from "./Cards"
import Icon from 'react-native-vector-icons/Ionicons';
import database from "@react-native-firebase/database";
import { connect } from "react-redux"
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import Footer from './Footer';





function MainScreen(props) {
  const { width: screenWidth } = Dimensions.get('window')
  const [items, setItems] = useState([])
  //   const [user,setUser]=useState({})


  //     useEffect(()=>{
  //     if(props.userInfo!={}){
  //     setUser(props.userInfo)
  //     props.changeisuser(user)


  // }
  // },[]
  //     )
  // console.log("pros",props.Category)

  useEffect(() => {


    database().ref(`/Products/Clothes/`).once("value").then(snapshot => {
      console.log("SNAP", snapshot)
      // setItems(snapshot.val())
      setItems(Object.values(snapshot.val()))
    })

  }, [])


  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <View style={{ padding: 10, marginBottom: 20, borderWidth: 2, borderColor: "#ff6600", borderRadius: 10, marginTop: 20 }} >
        <Image resizeMode='stretch' source={{ uri: item.Url }} style={{ width: 130, height: 130, }} />
        <Text style={{ fontSize: 18, color: "black", fontWeight: "bold", margin: 5 }} >{item.Title}</Text>
        <Text style={{ fontSize: 18, color: "black", margin: 5 }} >RS:{item.Price}</Text>

      </View>
    );
  }

  return (
    <>
      <View style={{ backgroundColor: "#ff6600" }}>
        <View style={{ margin: 7 }}>
          <Icon name='menu-sharp'
            size={40}
            color='white'
            onPress={() => props.navigation.openDrawer()}
          />

        </View>
      </View>
      <ScrollView style={{ backgroundColor: "white" }} vertical={true}>
        <View>
          <Text style={{
            textAlign: "center",
            fontSize: 37,
            fontWeight: "bold",
            color: '#ff6600',
            textShadowColor: "rgb(106, 109, 124)",
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 3,
            marginTop: 20,
            marginBottom: 10
          }}>
            Welcome to Shopping app
          </Text>
          <Text style={{ fontSize: 18, color: 'black', margin: 10, textAlign: "center" }}>Delivering excitement, innovation and freshness.An exciting place for the whole family to shop.Enjoy your Shopping! </Text>
         
          <Image resizeMode='stretch' source={require("../Images/shoppingGif2.gif")} style={{ height: 200, width: "100%" }} />

        </View>
        <Image resizeMode='stretch' source={{ uri: "https://img.freepik.com/free-vector/flat-horizontal-sale-banner-template-with-photo_23-2149000923.jpg?w=1060&t=st=1663012974~exp=1663013574~hmac=64171896fadd83642251640e13507ae442f4d1d0e2867e13ccb252f175615729" }} style={{ height: 200, width: "100%" }} />

        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#ff6600', margin: 10, textAlign: "center" }}>
          Categories
        </Text>
        <View style={{ flexDirection: 'row', marginTop: 20, alignSelf: "center" }}>
          <TouchableOpacity onPress={() => Category(CategoryList[0])} style={{ flexDirection: 'column', width: 90, height: 90, margin: 15, backgroundColor: 'white', color: '#ff6600' }}>
            <Image source={{ uri: "https://cdn.dribbble.com/users/19319/screenshots/6409254/tide_icons_option1_4x.jpg?compress=1&resize=400x300&vertical=top" }} style={{ width: 90, height: 80, marginLeft: 5 }} />
            <Text style={{ color: "black", fontSize: 20, textAlign: "center", marginTop: 5, fontFamily: 'arial' }}>Clothes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Category(CategoryList[0])} style={{ flexDirection: 'column', width: 90, height: 90, margin: 15, backgroundColor: 'white', color: '#ff6600' }}>
            <Image source={{ uri: "data:image/png;base64,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" }} style={{ width: 80, height: 80, marginLeft: 5 }} />
            <Text style={{ color: "black", fontSize: 20, textAlign: "center", marginTop: 5 }}>Shoes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Category(CategoryList[0])} style={{ flexDirection: 'column', width: 90, height: 90, margin: 15, backgroundColor: 'white', color: '#ff6600' }}>
            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/1220/1220648.png?w=360&t=st=1662999754~exp=1663000354~hmac=7c6f3e9f29968f97c00a4c163a85854ed954f6369034ba769ad8c9e8e8c204bd" }} style={{ width: 80, height: 80, marginLeft: 5 }} />
            <Text style={{ color: "black", fontSize: 20, textAlign: "center", marginTop: 5 }}>Clothes</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row', marginTop: 20, alignSelf: "center", marginBottom: 30 }}>
          <TouchableOpacity onPress={() => Category(CategoryList[0])} style={{ flexDirection: 'column', width: 90, height: 90, margin: 15, backgroundColor: 'white', color: '#ff6600' }}>
            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/1255/1255272.png" }} style={{ width: 80, height: 80, marginLeft: 5 }} />
            <Text style={{ color: "black", fontSize: 20, textAlign: "center" }}>Smart</Text>
            <Text style={{ color: "black", fontSize: 20, textAlign: "center" }}>Phones</Text>

          </TouchableOpacity>
          <TouchableOpacity onPress={() => Category(CategoryList[0])} style={{ flexDirection: 'column', width: 90, height: 90, margin: 15, backgroundColor: 'white', color: '#ff6600' }}>
            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/1238/1238802.png?w=360&t=st=1663000443~exp=1663001043~hmac=b52d4196db1b9c6095520a3d7726c63d3d881734010ec15d391e69315cc78a35" }} style={{ width: 80, height: 80, marginLeft: 5 }} />
            <Text style={{ color: "black", fontSize: 20, textAlign: "center" }}>Toys</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Category(CategoryList[0])} style={{ flexDirection: 'column', width: 90, height: 90, margin: 15, backgroundColor: 'white', color: '#ff6600' }}>
            <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/1187/1187001.png" }} style={{ width: 80, height: 80, marginLeft: 5 }} />
            <Text style={{ color: "black", fontSize: 20, textAlign: "center" }}>Grocery</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 10, marginBottom: 20 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#ff6600', margin: 15, textAlign: "center" }}>
            Featured Products
          </Text>
          <Carousel
            // ref={(c) => { this._carousel = c; }}
            data={items}
            renderItem={renderItem}
            sliderWidth={screenWidth}
            // sliderHeight={400}
            itemWidth={165}
            // itemHeight={100}
            layout={'default'}

          />
        </View>
        <Footer />



      </ScrollView>

    </>
  )


}



function mapStateToProps(state) {
  return {
    Category: state.Category,
    userInfo: state.userInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // changeisuser:(userInfo)=>dispatch({type:"CHANGE_USER",userInfo:userInfo})
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
