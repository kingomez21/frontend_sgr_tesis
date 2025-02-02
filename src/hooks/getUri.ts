const getUri = () => {
    const isProduction = process.env.NODE_ENV === "production"
    return isProduction ? "https://web-production-b6a7.up.railway.app/api/v1/" : "http://localhost:8000/api/v1/"
}

export default getUri