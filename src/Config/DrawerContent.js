import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from "react-redux"


function DrawerContent(props) {
    const [Photo, setPhoto] = useState("https://png.pngtree.com/png-vector/20190225/ourlarge/pngtree-vector-avatar-icon-png-image_702436.jpg")
    const [Name, setName] = useState("Name")
    const [Email, setEmail] = useState("Email")
    const [Disable, setDisable] = useState(true)

    useEffect(() => {


        if (props.userInfo != {} && props.userInfo != null) {
            setPhoto(props.userInfo.photoURL),
                setName(props.userInfo.displayName),
                setEmail(props.userInfo.email),
                setDisable(false)
        }
        else {
            setPhoto("https://png.pngtree.com/png-vector/20190225/ourlarge/pngtree-vector-avatar-icon-png-image_702436.jpg")
            setName("Name")
            setEmail("Email")
            setDisable(true)
        }
    })

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
                                }}
                                size={55}
                            />

                            <View style={{ marginLeft: 10, flexDirection: 'column' }}>
                                <Title style={styles.title}>{Name}</Title>
                                <Caption style={styles.caption}>{Email}</Caption>
                            </View>
                        </View>


                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="contacts"
                                    color={"#ff6600"}
                                    size={30}
                                />
                            )}
                            label="Main"
                            onPress={() => Disable ? alert("Please Sign-in first") : props.navigation.navigate('Main')}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="home-outline"
                                    color={"#ff6600"}
                                    size={30}
                                />
                            )}
                            label="Home"
                            onPress={() => Disable ? alert("Please Sign-in first") : props.navigation.navigate('Home')}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="grid"
                                    color={"#ff6600"}
                                    size={30}
                                />
                            )}

                            label="Categories"
                            onPress={() => Disable ? alert("Please Sign-in first") : props.navigation.navigate('Categories')}
                        />
                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="cart-outline"
                                    color={"#ff6600"}
                                    size={30}
                                />
                            )}
                            label="Cart"
                            onPress={() => Disable ? alert("Please Sign-in first") : props.navigation.navigate('Cart')}
                        />

                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="magnify"
                                    color={"#ff6600"}
                                    size={30}
                                />
                            )}

                            label="Search Product"
                            onPress={() => Disable ? alert("Please Sign-in first") : props.navigation.navigate('Search')}
                        />

                        <DrawerItem
                            icon={({ color, size }) => (
                                <Icon
                                    name="phone"
                                    color={"#ff6600"}
                                    size={30}
                                />
                            )}

                            label="Contact"
                            onPress={() => Disable ? alert("Please Sign-in first") : props.navigation.navigate('Contact')}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 15,
        paddingTop: 20
    },
    title: {
        fontSize: 18,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 35,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});

function mapStateToProps(state) {
    return {
        userInfo: state.userInfo
    }
}

export default connect(mapStateToProps)(DrawerContent)
