import React, { Component } from 'react';
import {
    View,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';
import { Text, Input, Button, Autocomplete, AutocompleteItem } from '@ui-kitten/components';
import { connect } from 'react-redux';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';

import { newPetition, clear, getTags, newTag } from '../../redux/actions';
import TagCard from '../../components/TagCard';
import SelectImage from '../../components/SelectImage';
import UserFeedback from '../../components/UserFeedback';

class NewPetitionScreen extends Component {
    state = {
        name: '',
        description: '',
        num: '',
        url: '',
        tags: [],
        tagsText: '',
        image: '',
    };

    componentDidMount() {
        this.props.clear();
        this.props.getTags();
    }

    onAddTag = (index) => {
        if (index === this.props.tag.tags.length) {
            this.props.newTag(this.state.tagsText, this.props.auth.token);
        } else {
            let tag = this.props.tag.tags[index];
            if (this.state.tags.filter((item) => item._id == tag._id).length === 0) {
                this.setState({
                    tags: [...this.state.tags, tag],
                });
            }
        }
    };

    render() {
        return (
            <KeyboardAvoidingView behavior="padding">
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <ScrollView
                        style={{
                            paddingHorizontal: vw(5),
                            paddingTop: vw(11),
                            width: vw(100),
                            height: vh(100),
                            backgroundColor: '#fefffe',
                        }}
                        contentContainerStyle={{
                            alignItems: 'center',
                            paddingBottom: vh(50),
                        }}
                    >
                        <Text
                            category="h3"
                            status="primary"
                            style={{ textAlign: 'center', marginTop: vh(1), marginBottom: vh(3) }}
                        >
                            {' '}
                            Create New Petition{' '}
                        </Text>
                        <Input
                            placeholder="Name"
                            onChangeText={(name) => this.setState({ name })}
                        />
                        <Input
                            placeholder="Description"
                            multiline={true}
                            onChangeText={(description) => this.setState({ description })}
                            textStyle={{ minHeight: 64 }}
                            style={{ marginVertical: vh(1) }}
                        />
                        <Input placeholder="URL" onChangeText={(url) => this.setState({ url })} />
                        <Input
                            placeholder="Signatures Required"
                            onChangeText={(num) => this.setState({ num })}
                            style={{ marginVertical: vh(1) }}
                        />

                        <Autocomplete
                            placeholder="Search Tags"
                            onChangeText={(tagsText) => {
                                this.setState({ tagsText });
                                this.props.getTags(tagsText);
                            }}
                            onSelect={this.onAddTag}
                            style={{ width: '100%', marginBottom: vh(1) }}
                        >
                            {this.props.tag.tags
                                ? this.props.tag.tags.map((tag, i) => (
                                      <AutocompleteItem key={i} title={tag.name} />
                                  ))
                                : null}
                            <AutocompleteItem
                                key={-1}
                                title={'Create new tag "' + this.state.tagsText + '"'}
                            />
                        </Autocomplete>

                        <View style={{ flexDirection: 'row', marginBottom: vh(1) }}>
                            {this.state.tags.map((tag, i) => (
                                <TagCard
                                    tag={tag}
                                    key={tag._id}
                                    onPress={() => {
                                        let { tags } = this.state;
                                        tags.splice(i, 1);
                                        this.setState({ tags });
                                    }}
                                    small
                                />
                            ))}
                        </View>

                        <SelectImage
                            uri={this.state.image.uri}
                            setImage={(image) => this.setState({ image })}
                        />

                        <UserFeedback {...this.props.status} />
                        <Button
                            onPress={() =>
                                this.props.newPetition(
                                    this.state.name,
                                    this.state.description,
                                    this.state.url,
                                    this.state.num,
                                    this.props.auth.token,
                                    this.state.tags,
                                    this.state.image
                                )
                            }
                            style={{ marginTop: vh(1) }}
                        >
                            Submit
                        </Button>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    }
}

const mapStateToProps = (state) => {
    const { auth, status, tag } = state;
    return { auth, status, tag };
};

export default connect(mapStateToProps, { newPetition, clear, getTags, newTag })(NewPetitionScreen);
