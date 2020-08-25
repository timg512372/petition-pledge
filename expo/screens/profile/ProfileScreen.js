import React, { Component } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { Text, Tab, TabView } from '@ui-kitten/components';
import { connect } from 'react-redux';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import { AntDesign, Ionicons } from '@expo/vector-icons';

import EventCard from '../../components/EventCard';
import { getActivityData } from '../../redux/actions';
import UserHeader from '../../components/UserHeader';

class ProfileScreen extends Component {
    state = {
        selectedIndex: '',
    };

    componentDidMount() {
        this.props.getActivityData(this.props.auth.token);
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
                            onRefresh={() => this.props.getActivityData(this.props.auth.token)}
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
                        Looks like you haven't {created ? 'created' : 'signed'} any petitions
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
                        Click the&ensp;
                        <Ionicons
                            name={created ? 'ios-add-circle-outline' : 'ios-search'}
                            size={20}
                            style={{ marginBottom: -5, marginTop: 4 }}
                            color="#CCCCCC"
                        />
                        &ensp;icon to start!
                    </Text>
                </View>
            );
        }
    }

    render() {
        const { user } = this.props.auth;
        console.log(user);

        if (!user) {
            this.props.navigation.navigate('Auth');
            return null;
        }
        return (
            <View
                style={{
                    paddingTop: vw(12),
                    width: vw(100),
                    height: vh(100),
                    backgroundColor: '#FFFFFF',
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        width: vw(100),
                        paddingHorizontal: vw(7),
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <AntDesign
                        name="bells"
                        size={vw(8)}
                        onPress={() => this.props.navigation.navigate('Friends')}
                        color="#67438D"
                    />
                    <Text category="h5" status="primary">
                        {user.name}
                    </Text>
                    <AntDesign
                        name="setting"
                        size={vw(8)}
                        onPress={() => this.props.navigation.navigate('Settings')}
                        color="#67438D"
                    />
                </View>
                <UserHeader
                    user={user}
                    self={true}
                    onPressFriends={() => this.props.navigation.navigate('Friends')}
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
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { auth, petition, status } = state;
    return { auth, petition, status };
};

export default connect(mapStateToProps, { getActivityData })(ProfileScreen);
