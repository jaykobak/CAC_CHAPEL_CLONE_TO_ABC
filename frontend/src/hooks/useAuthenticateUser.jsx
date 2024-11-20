import useAuthStore from '@/stores/authStore'
import React from 'react'

const useAuthenticateUser = () => {
    const authenticate = (token) => {
        const setAuth = useAuthStore(state => state.setAuth)
        console.log(token)
        setAuth({token: data.accessToken})
    }

    return authenticate
}

export default useAuthenticateUser
