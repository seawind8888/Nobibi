'use strict';

let HOST = 'http://localhost:8000/cmfx';

let Util = {
    get: (url, successCallback, failCallback) => {
        fetch(HOST + url)
            .then((response) => response.text())
            .then((responseText) => {
                successCallback(JSON.parse(responseText));
            })
            .catch((err) => {
                failCallback(err);
            });
    },
    post: (url, method, body, successCallback, failCallback) => {
        fetch(HOST + url, {
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

// export function request(url, method, body) {
//     var isOk;
//     return new Promise((resolve, reject) => {
//         fetch(HOST + url, {
//             method: method,
//             body: body,
//         })
//             .then((response) => {
//                 if (!response.error) {
//                     isOk = true;
//                 } else {
//                     isOk = false;
//                 }
//                 alert(response);
//                 return response.json();
//             })
//             .then((responseData) => {
//                 if (isOk) {
//                     console.log(resolve(responseData));
//                     resolve(responseData);
//                 } else {
//                     reject(responseData);
//                 }
//             })
//             .catch((error) => {
//                 reject(error);
//             });
//     })
// }
