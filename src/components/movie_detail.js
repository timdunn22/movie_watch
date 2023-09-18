import React, { Component, Fragment } from "react"
import axios from "axios"

class MovieDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movie: null
        }
    }

    resetState = (movie) => {
        this.setState({ movie: movie })
    }

    getMovie = pk => {
        axios.get( "http://localhost:8001/movies/" + pk).then(() => {
            this.resetState()
        })
    }

    render() {
        return (
            <p>{this.state.movie.links[0].link_url}</p>
        )
    }
}

export default MovieDetail