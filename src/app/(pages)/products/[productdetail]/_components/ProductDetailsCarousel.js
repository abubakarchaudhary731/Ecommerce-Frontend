import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductDetailsCarousel = ({
    images,
    thumbnail
}) => {
    return (
        <div className="tw-text-white tw-text-[20px] tw-w-full tw-max-w-[1300px] tw-mx-auto tw-sticky tw-top-[50px]">
            <Carousel
                infiniteLoop={true}
                showIndicators={false}
                showStatus={false}
                thumbWidth={60}
                className="productCarousel"
            >
                <div key="thumbnail">
                    <img
                        src={thumbnail}
                        alt="Thumbnail"
                        className="tw-h-[80vh] tw-object-cover"
                    />
                </div>
                {images?.map((image, index) => (
                    <div key={index}>
                        <img
                            src={image}
                            alt={`Image not found`}
                            className="tw-h-[80vh] tw-object-cover"
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default ProductDetailsCarousel;
