'use client'
import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import ProductDetailsCarousel from "./ProductDetailsCarousel";
import RatingStar from "@/components/inputfields/RatingStar";
import './style.css';
import { Heart, ShoppingCart } from "iconsax-react";

const Main = () => {
    const singleProduct = {
        title: "Sample Product",
        brand: "Sample Brand",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        price: 100, // Sample price
        stock: 10, // Sample stock
        rating: 4, // Sample rating
        images: [
            "/images/static/emelie2.jpeg",
            "/images/static/emelie3.jpeg",
            "/images/static/emelie.jpg",
        ],
        thumbnail: "/images/static/emelie.jpg",
    };
    return (
        <div className="tw-w-full tw-my-10">
            <div className="tw-flex tw-flex-col lg:tw-flex-row md:tw-px-10 tw-gap-[50px] lg:tw-gap-[100px]">
                {/* left column start */}
                <div className="tw-w-full md:tw-w-auto tw-flex-[1.5] tw-max-w-[500px] lg:tw-max-w-full tw-mx-auto lg:tw-mx-0">
                    <ProductDetailsCarousel
                        images={singleProduct?.images}
                        thumbnail={singleProduct?.thumbnail}
                    />
                </div>
                {/* left column end */}

                {/* right column start */}
                <div className="tw-flex-1 tw-py-3">
                    <div className="tw-text-[34px] tw-font-semibold tw-my-3">
                        {singleProduct.title}
                    </div>
                    <div className="tw-text-xl tw-font-semibold tw-mb-3">
                        <b>Brand:</b> {singleProduct.brand}
                    </div>
                    <p className="tw-mb-5">{singleProduct.description}</p>
                    <div className="tw-text-lg tw-font-semibold tw-mb-0">MRF : ${singleProduct.price} </div>
                    <div className="tw-text-base tw-font-medium tw-text-black/[.5]">
                        incl. of taxes
                    </div>
                    <div className="tw-text-base tw-font-medium tw-text-black/[.5]">
                        {`(Also includes all applicable duties)`}
                    </div>
                    {/* Rating Component */}
                    <div className="tw-mt-5 tw-flex tw-justify-between">
                        <div className="tw-text-base"><b>In Stock:</b> <i className="tw-font-medium tw-text-black/[.5]"> {singleProduct.stock}pc </i></div>
                        <RatingStar
                            value={singleProduct.rating}
                            readOnly
                        />
                    </div>

                    <div className="tw-mt-10">
                        <div className="tw-flex tw-justify-between tw-mb-2">
                            <div className="tw-text-base tw-font-semibold">Size Select</div>
                            <div className="tw-text-base tw-font-semibold">Select Guide</div>
                        </div>

                        <div className="tw-grid tw-grid-cols-3 tw-gap-2">
                            <div className="tw-border tw-rounded-full tw-text-center tw-py-3 tw-font-medium tw-hover:border-black tw-cursor-pointer">
                                UK 5
                            </div>
                            <div className="tw-border tw-rounded-full tw-text-center tw-py-3 tw-font-medium tw-cursor-not-allowed tw-bg-black/[.1] tw-opacity-50">
                                UK 6
                            </div>
                            <div className="tw-border tw-rounded-full tw-text-center tw-py-3 tw-font-medium tw-hover:border-black tw-cursor-pointer">
                                UK 7
                            </div>
                            <div className="tw-border tw-rounded-full tw-text-center tw-py-3 tw-font-medium tw-hover:border-black tw-cursor-pointer">
                                UK 8
                            </div>
                            <div className="tw-border tw-rounded-full tw-text-center tw-py-3 tw-font-medium tw-hover:border-black tw-cursor-pointer">
                                UK 9
                            </div>
                            <div className="tw-border tw-rounded-full tw-text-center tw-py-3 tw-font-medium tw-cursor-not-allowed tw-bg-black/[.1] tw-opacity-50">
                                UK 10
                            </div>
                        </div>
                        <div className="tw-text-red-600 tw-mt-1">
                            {" "}
                            Size selection is required
                        </div>
                    </div>
                    <button className="tw-w-full tw-mt-5 tw-flex tw-items-center tw-justify-center tw-gap-2 tw-py-4 tw-rounded-full tw-bg-black tw-text-white tw-text-lg">
                        Add to Cart
                        <ShoppingCart />
                    </button>
                    <button className="tw-w-full tw-py-4 tw-mt-5 tw-border tw-border-black tw-flex tw-items-center tw-justify-center tw-gap-2 tw-mb-10 tw-rounded-full tw-bg-white tw-text-black tw-text-lg">
                        Wishlist
                        <Heart />
                    </button>
                </div>
                {/* right column end */}
            </div>
        </div>
    );
};

export default Main;
