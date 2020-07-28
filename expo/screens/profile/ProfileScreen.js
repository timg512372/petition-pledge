import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

import EventCard from '../../components/EventCard';
import { getActivityData } from '../../redux/actions';

class ProfileScreen extends Component {
    componentDidMount() {
        this.props.getActivityData(this.props.auth.token);
    }

    render() {
        const { user } = this.props.auth;
        const { activity } = this.props.petition;
        console.log(user);

        if (!user) {
            this.props.navigation.navigate('Auth');
            return null;
        }
        return (
            <View
                style={{
                    paddingHorizontal: vw(2),
                    paddingTop: vw(12),
                    width: vw(100),
                    height: vh(100),
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        width: vw(96),
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}
                >
                    <Ionicons
                        name="ios-contact"
                        size={vw(7)}
                        onPress={() => this.props.navigation.navigate('Friends')}
                    />
                    <Text category="h4"> {user.name} </Text>
                    <Ionicons
                        name="ios-settings"
                        size={vw(7)}
                        onPress={() => this.props.navigation.navigate('Settings')}
                    />
                </View>

                <Text category="h6">{this.props.auth.user.bio}</Text>

                <ScrollView>
                    {activity
                        ? activity.map((item, i) => (
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
    const { auth, petition } = state;
    return { auth, petition };
};

export default connect(mapStateToProps, { getActivityData })(ProfileScreen);
