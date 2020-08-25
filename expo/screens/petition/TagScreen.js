import React, { Component } from 'react';
import { View, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Text, Input, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';

import { getTags, search } from '../../redux/actions';
import TagCard from '../../components/TagCard';
import PetitionCard from '../../components/PetitionCard';
import UserCard from '../../components/UserCard';
import { TouchableOpacity } from 'react-native-gesture-handler';

class TagScreen extends Component {
    state = {
        search: '',
    };

    componentDidMount() {
        this.props.getTags();
    }
    renderSearch = () => {
        // console.log('results');
        // console.log(this.props.petition);
        if (this.props.status.loading) {
            return <Text> Loading</Text>;
        }
        return (
            <View style={{ alignItems: 'center' }}>
                <Text category="h5"> Searched Users </Text>
                {this.props.petition.search.users && this.props.petition.search.users[0] ? (
                    this.props.petition.search.users.map((user, i) => (
                        <UserCard
                            user={user}
                            key={i}
                            onPress={() => {
                                Keyboard.dismiss();
                                this.props.navigation.navigate('ProfileModal', {
                                    user,
                                });
                            }}
                        />
                    ))
                ) : (
                    <Text> No petitions found :( </Text>
                )}
                <Text category="h5"> Searched Petitions </Text>
                {this.props.petition.search.petitions ? (
                    this.props.petition.search.petitions.map((petition, i) => (
                        <PetitionCard
                            search
                            petition={petition}
                            key={i}
                            onPress={() => {
                                Keyboard.dismiss();
                                this.props.navigation.navigate('PetitionModal', {
                                    petition,
                                });
                            }}
                        />
                    ))
                ) : (
                    <Text> No users found :( </Text>
                )}

                <Text category="h5"> Searched Tags </Text>
                {this.props.petition.search.tags ? (
                    this.props.petition.search.tags.map((tag, i) => (
                        <TagCard
                            tag={tag}
                            key={i}
                            onPress={() => {
                                Keyboard.dismiss();
                                this.props.navigation.navigate('ExplorePetition', {
                                    tag,
                                });
                            }}
                        />
                    ))
                ) : (
                    <Text> No users found :( </Text>
                )}
            </View>
        );
    };

    renderTags = () => {
        let displayedBubbles = bubbles;
        if (vh(1) / vw(1) > 2) {
            displayedBubbles = bubbles.concat(bubbles_extended);
        }

        return (
            <View style={{ alignItems: 'center' }}>
                <Text category="h2" status="primary" style={{ margin: 5 }}>
                    {' '}
                    Explore Petitions{' '}
                </Text>
                <Text category="h5" status="success">
                    {' '}
                    Trending Tags{' '}
                </Text>
                {displayedBubbles.map((bubble, i) => (
                    <View
                        style={{
                            position: 'absolute',
                            top: bubble.y,
                            left: bubble.x,
                            backgroundColor: bubble.color,
                            borderRadius: bubble.r,

                            zIndex: 10,
                        }}
                        key={i}
                    >
                        <TouchableOpacity
                            style={{
                                height: bubble.r * 2,
                                width: bubble.r * 2,
                                borderRadius: bubble.r,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onPress={() =>
                                this.props.tag.tags && this.props.tag.tags[bubble.tag]
                                    ? this.props.navigation.navigate('ExplorePetition', {
                                          tag: this.props.tag.tags[bubble.tag],
                                      })
                                    : null
                            }
                        >
                            <Text adjustsFontSizeToFit style={{ color: '#FEFFFE' }}>
                                {this.props.tag.tags && this.props.tag.tags[bubble.tag]
                                    ? this.props.tag.tags[bubble.tag].name
                                    : null}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        );
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View
                    style={{
                        paddingHorizontal: vw(5),
                        paddingTop: vw(10),
                        width: vw(100),
                        height: vh(100),
                        backgroundColor: '#FEFFFE',
                    }}
                >
                    <Input
                        onChangeText={(search) => {
                            console.log(search);
                            this.setState({ search });
                            this.props.search(search, this.props.auth.token);
                        }}
                        placeholder="Search"
                        accessoryLeft={(props) => {
                            const { marginHorizontal } = props.style;
                            return (
                                <Ionicons
                                    size={props.style.height}
                                    style={{ marginHorizontal }}
                                    color={props.style.tintColor}
                                    name="ios-search"
                                />
                            );
                        }}
                    />
                    {this.state.search ? this.renderSearch() : this.renderTags()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const mapStateToProps = (state) => {
    const { tag, petition, status, auth } = state;
    return { tag, petition, status, auth };
};

const bubbles = [
    { x: vw(14), y: vw(22), r: vw(16), color: '#3C2165', tag: 0 },
    { x: vw(49), y: vw(50), r: vw(13), color: '#56a993', tag: 2 },
    { x: vw(67), y: vw(26), r: vw(12), color: '#3C2165', tag: 1 },
    { x: vw(1), y: vw(60), r: vw(15), color: '#56a993', tag: 3 },
    { x: vw(37), y: vw(72.6), r: vw(10), color: '#3C2165', tag: 4 },
    { x: vw(65), y: vw(75), r: vw(14), color: '#3C2165', tag: 5 },
    { x: vw(13), y: vw(90), r: vw(14), color: '#3C2165', tag: 6 },
    { x: vw(44), y: vw(100), r: vw(16), color: '#56a993', tag: 7 },
    { x: vw(0), y: vw(35), r: vw(6), color: '#3C2165', tag: -1 },
    { x: vw(48), y: vw(26), r: vw(8), color: '#56a993', tag: -1 },
    { x: vw(34), y: vw(54), r: vw(6), color: '#56a993', tag: -1 },
    { x: vw(80), y: vw(53), r: vw(5), color: '#56a993', tag: -1 },
    { x: vw(1), y: vw(110), r: vw(5), color: '#56a993', tag: -1 },
    { x: vw(82), y: vw(105.6), r: vw(5), color: '#3C2165', tag: -1 },
    { x: vw(80), y: vw(121), r: vw(6), color: '#56a993', tag: -1 },
];

const bubbles_extended = [
    { x: vw(1), y: vw(130), r: vw(15), color: '#56a993', tag: 8 },
    { x: vw(62), y: vw(134), r: vw(13), color: '#3C2165', tag: 9 },
    { x: vw(30), y: vw(124), r: vw(7), color: '#3C2165', tag: -1 },
    { x: vw(35), y: vw(147.4), r: vw(5), color: '#3C2165', tag: -1 },
    { x: vw(45), y: vw(137), r: vw(6), color: '#56a993', tag: -1 },
];

export default connect(mapStateToProps, { getTags, search })(TagScreen);
