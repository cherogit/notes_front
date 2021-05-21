import axios from 'axios'
import {User} from '@/typings'

export const getUser = async (): Promise<User> => {
    return await axios.get('http://localhost:8000/self')
}