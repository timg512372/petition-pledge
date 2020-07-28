import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Input, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import { getTimeline } from '../../redux/actions';

import EventCard from '../../components/EventCard';

class Timeline extends Component {
    componentDidMount() {
        this.props.getTimeline(this.props.auth.token);
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
                <Text category="h4"> Your Timeline </Text>
                <Button onPress={() => this.props.getTimeline(this.props.auth.token)}>
                    {' '}
                    Refresh{' '}
                </Button>
                <ScrollView>
                    {this.props.petition.timeline
                        ? this.props.petition.timeline.map((item, i) => (
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
                                      key={i}
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

export default connect(mapStateToProps, { getTimeline })(Timeline);
