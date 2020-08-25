import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';

class UserHeader extends Component {
    render() {
        console.log(this.props.user);

        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: vh(2.5),
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginHorizontal: vw(1.6),
                    width: vw(100),
                }}
            >
                {this.props.user.pfp ? (
                    <Image
                        source={{ uri: this.props.user.pfp }}
                        style={{
                            width: vw(22),
                            height: vw(22),
                            borderRadius: vw(11),
                            marginHorizontal: vw(5),
                        }}
                    />
                ) : (
                    <Ionicons
                        name="ios-contact"
                        size={vw(22)}
                        style={{ marginHorizontal: vw(5) }}
                    />
                )}
                <View
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        marginLeft: vw(2),
                    }}
                >
                    <Text status="primary" style={{ width: vw(60) }}>
                        {this.props.user.bio ? this.props.user.bio : 'No bio set'}
                    </Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: vh(0.5),
                        }}
                    >
                        <Ionicons name="ios-flash" size={vw(5)} />
                        <Text category="c1">&emsp;Active this Week </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button
                            status="success"
                            size="small"
                            appearance="ghost"
                            onPress={this.props.onPressFriends}
                            style={{ marginRight: vw(3) }}
                        >
                            {this.props.user.friends.length} Friends
                        </Button>

                        {this.props.self ? (
                            <Button
                                status="success"
                                size="small"
                                onPress={this.props.onPressFriends}
                            >
                                Find Friends
                            </Button>
                        ) : null}
                    </View>
                </View>
            </View>
        );
    }
}

export default UserHeader;
