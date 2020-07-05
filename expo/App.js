import React from 'react';
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import { mapping } from '@eva-design/eva';
import { Ionicons } from '@expo/vector-icons';
import { SplashScreen } from 'expo';

import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import theme from './theme.js';
import { store } from './redux/store';
import AppNavigator from './navigation/AppNavigator';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadingComplete: false,
        };
        //setCustomText({ style: { fontFamily: 'Poppins' } });
    }

    async componentDidMount() {
        try {
            SplashScreen.preventAutoHide();

            // Load fonts
            await Font.loadAsync({
                ...Ionicons.font,
            });
        } catch (e) {
            // We might want to provide this error information to an error reporting service
            // console.warn(e);
        } finally {
            this.setState({ isLoadingComplete: true });
            SplashScreen.hide();
        }
    }

    render() {
        let state = store.getState();
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return <ApplicationProvider mapping={mapping} theme={theme}></ApplicationProvider>;
        }
        return (
            <Provider store={store}>
                <IconRegistry icons={EvaIconsPack} />
                <ApplicationProvider mapping={mapping} theme={theme}>
                    <AppNavigator />
                </ApplicationProvider>
            </Provider>
        );
    }
}

export default App;
