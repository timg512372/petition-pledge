import React, { Component } from 'react';
import { View, ScrollView, Keyboard } from 'react-native';
import { Text, Input } from '@ui-kitten/components';
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

class TagScreen extends Component {
    state = {
        search: '',
    };

    componentDidMount() {
        this.props.getTags();
    }

    sampleFunction = (props) => {
        console.log(props);
        return <Ionicons {...props} name="ios-search" />;
    };

    renderTags = () => {
        console.log('tags');
        console.log(this.props.tag);

        return (
            <View style={{ alignItems: 'center' }}>
                <Text category="h4"> Explore Petitions </Text>
                <Text category="h6"> Trending Tags </Text>
                <ScrollView style={{ flexWrap: 'wrap', flexDirection: 'row', width: vw(90) }}>
                    {this.props.tag.tags
                        ? this.props.tag.tags.map((tag) => (
                              <TagCard
                                  tag={tag}
                                  onPress={() =>
                                      this.props.navigation.navigate('ExplorePetition', { tag })
                                  }
                                  key={tag._id}
                              />
                          ))
                        : null}
                </ScrollView>
            </View>
        );
    };

    renderSearch = () => {
        // console.log('results');
        // console.log(this.props.petition);
        if (this.props.status.loading) {
            return <Text> Loading</Text>;
        }
        return (
            <View style={{ alignItems: 'center' }}>
                <Text category="h5"> Searched Users </Text>
                {this.props.petition.search.users && this.props.petition.search.users[0]
                    ? this.props.petition.search.users.map((user, i) => (
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
                    : null}
                <Text category="h5"> Searched Petitions </Text>
                {this.props.petition.search.petitions
                    ? this.props.petition.search.petitions.map((petition, i) => (
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
                    : null}
            </View>
        );
    };

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
        );
    }
}

const mapStateToProps = (state) => {
    const { tag, petition, status, auth } = state;
    return { tag, petition, status, auth };
};

export default connect(mapStateToProps, { getTags, search })(TagScreen);
