import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Text } from '@ui-kitten/components';
import {
    widthPercentageToDP as vw,
    heightPercentageToDP as vh,
} from 'react-native-responsive-screen';
import ProgressBar from './ProgressBar';

const EventCard = (props) => {
    let date = '';
    if (props.date) {
        let dateObj = new Date(props.date);
        date = dateObj.toLocaleDateString();
    }

    return (
        <TouchableOpacity
            style={{
                borderWidth: 3,
                borderColor: '#3C2165',
                width: vw(90),
                borderRadius: vw(3),
                padding: vw(2),
                alignItems: 'center',
                marginVertical: vw(2),
            }}
            onPress={props.onPress}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                }}
            >
                <Text status="success" category="c1">
                    {props.type == 'CREATE_PETITION' ? 'Created by ' : 'Signed by '}
                    {props.person ? props.person.name : 'Loading'}{' '}
                </Text>
                <Text status="success" category="c1">
                    {date}
                </Text>
            </View>
            <Text category="h6" style={{ marginVertical: vw(1) }}>
                {props.petition ? props.petition.name : 'Loading'}
            </Text>
            {/* <Image source={PETITION} style={{ width: 488 / 3, height: 488 / 3 }} /> */}
            {props.petition ? (
                <ProgressBar
                    current={props.petition.signers.length}
                    goal={props.petition.goal}
                    point
                />
            ) : null}
        </TouchableOpacity>
    );
};

export default EventCard;

// "timeline": Array [
//     Object {
//       "date": "2020-07-09T08:20:53.873Z",
//       "petition": Object {
//         "__v": 1,
//         "_id": "5f06d3655c630c008b6012a0",
//         "creator": "5f06d0a594db61fedf9cbf64",
//         "date": "2020-07-09T08:20:53.873Z",
//         "description": "Petition Description etc etc etc etc etc etc etc etc etc etc etc etc",
//         "goal": 10,
//         "name": "Generic Change.org Petition 4",
//         "signers": Array [
//           "5f06d1b4b6714fff17cf131c",
//         ],
//         "url": "https://www.change4.org",
//       },
//       "type": "CREATE_PETITION",
//       "user": Object {
//         "__v": 5,
//         "_id": "5f06d0a594db61fedf9cbf64",
//         "activity": Array [
//           Object {
//             "date": "2020-07-09T08:20:53.873Z",
//             "petition": "5f06d3655c630c008b6012a0",
//             "type": "CREATE_PETITION",
//             "user": "5f06d0a594db61fedf9cbf64",
//           },
//         ],
// "email": "test2@test.com",
//         "friends": Array [
//           "5f06d1b4b6714fff17cf131c",
//         ],
//         "name": "User 2",
