import * as nodeFetch from "node-fetch"

export const getLoginToken = async () => {
    const response = await nodeFetch("http://localhost:2221/api/login", {
        method: "POST",
        body: JSON.stringify({ "username": "admin", "password": "Admin123" })
    })
    const body = await response.json()
    return body.token
}