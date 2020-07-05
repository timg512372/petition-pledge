import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import SignInScreen from '../screens/auth/SignInScreen';
import NewUserScreen from '../screens/auth/NewUserScreen';
import TimelineScreen from '../screens/timeline/TimelineScreen';
import ExplorePetitionScreen from '../screens/petition/ExplorePetitionScreen';
import PetitionModal from '../screens/petition/PetitionModal';

const Auth = createStackNavigator();
const AuthNavigator = () => {
    return (
        <Auth.Navigator headerMode={null}>
            <Auth.Screen name="SignIn" component={SignInScreen} />
            <Auth.Screen name="NewUser" component={NewUserScreen} />
            {/* <Auth.Screen name="ForgetPassword" component={ForgetPasswordScreen} /> */}
        </Auth.Navigator>
    );
};

const User = createBottomTabNavigator();
const UserNavigator = () => {
    return (
        <User.Navigator>
            <User.Screen name="Timeline" component={TimelineScreen} />
            <User.Screen name="ExplorePetition" component={ExplorePetitionScreen} />
        </User.Navigator>
    );
};

const Modal = createStackNavigator();
const ModalNavigator = () => {
    return (
        <Modal.Navigator headerMode={null} mode="modal">
            <Modal.Screen name="User" component={UserNavigator} />
            <Modal.Screen name="Petition" component={PetitionModal} />
        </Modal.Navigator>
    );
};

const App = createStackNavigator();
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <App.Navigator headerMode={null}>
                <App.Screen name="Auth" component={AuthNavigator} />
                <App.Screen name="User" component={ModalNavigator} />
            </App.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
