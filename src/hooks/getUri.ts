const getUri = () => {
    const isProduction = process.env.NODE_ENV === "production"
    return isProduction ? "https://web-production-fbf4.up.railway.app/api/v1/" : "http://localhost:8000/api/v1/"
}

export default getUri