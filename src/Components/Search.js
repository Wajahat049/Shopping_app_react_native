import * as React from 'react';
import { View, Text, Button, FlatList, StyleSheet, SafeAreaView, ScrollView, Settings } from 'react-native';
import { Searchbar } from "react-native-paper";
import { useState, useEffect } from 'react';
import database from "@react-native-firebase/database";
import Cards from "./Cards"
import { connect } from "react-redux"
import Icon from 'react-native-vector-icons/Ionicons';




const Search = (props) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [itemlst, setitemlst] = useState([])
  const [items, setItems] = useState([])
  const [lst, setlst] = useState([])


  useEffect(() => {
    setitemlst([])
    database().ref(`/Products/`).once("value").then(snapshot => {
      setlst(Object.keys(snapshot.val()))
    })

    for (var i = 0; i < lst.length; i++) {
      database().ref(`/Products/${lst[i]}/`).once("value").then(snapshot => {

        var allitms = Object.values(snapshot.val())
        console.log("ALL SEARCH", allitms)
        allitms.map((itm) => {
          var searchin = itm.Title.split(" ")
          if (
            searchin.includes(searchQuery || searchQuery.toUpperCase() || searchQuery.toLowerCase())) {
            console.log("SEARCH", itm, searchQuery)
            setitemlst(itemlst => [...itemlst, itm])
          }
        })

      })
    }

    // console.log(searchQuery)
    // console.log(itemlst)


  }, [searchQuery])


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
      <Searchbar style={{ margin: 15 }}
        placeholder="Search Product..."
        onChangeText={(searchQuery) => setSearchQuery(searchQuery)}
        value={searchQuery}
      />
      <ScrollView style={{ margin: 10 }}>

        {itemlst.map((element, index) => {
          return (
            <Cards key={index} navigation={props.navigation} TITLE={element.Title} PRICE={element.Price} DETAILS={element.Description} IMAGE={{ uri: element.Url }} />
          )
        })}
      </ScrollView>

    </>
  );
};

function mapStateToProps(state) {
  return {
    userInfo: state.userInfo
  }
}


export default connect(mapStateToProps)(Search)