import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Input, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';

import { loginUser, clear } from '../../redux/actions';

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
        console.log(this.props.auth);
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
                <Text>{this.props.auth.loading ? 'Loading' : null}</Text>
                <Text>{this.props.auth.error}</Text>
                <Button
                    onPress={() => this.props.loginUser(this.state.username, this.state.password)}
                    style={{ margin: 10 }}
                >
                    Sign In
                </Button>
                <Button
                    onPress={() => console.log('Not Implemented')}
                    style={{ margin: 10 }}
                    disabled
                >
                    Sign In With Instagram
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
    return { auth };
};

export default connect(mapStateToProps, { loginUser, clear })(SignInScreen);
