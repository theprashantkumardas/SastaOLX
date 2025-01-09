import React from 'react'
import Hero from '../components/Hero/Hero'
import ProductList from '../components/Products/ProductList'
import Footer from '../components/Fotter/Fotter'
import HomeProducts from '../components/CollectionForHome/HomeProducts'


const Home = () => {
    return(
        <>
        <Hero/>
        <HomeProducts/>
        <ProductList/>
        <Footer/>
        </>
        
        
    )

}



export default Home