import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Input, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import { sendFriendRequest } from '../../redux/actions';

class SettingsScreen extends Component {
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
                <Text category="h4"> Settings </Text>
                <Text> Nothing here yet </Text>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { auth, status } = state;
    return { auth, status };
};

export default connect(mapStateToProps, { sendFriendRequest })(SettingsScreen);
