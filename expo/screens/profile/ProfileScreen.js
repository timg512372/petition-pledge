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
        console.log('componentdidmount');
        this.props.getActivityData(this.props.auth.user.user.activity, this.props.auth.user.token);
    }

    render() {
        const { user } = this.props.auth.user;
        const { activity } = this.props.petition;
        console.log(user);
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
                        onPress={() => this.componentWillMount()}
                    />
                    <Text category="h4"> {user.name} </Text>
                    <Ionicons name="ios-settings" size={vw(7)} />
                </View>

                <ScrollView>
                    {activity
                        ? activity.map((item) => (
                              <>
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
                                  />
                              </>
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
