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
