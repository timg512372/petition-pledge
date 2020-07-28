import React, { Component } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import { sendFriendRequest, getSelectedActivity } from '../../redux/actions';
import EventCard from '../../components/EventCard';

class ProfileModal extends Component {
    componentDidMount() {
        if (this.props.route.params.user._id === this.props.auth.user._id) {
            this.props.navigation.navigate('Me');
        }

        this.props.getSelectedActivity(this.props.auth.token, this.props.route.params.user._id);
    }

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
                <Text status="info">
                    You can go back by swiping down from somewhere near the top, like around where
                    this is located
                </Text>
                {user.pfp ? (
                    <Image
                        source={{ uri: user.pfp }}
                        style={{ width: vw(9), height: vw(9), borderRadius: vw(4.5) }}
                    />
                ) : (
                    <Ionicons name="ios-contact" size={vw(9)} />
                )}
                <Text category="h4"> {user.name} </Text>
                <Text> {user.bio} </Text>

                {this.props.auth.user.friends.includes(user._id) ? (
                    <Text>Friends</Text>
                ) : (
                    <Button
                        onPress={() =>
                            this.props.sendFriendRequest(user._id, this.props.auth.token)
                        }
                    >
                        Send Friend Request
                    </Button>
                )}
                <Text>{this.props.status.loading ? 'Loading' : null}</Text>
                <Text>{this.props.status.error ? this.props.status.error : null}</Text>
                <Text>{this.props.status.success ? this.props.status.success : null}</Text>

                <Text category="h4"> Their Activity</Text>
                <ScrollView>
                    {this.props.petition.selectedActivity && this.props.petition.selectedActivity[0]
                        ? this.props.petition.selectedActivity.map((item, i) => (
                              <EventCard
                                  person={item.user}
                                  petition={item.petition}
                                  type={item.type}
                                  date={item.date}
                                  onPress={() =>
                                      this.props.navigation.navigate('PetitionModal', {
                                          petition: item.petition,
                                      })
                                  }
                                  key={i}
                              />
                          ))
                        : null}
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { auth, status, petition } = state;
    return { auth, status, petition };
};

export default connect(mapStateToProps, { sendFriendRequest, getSelectedActivity })(ProfileModal);
