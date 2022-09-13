import * as React from 'react';
import { Component, useState } from 'react';
import StarRating from 'react-native-star-rating';
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
    Button, Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux"
import database from "@react-native-firebase/database";


const AddToCart = (user, title, price, url, quantity, detail, rating) => {

    database().ref(`/Cart/${user}/${title}`).update({ title, price, url, quantity, detail })
    database().ref(`/Ratings/${user}/${title}`).update({ rating })
    // console.log(user,title,price,url)

}

class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            starCount: 2.5
        };
    }

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

    render() {
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

                    <Text style={styles.deatilHeading}>Details</Text>

                    <Image source={{ uri: this.props.product[2].uri }} style={{ width: 350, height: 300, marginTop: 10, }} />

                    <View style={styles.cardBox}>
                        <Text style={{ fontWeight: 'bold', color: '#1f1f14', fontSize: 20, margin: 10 }}>{this.props.product[0]}</Text>
                        <Text style={{ color: '#616161', fontSize: 18, marginLeft: 10 }}>{this.props.product[3]}</Text>
                        <View style={{width: 130, margin: 10, flexDirection: "row"}}>
                            <StarRating
                                fullStarColor={'#ff6600'}
                                disabled={false}
                                maxStars={5}
                                rating={4}
                                selectedStar={4}
                                starSize={20}
                            />
                            <Text style={{ color: '#616161',marginLeft: 10 }}>4 is Review !</Text>
                        </View>
                        <Text style={{ fontWeight: 'bold', color: '#ff6600', fontSize: 22, marginLeft: 10, marginBottom: 10 }}>${this.props.product[1]}</Text>
                    </View>

                    
                    <View>
                        <Text style={{ textAlign: 'center', color: '#ff6600', fontWeight: 'bold', fontSize: 18,}}>Rating Overview</Text>
                    </View>

                    <View style={{ marginLeft: 30, marginRight: 30, marginTop: 15 }}>
                        <StarRating
                            fullStarColor={'#ff6600'}
                            disabled={false}
                            maxStars={5}
                            rating={this.state.starCount}
                            selectedStar={(rating) => this.onStarRatingPress(rating)}
                        />
                        {console.log(this.state.starCount)}
                    </View>

                    <View style={{ margin: 30 }}>
                        <Button
                            color="#ff6600"
                            title="Add to Cart"
                            onPress={() => AddToCart(this.props.userInfo.displayName, this.props.product[0], this.props.product[1], this.props.product[2].uri, 1, this.props.product[3], this.state.starCount)}
                        // onPress={() => Alert.alert(
                        //     "Alert Title",
                        //     "My Alert Msg",
                        //     [
                        //       {
                        //         text: "Cancel",
                        //         onPress: () => console.log("Cancel Pressed"),
                        //         style: "cancel"
                        //       },
                        //       { text: "OK", onPress: () => console.log("OK Pressed") }
                        //     ]
                        //   )}
                        />
                    </View>

                </ScrollView>
            </>

        )

    }
}
function mapStateToProps(state) {
    return {
        product: state.product,
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps)(Details);

const styles = StyleSheet.create({
    deatilHeading: {
        textAlign: "center",
        fontSize: 35,
        fontWeight: "bold",
        color: '#ff6600',
        textShadowColor: "#1f1f14",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 3,
        marginTop: 20
    },
    cardBox: {
        // flexDirection: 'row',
        // width: 150,
        // height: 150,
        margin: 15,
        borderColor: '#ff6600',
        borderWidth: 2,
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
})