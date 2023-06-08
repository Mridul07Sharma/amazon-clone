import React from 'react'
import './Home.css'
import Product from './Product'
function Home() {
  return (
    <div className='home'>
        <div className="home_container">
            <img className='home_image' src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" alt="amazon" />

            <div className="home_row">
            <Product id='568234765834' title='Wonderchef Nutri-blend' price={2699.00} image='https://m.media-amazon.com/images/I/61J398ocuaL._SX425_.jpg' rating={4}/>
            <Product id='568234469872' title='Juicer Mixer Grinder' price={1899.00} image='https://m.media-amazon.com/images/I/7152-mn8mKL._SX425_.jpg' rating={2}/>
            </div>

            <div className="home_row">
                <Product id='435924954332' title='Fire-Boltt Smart Watch' price={1699.00} image='https://m.media-amazon.com/images/I/61S9aVnRZDL._SY450_.jpg'  rating={4}/>
                <Product id='258369987452' title='All-New Echo Dot Smart speaker' price={5499.00} image='https://m.media-amazon.com/images/I/71nnEBYAP1L._SY450_.jpg'  rating={4}/>
                <Product id='987563287461' title='Apple 10.2-inch iPad with A13 Bionic chip ' price={32900.00} image='https://m.media-amazon.com/images/I/61NGnpjoRDL._SX466_.jpg'  rating={5}/>
            </div>

            <div className="home_row">
                <Product id='868123646534' title='Samsung 80 cm (32 Inches) Wondertainment Series HD Ready LED Smart TV UA32T4340BKXXL (Glossy Black)' price={12990.00} image='https://m.media-amazon.com/images/I/71a4ZQNqTiL._SX450_.jpg' rating={5}/>
            </div>
        </div>
    </div>
  )
}

export default Home