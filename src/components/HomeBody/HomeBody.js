import React from 'react'

import "./HomeBody.css"

import Products from '../Products/Products'
import { Link } from 'react-router-dom'

export default function HomeBody() {
    return (
        <div className='HomeBody'>
            <h3>Last products</h3>
            <Link to="products" className='see-all-products'>See all products</Link>
            <Products />
        </div>
    )
}
