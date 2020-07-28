import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Text, Input, Button, Autocomplete, AutocompleteItem } from '@ui-kitten/components';
import { connect } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
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
        image: '',
    };

    componentDidMount() {
        this.props.clear();
        this.props.getTags();
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                this.setState({ image: result });
            }

            console.log(result);
        } catch (E) {
            console.log(E);
        }
    };

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
        console.log(this.state.image);
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

                <Button onPress={this.pickImage}>Choose an image</Button>
                <Image source={{ uri: this.state.image.uri }} style={{ width: 200, height: 200 }} />

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
                            this.state.tags,
                            this.state.image
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
