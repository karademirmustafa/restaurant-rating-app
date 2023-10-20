export const config = () => ({
    port:process.env.PORT || 5000,
    mongo_uri:process.env.MONGO_URI,
    jwt_secret_key:process.env.JWT_SECRET_KEY,
    jwt_expires_in:process.env.JWT_EXPIRES_IN
})