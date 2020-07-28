import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Input, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import { addFriend, getFriendRequests, getFriends, removeFriendRequest } from '../../redux/actions';
import UserCard from '../../components/UserCard';

class FriendsScreen extends Component {
    componentDidMount() {
        this.props.getFriendRequests(this.props.auth.token);
        this.props.getFriends(this.props.auth.token);
    }

    render() {
        console.log(this.props.user.friendRequests);
        console.log(this.props.user.friends);
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
                    {this.props.user.friendRequests
                        ? this.props.user.friendRequests.map((user) => (
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
                                      this.props.removeFriendRequest(
                                          user._id,
                                          this.props.auth.token
                                      )
                                  }
                              />
                          ))
                        : null}
                    <Text category="h6"> Friends </Text>
                    {this.props.user.friends
                        ? this.props.user.friends.map((user) => (
                              <UserCard
                                  user={user}
                                  onPress={() =>
                                      this.props.navigation.navigate('ProfileModal', { user })
                                  }
                              />
                          ))
                        : null}
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
})(FriendsScreen);
