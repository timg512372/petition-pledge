import React, { Component } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
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
        console.log(this.props.petition.timeline);
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
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.status.loading}
                            onRefresh={() => this.props.getTimeline(this.props.auth.token)}
                        />
                    }
                >
                    {this.props.petition.timeline && this.props.petition.timeline[0] ? (
                        this.props.petition.timeline.map((item, i) => (
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
                    ) : (
                        <Text> No Timeline Events</Text>
                    )}
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { auth, petition, status } = state;
    return { auth, petition, status };
};

export default connect(mapStateToProps, { getTimeline })(Timeline);
