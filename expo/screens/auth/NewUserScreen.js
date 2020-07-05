import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Input, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';

class NewUserScreen extends Component {
    state = {
        username: '',
        password: '',
        cpassword: '',
    };

    // componentDidUpdate?
    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            nextProps.navigation.navigate('User');
        }
    }

    render() {
        return (
            <View style={{ width: vw(100), padding: vw(10), alignItems: 'center' }}>
                <Text category="h4" style={{ marginVertical: vh(10) }}>
                    Create an Account
                </Text>
                <Input
                    placeholder="Username"
                    onChangeText={(username) => this.setState({ username })}
                />
                <Input
                    placeholder="Password"
                    onChangeText={(password) => this.setState({ password })}
                    secureTextEntry
                />
                <Input
                    placeholder="Confirm Password"
                    onChangeText={(cpassword) => this.setState({ cpassword })}
                    secureTextEntry
                />
                <Button status="danger" style={{ margin: 10 }}>
                    {' '}
                    Connect with Instagram{' '}
                </Button>
                <Button style={{ margin: 10 }}> Create Account </Button>
            </View>
        );
    }
}

export default NewUserScreen;
