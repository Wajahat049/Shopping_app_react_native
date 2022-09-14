import React, { useState, useEffect } from 'react';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View, Image, Button


} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import database from "@react-native-firebase/database";
import { connect } from "react-redux"
import { changeisorder } from '../Store/action';




function Cart(props) {
    const [items, setitems] = useState([]);
    const [data, setData] = useState({});

    useEffect(() => {
        database().ref(`Cart/${props.userInfo.displayName}`).once("value").then(snapshot => {
            var result = snapshot.val()
            if (result != undefined) {
                setitems(Object.values(result))
            }

        })
    })




    const GoToCheckout = () => {
        database().ref(`Cart/${props.userInfo.displayName}`).once("value").then(snapshot => {
            props.changeisorder(snapshot.val())
        })
        props.navigation.navigate("Checkout")
    }

    const deleteItem = (uid) => {
        database().ref(`Cart/${props.userInfo.displayName}/` + uid).remove()

    }



    const updateData = (uid) => {
        database().ref(`Cart/${props.userInfo.displayName}/${uid}`).update(data)
    }


    const increase = (uid, quanno) => {
        // console.log("title",uid)
        database().ref(`Cart/${props.userInfo.displayName}/${uid}`).once("value").then(snapshot => {
            setData(snapshot.val())
            // console.log("snap",snapshot.val())
        })
        setData(data['quantity'] = quanno + 1)
        console.log(data)
        if (data !== {}) {
            updateData(uid)
        }


    }



    const decrease = (uid, quanno) => {
        database().ref(`Cart/${props.userInfo.displayName}/` + uid).once("value").then(snapshot => {
            setData(snapshot.val())
        })
        if (quanno > 1) {
            setData(data['quantity'] = quanno - 1)
        }
        if (data !== {}) {
            updateData(uid)
        }

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

            <ScrollView>
                {items.map((element, index) => {
                    // console.log(element)
                    return (
                        <View key={index} style={{ marginTop: 10 }}>

                            <Image source={{ uri: element.url }} style={{ borderColor: '#ff6600', borderRadius: 10, borderWidth: 5, width: 150, height: 160, marginLeft: 100, marginTop: 20 }} />
                            <Text style={{ color: "black", fontSize: 25, fontWeight: 'bold', textAlign: 'center', margin: 10 }}>{element.title}</Text>
                            <Text style={{ color: "black", fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>RS: {element.price}</Text>

                            <View style={{ flex: 1, flexDirection: 'row', marginLeft: 110, }}>
                                <View style={{ margin: 12 }}>
                                    <Icon name='remove-circle-sharp'
                                        size={30}
                                        color='#ff6600'
                                        onPress={() => decrease(element.title, element.quantity)}
                                    />
                                </View>
                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 25, marginTop: 12 }}>{element.quantity}</Text>
                                <View style={{ margin: 12 }}>
                                    <Icon name='add-circle-sharp'
                                        size={30}
                                        color='#ff6600'
                                        onPress={() => increase(element.title, element.quantity)}

                                    />
                                </View>
                                <View style={{ margin: 10, marginLeft: 20 }}>
                                    <Icon name='trash-sharp'
                                        size={30}
                                        color='#ff6600'
                                        onPress={() => deleteItem(element.title)}
                                    />
                                </View>
                            </View>
                        </View>)
                })}


                <View style={{ margin: 10 }}>
                    <Button color='#ff6600' title="Checkout" onPress={() => GoToCheckout()} />
                </View>
            </ScrollView >
        </>


    )



}



function mapStateToProps(state) {
    return {
        Order: state.Order,
        userInfo: state.userInfo
    }
}


function mapDispatchToProps(dispatch) {
    return {
        changeisorder: (Order) => dispatch(changeisorder(Order))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
