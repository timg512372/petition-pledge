import React, { Component } from 'react';
import { View, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Text } from '@ui-kitten/components';
import { connect } from 'react-redux';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';

import { getPetitions } from '../../redux/actions';
import PetitionCard from '../../components/PetitionCard';

class ExplorePetition extends Component {
    componentDidMount() {
        this.props.getPetitions(this.props.route.params.tag.name);
    }

    render() {
        let tag = this.props.route.params.tag.name;
        console.log(this.props.petition.tag);
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View
                    style={{
                        paddingHorizontal: vw(5),
                        paddingTop: vw(10),
                        width: vw(100),
                        height: vh(100),
                    }}
                >
                    <Text category="h4"> Explore Petitions </Text>
                    <Text category="h6"> Tag: {tag} </Text>
                    <ScrollView style={{ flexWrap: 'wrap', flexDirection: 'row', width: vw(90) }}>
                        {this.props.petition.tag
                            ? this.props.petition.tag.map((petition) => (
                                  <PetitionCard
                                      petition={petition}
                                      onPress={() =>
                                          this.props.navigation.navigate('PetitionModal', {
                                              petition,
                                          })
                                      }
                                      key={petition._id}
                                  />
                              ))
                            : null}
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const mapStateToProps = (state) => {
    const { petition } = state;
    return { petition };
};

export default connect(mapStateToProps, { getPetitions })(ExplorePetition);
