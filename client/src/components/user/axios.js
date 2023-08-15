import axios from "axios";

const client = axios.create({baseURL: "https://remotecoderscollaboration.online/"})

export const request = ({...options}) => {
    client.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`
    const onSuccess = (response) => response
    const onError = (error) =>{
        return error
    }

    return client(options).then(onSuccess).catch(onError)
}