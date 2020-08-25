import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Input, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import * as Contacts from 'expo-contacts';

import {
    addFriend,
    getFriendRequests,
    getFriends,
    removeFriendRequest,
    connectContacts,
    getRecommendedUsers,
} from '../../redux/actions';
import UserCard from '../../components/UserCard';

class FriendsScreen extends Component {
    componentDidMount() {
        this.props.getFriendRequests(this.props.auth.token);
        this.props.getFriends(this.props.auth.token);
        this.props.getRecommendedUsers(this.props.auth.token);
    }

    getContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.Emails],
            });

            if (data.length > 0) {
                const contacts = data.flat();
                const emails = [];

                contacts.forEach((element) => {
                    if (element.emails && element.emails[0]) {
                        element.emails.forEach((email) => emails.push(email.email));
                    }
                });

                this.props.connectContacts(emails, this.props.auth.token);
            }
        }
    };

    render() {
        console.log(this.props.user.recommendedUsers);
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
                    {this.props.user.friendRequests ? (
                        this.props.user.friendRequests.map((user) => (
                            <UserCard
                                user={user}
                                request
                                onPress={() =>
                                    this.props.navigation.navigate('ProfileModal', { user })
                                }
                                onConfirm={() =>
                                    this.props.addFriend(user._id, this.props.auth.token)
                                }
                                onDelete={() =>
                                    this.props.removeFriendRequest(user._id, this.props.auth.token)
                                }
                            />
                        ))
                    ) : (
                        <Text> No friend requests found </Text>
                    )}
                    <Text category="h6"> Friends </Text>
                    {this.props.user.friends ? (
                        this.props.user.friends.map((user) => (
                            <UserCard
                                user={user}
                                onPress={() =>
                                    this.props.navigation.navigate('ProfileModal', { user })
                                }
                            />
                        ))
                    ) : (
                        <Text> No friends found :( </Text>
                    )}

                    <Text category="h6"> Suggested Users </Text>

                    {this.props.user.recommendedUsers ? (
                        this.props.user.recommendedUsers.map((user) => (
                            <UserCard
                                user={user}
                                onPress={() =>
                                    this.props.navigation.navigate('ProfileModal', { user })
                                }
                            />
                        ))
                    ) : (
                        <Text> No recommended users found. Did you connect your contacts? </Text>
                    )}

                    {this.props.auth.user.contacts && this.props.auth.user.contacts[0] ? null : (
                        <Button onPress={this.getContacts}> Connect your Contacts </Button>
                    )}

                    <Text>{this.props.status.loading ? 'Loading' : null}</Text>
                    <Text>{this.props.status.error ? this.props.status.error : null}</Text>
                    <Text>{this.props.status.success ? this.props.status.success : null}</Text>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { auth, status, user } = state;
    return { auth, status, user };
};

export default connect(mapStateToProps, {
    addFriend,
    getFriendRequests,
    getFriends,
    removeFriendRequest,
    connectContacts,
    getRecommendedUsers,
})(FriendsScreen);
