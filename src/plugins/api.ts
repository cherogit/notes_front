import axios from 'axios'

export const getUser = async () => {
    return await axios.get('http://localhost:8000/self')
}