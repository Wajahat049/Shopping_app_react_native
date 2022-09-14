import React, { useState, useEffect, useRef } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput, ToastAndroid, Alert, Animated, Image,
  TouchableOpacity
} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Button,
  useTheme
} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

import { connect } from "react-redux"
import Icon from 'react-native-vector-icons/Ionicons';
import { changeisuser } from "../Store/action/index"
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';



import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';



GoogleSignin.configure({
  webClientId: '564106818309-d11gl37eoujl5g7bi4u87oa4ch48rvu0.apps.googleusercontent.com',


});

async function onGoogleButtonPress() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}


const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true
      }
    ).start();
  }, [fadeAnim])


  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}

function GoogleSignIn(props) {

  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);

  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const { colors } = useTheme();

  // const { signIn } = React.useContext(AuthContext);

  const textInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false
      });
    }
  }

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false
      });
    }
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  }

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true
      });
    } else {
      setData({
        ...data,
        isValidUser: false
      });
    }
  }

  const loginHandle = (userName, password) => {

    const foundUser = Users.filter(item => {
      return userName == item.username && password == item.password;
    });

    if (data.username.length == 0 || data.password.length == 0) {
      Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
        { text: 'Okay' }
      ]);
      return;
    }

    if (foundUser.length == 0) {
      Alert.alert('Invalid User!', 'Username or password is incorrect.', [
        { text: 'Okay' }
      ]);
      return;
    }
    signIn(foundUser);
  }

  const signout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
    GoogleSignin.signOut()
    setUser("")
    props.changeisuser({})
  }


  function onAuthStateChanged(user) {
    setUser(user);
    props.changeisuser(user)
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    props.changeisuser(user)

    return subscriber; // unsubscribe on unmount

  }, []);





  if (!user) {
    return (
      <ScrollView style={styles.container} >
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
          <Text style={styles.text_header}>Shopping App</Text>
        </View>

        <FadeInView>
          <Image style={{ alignSelf: "center", width: 150, height: 140, marginTop: -50, marginBottom: 10 }} source={require("../Images/Logo.png")} />
        </FadeInView>

        <Animatable.View
          animation="fadeInUpBig"
          style={
            [styles.footer, {
              backgroundColor: "white"
            }]}
        >

          <Text style={[styles.text_footer, {
            color: '#1f1f14'
          }]}>Username</Text>
          <View style={styles.action}>
            <FontAwesome
              name="user-o"
              color="#ff6600"
              size={20}
            />
            <TextInput
              placeholder="Email or Username"
              placeholderTextColor="#666666"
              style={[styles.textInput, {
                color: colors.text
              }]}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
              onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
            />
            {data.check_textInputChange ?
              <Animatable.View
                animation="bounceIn"
              >
                <Feather
                  name="check-circle"
                  color="green"
                  size={20}
                />
              </Animatable.View>
              : null}
          </View>
          {
            data.isValidUser ? null :
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
              </Animatable.View>
          }


          <Text style={[styles.text_footer, {
            color: '#1f1f14',
            marginTop: 35
          }]}>Password</Text>
          <View style={styles.action}>
            <Feather
              name="lock"
              color="#ff6600"
              size={20}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#666666"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={[styles.textInput, {
                color: colors.text
              }]}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity
              onPress={updateSecureTextEntry}
            >
              {data.secureTextEntry ?
                <Feather
                  name="eye-off"
                  color="grey"
                  size={20}
                />
                :
                <Feather
                  name="eye"
                  color="grey"
                  size={20}
                />
              }
            </TouchableOpacity>
          </View>
          {
            data.isValidPassword ? null :
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
              </Animatable.View>
          }


          <TouchableOpacity>
            <Text style={{ color: '#ff6600', marginTop: 15 }}>Forgot password?</Text>
          </TouchableOpacity>
          <View style={styles.button}>
            <TouchableOpacity
              style={[styles.signIn, {
                borderColor: '#ff6600',
                backgroundColor: '#ff6600',
                borderWidth: 1,
              }]}
              onPress={() => { loginHandle(data.username, data.password) }}
            >

              <View style={styles.signIn}>
                <Text style={[styles.textSign, {
                  color: 'white'
                }]}>Sign In</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate('Signup')}
              style={[styles.signIn, {
                borderColor: '#ff6600',
                borderWidth: 1,
                marginTop: 15
              }]}
            >
              <Text style={[styles.textSign, {
                color: '#ff6600'
              }]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <GoogleSigninButton style={{ marginLeft: 30, marginRight: 30, marginTop: 10, alignSelf: "center", height: 65 }}
            size={GoogleSigninButton.Size.Wide}

            onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
          />

        </Animatable.View >


        {/* </FadeInView> */}
      </ScrollView>
    );
  }

  else {

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

        <View style={styles.container}>

          <View style={styles.logoheader}>
            <Animatable.View
              animation="bounceIn"
              duraton="1500"
            >
              <Avatar.Image
                source={{
                  uri: user.photoURL
                }}
                size={200}
              />
            </Animatable.View>

          </View>
          <Animatable.View
            style={[styles.footer, {
              backgroundColor: colors.background
            }]}
            animation="fadeInUpBig"
          >
            <Text style={[styles.title, {
              color: colors.text
            }]}>WELCOME!</Text>

            <Text style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: '#ff6600',
              textShadowColor: "rgb(106, 109, 124)",
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 5,
              marginTop: 20,
              textTransform: "uppercase",
              textAlign: "center"
            }}>{user.displayName}</Text>


            <View style={{ margin: 70 }}>
              <Button icon="logout"
                mode="contained"
                labelStyle={{ color: "white", fontSize: 20 }}
                color="#ff6600"
                title="SignOut"
                onPress={() => signout()}
              >SIGN OUT</Button>
            </View>

          </Animatable.View>
        </View>

      </>
    )
  }

}




function mapStateToProps(state) {
  return {
    userInfo: state.userInfo
  }
}


function mapDispatchToProps(dispatch) {
  return {
    changeisuser: (userInfo) => dispatch(changeisuser(userInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleSignIn)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff6600'
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 50,
    textAlign: "center",
    alignItems: "center",
    marginTop: 10
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 20
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    textShadowColor: "black",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 10,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 25
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
  title: {
    color: '#1f1f14',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: "center"
  },
  logoheader: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 150,
    textAlign: "center",
    alignItems: "center",
    marginTop: 150
  }
});