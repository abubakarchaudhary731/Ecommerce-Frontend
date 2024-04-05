import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Banner = () => {
    // Array of images and texts
    const data = [
        {
            imageSrc: "/images/static/emelie.jpg",
            text: "Take care of your health, Delivery Within 1 hour."
        },
        {
            imageSrc: "/images/static/emelie2.jpeg",
            text: "Stay fit and healthy, Order now for quick delivery."
        },
        {
            imageSrc: "/images/static/emelie3.jpeg",
            text: "Enjoy fast delivery and quality service for all orders."
        },
        // Add more objects for additional images and texts
    ];
    

    const [currentIndex, setCurrentIndex] = useState(0); 
    const [windowWidth, setWindowWidth] = useState(0); 

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="tw-py-16">
            <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-center">
                <div className="tw-max-w-md tw-mb-4 md:tw-mb-0 tw-order-2 md:tw-order-1">
                    <h1 className="tw-text-4xl tw-font-bold tw-leading-tight tw-mb-4 tw-mt-4 md:tw-mt-0">{data[currentIndex].text}</h1>
                    <div className="tw-flex">
                        <button onClick={handlePrev} className="tw-bg-primary tw-font-bold tw-text-white tw-px-6 tw-py-2 tw-rounded-lg tw-mr-2">Previous</button>
                        <button onClick={handleNext} className="tw-bg-primary tw-font-bold tw-text-white tw-px-6 tw-py-2 tw-rounded-lg">Next</button>
                    </div>
                </div>
                <div className="tw-flex-shrink-0 tw-order-1 md:tw-order-2">
                    <Image
                        alt="Not Found"
                        src={data[currentIndex].imageSrc}
                        width={450} 
                        height={400} 
                        className="tw-object-contain"
                        style={{
                            aspectRatio: "1/1", 
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Banner;
