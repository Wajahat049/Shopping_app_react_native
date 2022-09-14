import * as React from 'react';
import { useEffect, useState } from "react"
import {
    flex,
    FormRow,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image, TouchableHighlight, TouchableOpacity, LayoutAnimation
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux"
import { changeisuser } from "../Store/action/index"
import { changeiscategory } from "../Store/action/index"







function Categories(props) {
    //     const [user,setUser]=useState({})


    //     useEffect(()=>{
    //     if(props.userInfo!={}){
    //     setUser(props.userInfo)
    //     props.changeisuser(user)


    // }
    // },[]
    //     )




    const Category = (element) => {

        // props.changeisuser(user)
        props.changeiscategory(element)
        props.navigation.navigate("Products")

    }
    const CategoryList = ["Clothes", "Accessories", "Groceries", "Mobiles", "Shoes", "Toys"]
    return (
        <>
            <View style={{ backgroundColor: "#1f1f14" }}>
                <View style={{ margin: 7 }}>
                    <Icon name='menu-sharp'
                        size={40}
                        color='#ff6600'
                        onPress={() => props.navigation.openDrawer()}
                    />

                </View>
            </View>
            <ScrollView style={{ backgroundColor: "white" }}>
                <Text style={{
                    textAlign: "center",
                    fontSize: 35,
                    fontWeight: "bold",
                    color: '#ff6600',
                    textShadowColor: "rgb(106, 109, 124)",
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 5,
                    marginTop: 20
                }}>CATEGORIES</Text>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <TouchableOpacity onPress={() => Category(CategoryList[0])} style={styles.cardBox}>
                        <Image source={require("../Images/ClothIcon.png")} style={styles.cardImg} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Category(CategoryList[1])} style={styles.cardBox}>
                        <Image source={require("../Images/AccessoryIcon.png")} style={styles.cardImg} />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', }}>
                    <TouchableOpacity onPress={() => Category(CategoryList[2])} style={styles.cardBox}>
                        <Image source={require("../Images/GroceryIcon.png")} style={styles.cardImg} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Category(CategoryList[3])} style={styles.cardBox}>
                        <Image source={require("../Images/MobileIcon.png")} style={styles.cardImg} />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', }}>
                    <TouchableOpacity onPress={() => Category(CategoryList[4])} style={styles.cardBox}>
                        <Image source={require("../Images/ShoesIcon.png")} style={styles.cardImg} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Category(CategoryList[5])} style={styles.cardBox}>
                        <Image source={require("../Images/ToysIcon.png")} style={styles.cardImg} />
                    </TouchableOpacity>
                </View>
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
        changeiscategory: (Category) => dispatch(changeiscategory(Category)),
        // changeisuser:(userInfo)=>dispatch(changeisuser(userInfo))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)

const styles = StyleSheet.create({
    cardBox: {
        flexDirection: 'row',
        width: 150,
        height: 150,
        margin: 15,
        borderColor: '#ff6600',
        borderWidth: 3,
        backgroundColor: 'white',
        color: '#ff6600',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    cardImg: {
        width: 140,
        height: 140,
        borderRadius: 5
    }
})