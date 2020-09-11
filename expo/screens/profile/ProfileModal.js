import React, { Component } from 'react';
import { View, Image, ScrollView, RefreshControl } from 'react-native';
import { Text, Button, TabView, Tab } from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import { sendFriendRequest, getSelectedActivity } from '../../redux/actions';
import EventCard from '../../components/EventCard';
import UserHeader from '../../components/UserHeader';
import TopBar from '../../components/TopBar';
import UserFeedback from '../../components/UserFeedback';

class ProfileModal extends Component {
    state = {
        selectedIndex: '',
    };

    componentDidMount() {
        if (this.props.route.params.user) {
            if (this.props.route.params.user._id === this.props.auth.user._id) {
                this.props.navigation.navigate('Me');
            }

            this.props.getSelectedActivity(this.props.auth.token, this.props.route.params.user._id);
        }
    }

    renderActivity(created) {
        let { activity } = this.props.petition;
        activity = activity.filter((item) => (item.type == 'CREATE_PETITION') == created);
        if (activity && activity[0]) {
            return (
                <ScrollView
                    contentContainerStyle={{ alignItems: 'center' }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.status.loading}
                            onRefresh={() => this.componentDidMount()}
                        />
                    }
                >
                    {activity.map((item, i) => (
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
                    ))}
                    <View style={{ height: vh(4) }} />
                </ScrollView>
            );
        } else {
            return (
                <View
                    style={{
                        marginTop: vh(20),
                        width: vw(100),
                        paddingHorizontal: vw(5),
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ color: '#CCCCCC' }}>
                        Looks like they haven't {created ? 'created' : 'signed'} any petitions
                    </Text>
                    <View
                        style={{
                            width: vw(40),
                            height: 2,
                            marginTop: 10,
                            marginBottom: 5,
                            borderRadius: 5,
                            backgroundColor: '#CCCCCC',
                        }}
                    />
                    <Text style={{ color: '#CCCCCC' }}>
                        Ask them to {created ? 'create' : 'sign'} some!
                    </Text>
                </View>
            );
        }
    }

    render() {
        const { user } = this.props.route.params;
        if (!user) {
            return (
                <View style={{ marginTop: vw(10) }}>
                    <Text category="h3">User not found!</Text>
                </View>
            );
        }

        return (
            <View
                style={{
                    paddingTop: vw(12),
                    width: vw(100),
                    height: vh(100),
                    // alignItems: 'center',
                    backgroundColor: '#FFFFFF',
                }}
            >
                <TopBar />
                <Text
                    category="h5"
                    status="primary"
                    style={{ width: vw(100), textAlign: 'center' }}
                >
                    {user.name}
                </Text>
                <UserHeader
                    user={user}
                    self={false}
                    onPressFriends={() =>
                        this.props.sendFriendRequest(user._id, this.props.auth.token)
                    }
                    friends={this.props.auth.user.friends.includes(user._id)}
                    // onPressRecommended={() => this.props.navigation.navigate('Recommended')}
                />

                <TabView
                    selectedIndex={this.state.selectedIndex}
                    onSelect={(selectedIndex) => this.setState({ selectedIndex })}
                    style={{ marginTop: vh(1), marginBottom: vh(17) }}
                >
                    <Tab
                        title={(props) => (
                            <Text style={{ ...props.style, fontSize: 20 }}>Created</Text>
                        )}
                    >
                        {this.renderActivity(true)}
                    </Tab>
                    <Tab
                        title={(props) => (
                            <Text style={{ ...props.style, fontSize: 20 }}>Signed</Text>
                        )}
                    >
                        {this.renderActivity(false)}
                    </Tab>
                </TabView>
                <UserFeedback {...this.props.status} />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { auth, status, petition } = state;
    return { auth, status, petition };
};

export default connect(mapStateToProps, { sendFriendRequest, getSelectedActivity })(ProfileModal);
