// Import necessary libraries
import React from 'react';
import Slider from 'react-slick';
import ProductCard from '@/components/shared/ProductCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './style.css'; 

const ProductListing = ({
    products,
}) => {

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="tw-mb-20">
            <Slider {...settings} className='tw-flex tw-justify-between'>
                {products.map((item, index) => (
                    <div key={index} className='tw-px-2'>
                        <ProductCard 
                            item={item}
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default ProductListing;
