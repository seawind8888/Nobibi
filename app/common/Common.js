'use strict';

let Util = {
    get: (url, successCallback, failCallback) => {
        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                successCallback(responseJson);
            })
            .catch((err) => {
                failCallback(err);
            });
    },
    post: (url, method, body, successCallback, failCallback) => {
        fetch(url, {
            method: method,
            body: body,
        })
            .then((response) => response.text())
            .then((responseText) => {
                successCallback(JSON.parse(responseText));
            })
            .catch((err) => {
                failCallback(err);
            });
    }
}

export default Util
