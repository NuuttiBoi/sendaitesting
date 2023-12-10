
import axios from 'axios'
import {Mongoose} from "mongoose";
const baseUrl = 'http://localhost:3001/work_types'

const getAll = async () => {
    const response = axios.get(baseUrl)
    return response.then(response => response.data)
}

const getWorkType = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return await response.data
}



const createWork = async (newObject) => {
    const response = await axios.post(baseUrl, newObject)
    console.log('axios success')
    return await response.data
}


const create = async (newObject) => {
    const response = await axios.post(baseUrl, newObject)
    console.log('axios success')
    return await response.data
}
/*
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    console.log('axios success')
    return request.then(response => response.data)
}
 */

const createNew = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => {
        localStorage.setItem('token', response.data.token);
        return response.data;
    })
}

const update = async (id, newObject) => {
    const request = await axios.post(`${baseUrl}/${id}`, newObject)
    return await request.then(response => response.data)
}


const deletePerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response)
}

const newColumn = async () => {
    const request = axios.post('http://localhost:3001/work_types/addColumn')
    return request.then(response => response)
}

/*
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

const deletePerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response)
} */

export default { getAll, create, createNew, update, deletePerson, getWorkType, newColumn}