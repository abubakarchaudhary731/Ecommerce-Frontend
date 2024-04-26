'use client'
import React, { useEffect, useState } from "react";
import ProductDetailsCarousel from "./ProductDetailsCarousel";
import RatingStar from "@/components/inputfields/RatingStar";
import { Heart, ShoppingCart } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import './style.css';
import { getSingleProduct } from "@/reduxtoolkit/slices/products/ProductSlice";
import { useParams } from "next/navigation";
import QuantityButtons from "@/components/shared/QuantityButtons";

const Main = () => {
    const [quantity, setQuantity] = useState(1);
    const params = useParams()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSingleProduct(params.productdetail))
    }, [dispatch]);

    const { singleProduct } = useSelector((state) => state.Products);

    const discountedPrice = (item) => {
        if (item.discount && item.discount.is_active === 1) {
            const discountAmount = (item.price * item.discount.percentage) / 100;
            return Math.round(item.price - discountAmount);
        } else {
            return item.price;
        }
    };

    const handleAddition = () => {
        setQuantity(quantity + 1);
    };
    const handleSubtraction = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const addToCart = () => {
        console.log("Added to cart");
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
                    <div className="tw-flex tw-justify-between tw-my-3">
                        <p className="tw-text-4xl getProducts"> {singleProduct?.name} </p>
                        {singleProduct?.discount && singleProduct.discount.is_active === 1 && (
                            <p className="tw-text-sm tw-bg-primary tw-rounded-full tw-px-3 tw-py-1 tw-text-whitee"> <b className="tw-text-lg">{singleProduct?.discount.percentage}</b>% OFF </p>
                        )}
                    </div>
                    <div className="tw-text-xl getProducts tw-mb-3">
                        <b>Brand:</b> <i className="tw-text-icon tw-text-lg">{singleProduct?.brand}</i>
                    </div>
                    <p className="tw-mb-5">{singleProduct.description}</p>
                    <div className="tw-flex tw-gap-5">
                        <div className="tw-text-lg getProducts tw-mb-0">Price: ${discountedPrice(singleProduct)} </div>
                        {singleProduct?.discount && singleProduct.discount.is_active === 1 && (
                            <div className="tw-text-lg getProducts tw-mb-0 tw-text-primary"><del>${singleProduct?.price}</del></div>
                        )}
                    </div>
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
                    <div className="tw-my-5">
                        <QuantityButtons
                            quantity={quantity}
                            handleAddition={handleAddition}
                            handleSubtraction={handleSubtraction}
                        />
                    </div>
                    <button className="tw-w-full tw-mt-5 tw-flex tw-items-center tw-justify-center tw-gap-2 tw-py-4 tw-rounded-full tw-bg-black tw-text-white tw-text-lg" onClick={addToCart}>
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
