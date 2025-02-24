export default {
    meEndPoint: `${import.meta.env.VITE_API_BE}/auth/me`,
    loginEndPoint: `${import.meta.env.VITE_API_BE}/login`,
    registerEndPoint: `${import.meta.env.VITE_API_BE}/register/users`,
    storageTokenKeyName: 'accessToken',
    onTokenExpiration: 'refreshToken',
}