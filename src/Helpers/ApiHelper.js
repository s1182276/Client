import {API_URL} from "../app.config";

const getToken = async () => {
    return await window.msalModule.acquireTokenSilent();
}

export const getAsync = async (path, id) => {
    let url = `${API_URL}/${path}`;
    if (id !== undefined && id !== null) {
        url = `${url}/${id}`;
    }

    let token = await getToken();

    return await $.get({
        url: url,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", `Bearer ${token}`);
        }
    });
}

export const postAsync = async (path, data) => {
    let url = `${API_URL}/${path}`;
    let token = await getToken();

    return await $.post({
        url: url,
        data: JSON.stringify(data),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("content-type", "application/json");
            xhr.setRequestHeader("authorization", `Bearer ${token}`);
        }
    });
}

export const putAsync = async (path, id, data) => {
    let url = `${API_URL}/${path}/${id}`;
    let token = await getToken();

    return await $.put({
        url: url,
        data: JSON.stringify(data),
        beforeSend: function (xhr) {
            xhr.setRequestHeader("content-type", "application/json");
            xhr.setRequestHeader("authorization", `Bearer ${token}`);
        }
    });
}

export const deleteAsync = async (path, id) => {
    let url = `${API_URL}/${path}/${id}`;
    let token = await getToken();

    return await $.delete({
        url: url,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("authorization", `Bearer ${token}`);
        }
    })
}