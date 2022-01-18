import React from 'react'

import "./HomeBody.css"

import Products from '../Products/Products'

export default function HomeBody() {
    return (
        <div className='HomeBody'>
            <h3>All products</h3>
            <Products limit={20}  />
        </div>
    )
}
