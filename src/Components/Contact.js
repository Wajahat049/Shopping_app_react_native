import React from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    ImageBackground,
    ToastAndroid
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ContactIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';

import database from "@react-native-firebase/database";



const Contact = (props) => {

    const image = { uri: "data:image/jpeg;base64,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" };

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");

    function Send() {

        console.log("send=> ", name, email, msg)

        const emailSplit = email.split('@')[0]
        console.log("emailSplit", emailSplit)

        database()
            .ref(`Contact/${emailSplit}`)
            .set({
                name: name,
                email: email,
                msg: msg
            })
            .then(() => {
                console.log('Successfully send on Contact screen')
                setTimeout(() => {
                    setEmail("")
                    setMsg("")
                    setName("")
                    ToastAndroid.show("Successfully Send!", ToastAndroid.SHORT)
                    props.navigation.navigate('Home')
                }, 2000)
            }
            );
    }


    return (
        <ImageBackground source={image} resizeMode="cover" style={styles.container}>
            <StatusBar backgroundColor='#ff6600' barStyle="light-content" />
            <View style={{ backgroundColor: "#ff6600" }}>
                <View style={{ margin: 7 }}>
                    <Icon name='menu-sharp'
                        size={40}
                        color='white'
                        onPress={() => props.navigation.openDrawer()}
                    />

                </View>
            </View>
            <View style={styles.header}>
                <Text style={styles.text_header}>Contact Us</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>
                    <View style={styles.action}>
                        <ContactIcon
                            name="phone"
                            color={"#ff6600"}
                            size={30}
                        />
                        <Text style={{ marginLeft: 25, fontSize: 18, marginTop: 5 }}>
                            000-111-222-579
                        </Text>
                    </View>

                    <View style={styles.action}>
                        <ContactIcon
                            name="email"
                            color={"#ff6600"}
                            size={30}
                        />
                        <Text style={{ marginLeft: 25, fontSize: 18, marginTop: 5 }}>
                            shoppingapp@gmail.com
                        </Text>
                    </View>

                    <Text style={styles.text_footer}></Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color="#ff6600"
                            size={20}
                        />
                        <TextInput
                            placeholderTextColor={"gray"}
                            placeholder="Name"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(e) => setName(e)}
                        />
                    </View>

                    <View style={styles.action}>
                        <ContactIcon
                            name="email-outline"
                            color={"#ff6600"}
                            size={23}
                        />
                        <TextInput
                            placeholderTextColor={"gray"}
                            placeholder="Email"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(e) => setEmail(e)}
                        />
                    </View>

                    <View style={styles.action}>
                        <ContactIcon
                            name="message-outline"
                            color={"#ff6600"}
                            size={25}
                        />
                        <TextInput
                            placeholderTextColor={"gray"}
                            placeholder="Message"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(e) => setMsg(e)}
                        />
                    </View>

                    <View style={styles.button}>
                        <TouchableOpacity
                            style={[styles.signIn, {
                                borderColor: '#ff6600',
                                backgroundColor: '#ff6600',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                            onPress={() => Send()}
                        >
                            <View
                                color="white"
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: 'white'
                                }]}>Send</Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                </ScrollView>
            </Animatable.View>
        </ImageBackground>
    );
};

export default Contact;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#ff6600',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopRightRadius: 100,
        paddingHorizontal: 20,
        paddingVertical: 50,
        marginTop: -10,
        marginRight: 20,
        marginLeft: 20,
        marginBottom: 80,
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: "center"
    },
    text_footer: {
        color: '#1f1f14',
        marginTop: 15,
        fontSize: 18,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 20
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
});