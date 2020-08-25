import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Spinner } from '@ui-kitten/components';

class UserFeedback extends Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (!prevProps.error && this.props.error) {
            Alert.alert('Error', this.props.error, [{ text: 'OK', onPress: () => null }], {
                cancelable: true,
            });
        }
        if (!prevProps.success && this.props.success) {
            Alert.alert(
                'Success',
                this.props.success,
                [{ text: 'OK', onPress: this.props.onSuccess ? this.props.onSuccess : null }],
                {
                    cancelable: true,
                }
            );
        }
    }

    render() {
        return <View>{this.props.loading ? <Spinner /> : null}</View>;
    }
}

export default UserFeedback;
