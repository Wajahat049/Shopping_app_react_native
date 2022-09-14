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
import { StripeProvider } from '@stripe/stripe-react-native';
import { CardField, useStripe,useConfirmPayment,BillingDetails,initStripe} from '@stripe/stripe-react-native';



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
        var myitems  = Object.values(data)
        setTimeout(()=>{
            global.qn=0
        for(var i=0;i<myitems.length;i++){
            global.qn+=myitems[i].price
        }
        setSubTotal(global.qn)
        setTax(Math.floor(global.qn/10))
        setTotal(global.qn+Math.floor(global.qn/10))
        setTimeout(()=>{
  initializePaymentSheet();

        },1000)
        },2000)
    })},[])

    
//FOR STRIPE
const [intent,setIntent] = useState("")
const { initPaymentSheet, presentPaymentSheet } = useStripe();
const [loading, setLoading] = useState(false);

const fetchPaymentSheetParams = async () => {
    console.log("AMOUNT",typeof(Total*100))
  const response = await fetch(`https://computer-hi-tech.herokuapp.com/payment_react_native`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
              amount:Total*100
            }),
  });
  const { paymentIntent, ephemeralKey, customer } = await response.json();
  // console.log("RES",await response.json() )

  return {
    paymentIntent,
    ephemeralKey,
    customer,
  };
};

const initializePaymentSheet = async () => {
  const {
    paymentIntent,
    ephemeralKey,
    customer,
  } = await fetchPaymentSheetParams();
  setIntent(paymentIntent)

  const { error } = await initPaymentSheet({
    customerId: customer,
    customerEphemeralKeySecret: ephemeralKey,
    paymentIntentClientSecret: paymentIntent,
    merchantDisplayName: 'Merchant Name',
  });
  console.log("ERR",error)
  if (!error) {
    setLoading(true);
  }

};

const openPaymentSheet = async () => {
    if(name=="" || address=="" || city=="" || phone==""){
        ToastAndroid.show("Fill all the Details",ToastAndroid.SHORT)
    }
    else{
        
  console.log("PAYMENTINTENT",intent)
  const { error } = await presentPaymentSheet({ intent })
  database().ref(`/Orders/${props.userInfo.displayName}/`).update({"Name":name,"Address":address,"City":city,"Phone Number":phone})
  database().ref(`/Orders/${props.userInfo.displayName}/Products`).update(props.Order)
  database().ref(`/Orders/${props.userInfo.displayName}`).update({"Total Price":Total,"Tax":Tax,"Sub Total":subTotal})
  ToastAndroid.show("Order Confirmed",ToastAndroid.SHORT)
  if (error) {
    console.log(error.message)
    Alert.alert(`Error code: ${error.code}`, error.message);
  } else {
    console.log("SUCCESS")
    Alert.alert('Success', 'Your order is confirmed!');
  }
  
}
};

// useEffect(() => {
//   initializePaymentSheet();
// }, []);

    
    

   



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
                    <TextInput value={name} onChangeText={(e) => setName(e)}  placeholder="Enter your Name" style={{ fontWeight: 'bold', color: '#ff6600',fontSize:18 }}/>
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
            <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 1, margin:15,paddingLeft:40,paddingRight:50 }}>
                <View style={{marginRight:80}}>
                    <Text style={{ color: "#ff6600", fontSize: 20, fontWeight: 'bold', textAlign:"left",margin:5,marginLeft:45 }}>SubTotal: </Text>
                    <Text style={{ color: "#ff6600", fontSize: 20, fontWeight: 'bold', textAlign: 'left',margin:5,marginLeft:45 }}>Tax: </Text>
                    <Text style={{ color: "#ff6600", fontSize: 20, fontWeight: 'bold', textAlign: 'left',margin:5,marginLeft:45  }}>Total: </Text>

                </View>
                <View style={{marginLeft:50}}>
                    <Text style={{ color: "black", fontSize: 20, textAlign:"left",margin:5,marginRight:25 }}>${subTotal}</Text>
                    <Text style={{ color: "black", fontSize: 20,  textAlign:"left",margin:5,marginRight:25 }}>${Tax}</Text>
                    <Text style={{ color: "black", fontSize: 22, fontWeight: 'bold', textAlign:"left",margin:5,marginRight:30 }}>${Total}</Text>
                </View>
            </View>
           
            <View style={{ margin: 20 }}>
            <StripeProvider
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
                    <Button
                        color="#ff6600"
                        title="PAY"
                        onPress={() =>openPaymentSheet() }
                        // disabled={!loading}
                    />
                    </StripeProvider>
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

