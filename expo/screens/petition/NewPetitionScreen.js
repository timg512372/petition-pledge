import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Input, Button } from '@ui-kitten/components';
import { connect } from 'react-redux';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';

import { newPetition } from '../../redux/actions';

class NewPetitionScreen extends Component {
    state = {
        name: '',
        description: '',
        num: '',
        url: '',
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
                <Text>{this.props.petition.loading ? 'Loading' : null}</Text>
                <Text>{this.props.petition.error ? this.props.petition.error : null}</Text>
                <Text>{this.props.petition.success ? this.props.petition.success : null}</Text>
                <Button
                    onPress={() =>
                        this.props.newPetition(
                            this.state.name,
                            this.state.description,
                            this.state.url,
                            this.state.num,
                            this.props.auth.user.token
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
    const { auth, petition } = state;
    return { auth, petition };
};

export default connect(mapStateToProps, { newPetition })(NewPetitionScreen);
