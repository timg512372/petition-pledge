import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Input, Button, Autocomplete, AutocompleteItem } from '@ui-kitten/components';
import { connect } from 'react-redux';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';

import { newPetition, clear, getTags, newTag } from '../../redux/actions';
import TagCard from '../../components/TagCard';

class NewPetitionScreen extends Component {
    state = {
        name: '',
        description: '',
        num: '',
        url: '',
        tags: [],
        includedTags: [],
        tagsText: '',
    };

    componentWillMount() {
        this.props.clear();
        this.props.getTags();
    }

    onAddTag = (index) => {
        if (index === this.props.tag.tags.length) {
            this.props.newTag(this.state.tagsText, this.props.auth.token);
        } else if (!this.state.includedTags[index]) {
            let { includedTags } = this.state;
            includedTags[index] = true;
            this.setState({
                tags: [...this.state.tags, this.props.tag.tags[index]],
                includedTags: includedTags,
            });
        }
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
                <Text category="h4"> Create New Petition </Text>
                <Input placeholder="Name" onChangeText={(name) => this.setState({ name })} />
                <Input
                    placeholder="Description"
                    multiline={true}
                    onChangeText={(description) => this.setState({ description })}
                    textStyle={{ minHeight: 64 }}
                />
                <Input placeholder="URL" onChangeText={(url) => this.setState({ url })} />
                <Input
                    placeholder="Signatures Required"
                    onChangeText={(num) => this.setState({ num })}
                />

                {this.state.tags.map((tag, i) => (
                    <TagCard
                        tag={tag}
                        key={tag._id}
                        onPress={() => {
                            let { tags, includedTags } = this.state;
                            tags.splice(i, 1);
                            includedTags[i] = false;
                            this.setState({ tags, includedTags });
                        }}
                        small
                    />
                ))}
                <Autocomplete
                    placeholder="Select Tags"
                    onChangeText={(tagsText) => {
                        this.setState({ tagsText });
                        this.props.getTags(tagsText);
                    }}
                    onSelect={this.onAddTag}
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

                <Text>{this.props.status.loading ? 'Loading' : null}</Text>
                <Text>{this.props.status.error ? this.props.status.error : null}</Text>
                <Text>{this.props.status.success ? this.props.status.success : null}</Text>
                <Button
                    onPress={() =>
                        this.props.newPetition(
                            this.state.name,
                            this.state.description,
                            this.state.url,
                            this.state.num,
                            this.props.auth.token,
                            this.state.tags
                        )
                    }
                >
                    Submit
                </Button>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    const { auth, status, tag } = state;
    return { auth, status, tag };
};

export default connect(mapStateToProps, { newPetition, clear, getTags, newTag })(NewPetitionScreen);
