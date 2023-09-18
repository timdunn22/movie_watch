import React from 'react'
import { Pagination } from "react-bootstrap"
import {Container} from "@mui/material"
import 'bootstrap/dist/css/bootstrap.min.css'


export default class PaginationView extends React.Component {


    render_first() {
        return <Pagination.First disabled={this.props.current === 1} href={this.getPaginationLink(1)} />
    }
    render_previous() {
        return <Pagination.Prev disabled={this.props.current === 1} href={this.getPaginationLink(this.props.current - 1)} />
    }
    render_page_numbers(numbers) {
        return numbers.map(number => this.render_pagination_item(number))
    }
    render_first_items() {
        if (this.props.current > 3 && (this.props.current < this.props.totalPages - 5)) {
            return this.render_page_numbers([this.props.current, this.props.current + 1, this.props.current + 2])
        }
        else if ((this.props.current > 3 && (this.props.current >= this.props.totalPages - 5)) || (this.props.current <= 3 && this.props.totalPages >= 3)) {
            return this.render_page_numbers([1, 2, 3])
        }
        else {
            if (this.props.totalPages >= 3) {
                return this.render_page_numbers([1, 2, 3])
            }
            else if (this.props.totalPages === 1) {
                return this.render_page_numbers([1])
            }
            else {
                return this.render_page_numbers([1, 2])
            }
        }
    }
    render_dots() {
        if (this.props.totalPages >= 6) {
            return <Pagination.Ellipsis />
        }
    }
    render_after_dots() {
        if (this.props.totalPages >= 6) {
            return this.render_page_numbers([this.props.totalPages - 2, this.props.totalPages - 1, this.props.totalPages])
        }
        else if (this.props.totalPages === 4) {
            return this.render_page_numbers([this.props.totalPages])
        }
        else {
            return this.render_page_numbers([this.props.totalPages - 1, this.props.totalPages])
        }
    }
    render_pagination_item(number) {
        return <Pagination.Item key={number} active={this.props.current === number}
            disabled={this.props.totalPages < number} href={this.getPaginationLink(number)}>{number}</Pagination.Item>
    }
    render_next() {
        return <Pagination.Next disabled={this.props.current === this.props.totalPages}
            href={this.getPaginationLink(this.props.current + 1)} />
    }
    render_last() {
        return <Pagination.Last disabled={this.props.current === this.props.totalPages}
            href={this.getPaginationLink(this.props.totalPages)} />
    }

    getPaginationLink(number) {
        let url = window.location.href
        let current_param = `current=n_${this.props.current}`
        console.log('url came in at', url)
        console.log('results per page came in at', this.props.resultsPerPage)
        if (url.includes(current_param)) {
            return url.replace(current_param, `current=n_${number}`)
        }
        else if (url.includes('?')) {
            return url + `&current=n_${number}_n`
        }
        else {
            return url + `?current=n_${number}_n&size=n_${this.props.resultsPerPage}_n`
        }
    }
    // componentDidMount() {
    //     this.url = this.window.href
    // }
    render() {
        return (
            
                <Pagination >
                    {(this.props.current >= 1) && this.render_first()}
                    {(this.props.current >= 1) && this.render_previous()}
                    {(this.props.current >= 1) && this.render_first_items()}
                    {(this.props.totalPages >= 6) && this.render_dots()}
                    {(this.props.totalPages >= 4) && this.render_after_dots()}
                    {(this.props.current >= 1) && this.render_next()}
                    {(this.props.current >= 1) && this.render_last()}
                </Pagination>
            

        )
    }
}