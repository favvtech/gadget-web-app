import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import HeroBanner from '../components/home/HeroBanner'
import PromotionalBanners from '../components/home/PromotionalBanners'
import ProductCategories from '../components/home/ProductCategories'
import ServiceGuarantees from '../components/home/ServiceGuarantees'
import FeaturedProducts from '../components/home/FeaturedProducts'
import SmartphoneTrends from '../components/home/SmartphoneTrends'
import '../styles/pages/Home.css'

const Home = () => {
  return (
    <div className="home-page">
      <HeroBanner />
      <PromotionalBanners />
      <ProductCategories />
      <ServiceGuarantees />
      <FeaturedProducts />
      <SmartphoneTrends />
    </div>
  )
}

export default Home
