import axios from "axios"

export default async function getMovie({id}) {
    const movie_id = id
    const url = "http://localhost:8001/movies/" 
    const data = axios.get(url + movie_id).then((response) => console.log(response))
    return data
}