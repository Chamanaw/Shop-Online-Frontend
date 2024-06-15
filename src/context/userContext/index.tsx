import { createContext, useState, useContext, useEffect } from 'react'
import { UserType } from '../../types'
import axios from '../../api'
import { useNavigate } from 'react-router-dom'


interface User {
    user: UserType,
    setUser: (data: UserType) => void
}

const defaultUserContext = {
    user: {
        user_name: '',
        email: '',
        image: ''
    },
    setUser: (_data: UserType) => { }
}

const UserContext = createContext<User>(defaultUserContext)

export function useUserContext() {
    return useContext(UserContext)
}

interface Props {
    children: React.ReactNode
}


export default function UserContextProvider({ children }: Props) {
    const [user, setUser] = useState<UserType>({ user_name: '', email: '', image: '' })
    const navigate = useNavigate()
    const getUser = async () => {
        const result = await axios.get('/api/user')
        setUser(result.data)
    }
    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if(token){getUser()}
        else{navigate('/')} 
    },[])
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}