
import React,{useState,useEffect} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,Button,Image,TouchableOpacity,Dimensions
  
} from 'react-native';
import Cards from "./Cards"
import Icon from 'react-native-vector-icons/Ionicons';
import database from "@react-native-firebase/database";
import {connect } from "react-redux"
import Carousel,{ParallaxImage} from 'react-native-snap-carousel';
import Footer from './Footer';





function MainScreen(props){
  const { width: screenWidth } = Dimensions.get('window')
  const [items,setItems]=useState([])
//   const [user,setUser]=useState({})


//     useEffect(()=>{
//     if(props.userInfo!={}){
//     setUser(props.userInfo)
//     props.changeisuser(user)


// }
// },[]
//     )
  // console.log("pros",props.Category)

  useEffect(()=>{


  database().ref(`/Products/Clothes/`).once("value").then(snapshot=>{
    console.log("SNAP",snapshot)
    // setItems(snapshot.val())
    setItems(Object.values(snapshot.val()))
  })

},[])


 const renderItem = ({item, index},parallaxProps) => {
    return (
        <View style={{padding:10,marginBottom:20,borderWidth:2,borderColor:"#ff6600",borderRadius:10,marginTop:20}} >
            <Image resizeMode='stretch'  source={{uri:item.Url}} style={{ width: 130, height: 130,}} />
            <Text style={{fontSize:18,color:"black",fontWeight:"bold",margin:5}} >{ item.Title }</Text>
            <Text style={{fontSize:18,color:"black",margin:5}} >RS:{ item.Price }</Text>

        </View>
    );
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
        <ScrollView vertical={true}>
        <View>
        {/* <Image resizeMode='contain' source={require("../Images/Logo.png")} style={{height: 100, width: 100,alignSelf:"center"}}/> */}
        <Text style={{fontSize: 40,fontWeight: 'bold',color: '#ff6600',margin:10,textAlign:"center"}}>
                          Welcome to Shopping app
          </Text>
          <Text style={{fontSize: 20,color: 'black',margin:10,textAlign:"center"}}>Delivering excitement, innovation and freshness.An exciting place for the whole family to shop.Enjoy your Shopping! </Text>
            {/* <Image resizeMode='stretch' source={require("../Images/shoppingGif.gif")} style={{height: 250, width: "100%"}}/> */}
            <Image resizeMode='stretch' source={require("../Images/shoppingGif2.gif")} style={{height: 200, width: "100%"}}/>

        </View>
        <Image resizeMode='stretch' source={{uri:"https://img.freepik.com/free-vector/flat-horizontal-sale-banner-template-with-photo_23-2149000923.jpg?w=1060&t=st=1663012974~exp=1663013574~hmac=64171896fadd83642251640e13507ae442f4d1d0e2867e13ccb252f175615729"}} style={{height: 200, width: "100%"}}/>

        <Text style={{fontSize: 30,fontWeight: 'bold',color: '#ff6600',margin:10,textAlign:"center"}}>
                         Categories
          </Text>
        <View  style={{ flexDirection: 'row', marginTop:20,alignSelf:"center"}}>
                <TouchableOpacity  onPress={()=>Category(CategoryList[0])} style={{ flexDirection: 'column', width: 90, height: 90, margin: 15, backgroundColor: 'white', color: '#ff6600'}}>
                    <Image  source={{uri:"https://cdn-icons-png.flaticon.com/512/667/667995.png?w=360&t=st=1662993201~exp=1662993801~hmac=c7a51e254373aed2c5bad06d7004d8b93549bb0fd8c09bab656b63eb15f21152"}} style={{ width: 80, height: 80,marginLeft:5}} />
                    <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:5,fontFamily:'arial'}}>Clothes</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>Category(CategoryList[0])} style={{ flexDirection: 'column', width: 90, height: 90, margin: 15, backgroundColor: 'white', color: '#ff6600'}}>
                    <Image  source={{uri:"https://cdn-icons-png.flaticon.com/512/1255/1255170.png?w=360&t=st=1662998440~exp=1662999040~hmac=5c9fb5184a1f6bf7ab9f0cfe111b57de466935935cb20844dcb07e82d9db483b"}} style={{ width: 80, height: 80,marginLeft:5}} />
                    <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:5}}>Shoes</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>Category(CategoryList[0])} style={{ flexDirection: 'column', width: 90, height: 90, margin: 15, backgroundColor: 'white', color: '#ff6600'}}>
                    <Image  source={{uri:"https://cdn-icons-png.flaticon.com/512/1220/1220648.png?w=360&t=st=1662999754~exp=1663000354~hmac=7c6f3e9f29968f97c00a4c163a85854ed954f6369034ba769ad8c9e8e8c204bd"}} style={{ width: 80, height: 80,marginLeft:5}} />
                    <Text style={{color:"black",fontSize:20,textAlign:"center",marginTop:5}}>Clothes</Text>
                </TouchableOpacity>
                </View>

                <View  style={{ flexDirection: 'row', marginTop:20,alignSelf:"center",marginBottom:30}}>
                <TouchableOpacity  onPress={()=>Category(CategoryList[0])} style={{ flexDirection: 'column', width: 90, height: 90, margin: 15, backgroundColor: 'white', color: '#ff6600'}}>
                    <Image  source={{uri:"https://cdn-icons-png.flaticon.com/512/1255/1255272.png"}} style={{ width: 80, height: 80,marginLeft:5}} />
                    <Text style={{color:"black",fontSize:20,textAlign:"center"}}>Smart</Text>
                    <Text style={{color:"black",fontSize:20,textAlign:"center"}}>Phones</Text>

                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>Category(CategoryList[0])} style={{ flexDirection: 'column', width: 90, height: 90, margin: 15, backgroundColor: 'white', color: '#ff6600'}}>
                    <Image  source={{uri:"https://cdn-icons-png.flaticon.com/512/1238/1238802.png?w=360&t=st=1663000443~exp=1663001043~hmac=b52d4196db1b9c6095520a3d7726c63d3d881734010ec15d391e69315cc78a35"}} style={{ width: 80, height: 80,marginLeft:5}} />
                    <Text style={{color:"black",fontSize:20,textAlign:"center"}}>Toys</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>Category(CategoryList[0])} style={{ flexDirection: 'column', width: 90, height: 90, margin: 15, backgroundColor: 'white', color: '#ff6600'}}>
                    <Image  source={{uri:"https://cdn-icons-png.flaticon.com/512/1187/1187001.png"}} style={{ width: 80, height: 80,marginLeft:5}} />
                    <Text style={{color:"black",fontSize:20,textAlign:"center"}}>Grocery</Text>
                </TouchableOpacity>
                </View>
                <View style={{marginTop:10,marginBottom:20}}>
                <Text style={{fontSize: 30,fontWeight: 'bold',color: '#ff6600',margin:15,textAlign:"center"}}>
                         Featured Products
          </Text>
                <Carousel
              // ref={(c) => { this._carousel = c; }}
              data={items}
              renderItem={renderItem}
              sliderWidth={screenWidth}
              // sliderHeight={400}
              itemWidth={165}
              // itemHeight={00}
              layout={'default'}
              
            />
                </View>
                <Footer/>
      
                

      </ScrollView>

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



export default connect(mapStateToProps,mapDispatchToProps)(MainScreen)
