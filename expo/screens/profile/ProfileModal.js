import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Input, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import { sendFriendRequest } from '../../redux/actions';

class ProfileModal extends Component {
    render() {
        const { user } = this.props.route.params;
        console.log(user);

        return (
            <View
                style={{
                    paddingHorizontal: vw(5),
                    paddingTop: vw(10),
                    width: vw(100),
                    height: vh(100),
                }}
            >
                <Text category="h4"> {user.name} </Text>
                <Text> {user.description} </Text>
                <Button
                    onPress={() => this.props.sendFriendRequest(user._id, this.props.auth.token)}
                >
                    Send Friend Request
                </Button>
                <Text>{this.props.status.loading ? 'Loading' : null}</Text>
                <Text>{this.props.status.error ? this.props.status.error : null}</Text>
                <Text>{this.props.status.success ? this.props.status.success : null}</Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { auth, status } = state;
    return { auth, status };
};

export default connect(mapStateToProps, { sendFriendRequest })(ProfileModal);
