import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Input, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import { addFriend, getFriendRequests, getFriends } from '../../redux/actions';

class FriendsScreen extends Component {
    componentDidMount() {
        this.props.getFriendRequests(this.props.auth.token);
        this.props.getFriends(this.props.auth.token);
    }

    render() {
        return (
            <View
                style={{
                    paddingHorizontal: vw(5),
                    paddingTop: vw(10),
                    width: vw(100),
                    height: vh(100),
                }}
            >
                <Text category="h4"> Social </Text>
                <ScrollView>
                    <Text category="h6"> Friend Requests </Text>
                    <Text category="h6"> Friend Requests </Text>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { auth, status, user } = state;
    return { auth, status, user };
};

export default connect(mapStateToProps, { addFriend, getFriendRequests, getFriends })(
    FriendsScreen
);
