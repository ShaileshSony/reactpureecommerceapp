import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductList from '../features/product-list/component/ProductList'
// import ProductList from '../features/product-list/ProductList'

function Home() {
  return (
    <Navbar>
        <ProductList/>
    </Navbar>
  )
}

export default Home