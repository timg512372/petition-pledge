import { SERVER_URL, IMAGEKIT_PUBLIC, IMAGEKIT_URL } from 'react-native-dotenv';
const ImageKit = require('imagekit-javascript');

export const processError = (e) => {
    if (typeof e == 'string') {
        return e;
    }

    let message = '';
    Object.keys(e).map((key) => {
        message += e[key] + '. ';
    });
    return message;
};

export const getImageKit = () => {
    const sample = new ImageKit({
        publicKey: IMAGEKIT_PUBLIC,
        authenticationEndpoint: `${SERVER_URL}/api/auth/imageKit`,
        urlEndpoint: IMAGEKIT_URL,
    });

    return sample;
};
