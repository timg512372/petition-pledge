import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { Text, Input, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import * as AppleAuthentication from 'expo-apple-authentication';
// import * as Google from 'expo-google-app-auth';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';

import { loginUser, clear, loginApple } from '../../redux/actions';
import UserFeedback from '../../components/UserFeedback';

class SignInScreen extends Component {
    state = {
        username: '',
        password: '',
    };

    componentWillMount() {
        this.props.clear();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.user) {
            nextProps.navigation.navigate('User');
        }
    }

    render() {
        return (
            <View
                style={{
                    width: vw(100),
                    padding: vw(10),
                    alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                    height: vh(100),
                }}
            >
                <Text
                    category="h1"
                    status="primary"
                    style={{ marginVertical: vh(8), textAlign: 'center' }}
                >
                    {' '}
                    Welcome to Pledgify
                </Text>
                <Text category="h2" status="primary" style={{ marginVertical: vh(2) }}>
                    Sign In
                </Text>
                <Input
                    placeholder="Email"
                    onChangeText={(username) => this.setState({ username })}
                />
                <Input
                    placeholder="Password"
                    onChangeText={(password) => this.setState({ password })}
                    secureTextEntry
                    style={{ marginVertical: 10 }}
                />
                <UserFeedback error={this.props.auth.error} loading={this.props.auth.loading} />
                <Button
                    onPress={() => this.props.loginUser(this.state.username, this.state.password)}
                    style={{ margin: 10 }}
                    status="success"
                    size="large"
                >
                    Sign In
                </Button>
                {Platform.OS == 'ios' ? (
                    <AppleAuthentication.AppleAuthenticationButton
                        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                        cornerRadius={5}
                        style={{ width: vw(50), height: vw(12) }}
                        onPress={this.props.loginApple}
                    />
                ) : null}

                <Button
                    onPress={() => this.props.navigation.navigate('NewUser')}
                    style={{ margin: 10 }}
                    size="large"
                    status="success"
                >
                    Create Account
                </Button>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { auth } = state;
    return { auth };
};

export default connect(mapStateToProps, { loginUser, clear, loginApple })(SignInScreen);
