import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Input, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import { registerUser, clearAuth } from '../../redux/actions';

class NewUserScreen extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        cpassword: '',
    };

    componentWillMount() {
        this.props.clearAuth();
    }

    // componentDidUpdate?
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.user) {
            nextProps.navigation.navigate('User');
        }
    }

    render() {
        return (
            <View style={{ width: vw(100), padding: vw(10), alignItems: 'center' }}>
                <Text category="h4" style={{ marginVertical: vh(10) }}>
                    Create an Account
                </Text>
                <Input placeholder="Name" onChangeText={(name) => this.setState({ name })} />
                <Input placeholder="Email" onChangeText={(email) => this.setState({ email })} />
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
                <Text>{this.props.auth.loading ? 'Loading' : null}</Text>

                <Text>{this.props.auth.error}</Text>

                <Button status="danger" style={{ margin: 10 }}>
                    {' '}
                    Connect with Instagram{' '}
                </Button>
                <Button
                    style={{ margin: 10 }}
                    onPress={() =>
                        this.props.registerUser(
                            this.state.name,
                            this.state.email,
                            this.state.password,
                            this.state.cpassword
                        )
                    }
                >
                    {' '}
                    Create Account{' '}
                </Button>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { auth } = state;
    return { auth };
};

export default connect(mapStateToProps, { registerUser, clearAuth })(NewUserScreen);
