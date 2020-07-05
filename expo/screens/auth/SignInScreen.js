import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Input, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';

import { loginUser } from '../../redux/actions';

class SignInScreen extends Component {
    state = {
        username: '',
        password: '',
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            nextProps.navigation.navigate('User');
        }
    }

    render() {
        console.log(this.state.username);
        return (
            <View style={{ width: vw(100), padding: vw(10), alignItems: 'center' }}>
                <Text category="h1" style={{ marginVertical: vh(10) }}>
                    {' '}
                    Welcome to Petition Pledge
                </Text>
                <Text category="h4"> Sign In </Text>
                <Input
                    placeholder="Username"
                    onChangeText={(username) => this.setState({ username })}
                />
                <Input
                    placeholder="Password"
                    onChangeText={(password) => this.setState({ password })}
                    secureTextEntry
                />
                <Button
                    onPress={() => this.props.loginUser(this.state.username, this.state.password)}
                    style={{ margin: 10 }}
                >
                    Sign In
                </Button>
                <Button
                    onPress={() => this.props.navigation.navigate('NewUser')}
                    style={{ margin: 10 }}
                >
                    Create Account
                </Button>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { auth } = state;
    return auth;
};

export default connect(mapStateToProps, { loginUser })(SignInScreen);
