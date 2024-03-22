import { createContext, useState, useContext, useEffect } from 'react'
import { UserType } from '../../interface'
import axios from '../../api'


interface User {
    user: UserType,
    setUser: (data: UserType) => void
}

const defaultUserContext = {
    user: {
        id: 0,
        user_name: '',
        email: ''
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

    useEffect(()=> {
        const token = localStorage.getItem('token')
        try {
            axios.post('/api/user', {}, { headers: { "authorization": "Bearer " + token } })
                .then((result) => {
                    if (result.data.status === "success") {
                        return setUser(result.data.user)
                    }
                    return alert("เข้าสู่ระบบใหม่")
                    
                })
        }catch(err){
            throw err
        }

    }, [])

    const [user, setUser] = useState<UserType>({ id: 0, user_name: '', email: '' })


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )

}