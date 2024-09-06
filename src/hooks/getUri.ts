const getUri = () => {
    const isProduction = process.env.NODE_ENV === "production"
    return isProduction ? "server" : "http://localhost:8000/api/v1/"
}

export default getUri