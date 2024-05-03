import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AbButton from '@/components/inputfields/AbButton';
import { IconButton } from '@mui/material';
import { ArrowRight, Heart } from 'iconsax-react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { addSnackbarData } from '@/reduxtoolkit/slices/SnakMessageSlice';
import { addToCart } from '@/reduxtoolkit/slices/cart/CartSlice';

const ProductCard = ({ item }) => {
    const [isClicked, setIsClicked] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    const handleProductDetail = () => {
        // dispatch(getSingleProduct(item.id));
        router.push(`/products/${item.slug}`);
    }
    const discountedPrice = (item) => {
        if (item.discount && item.discount.is_active === 1) {
            const discountAmount = (item.price * item.discount.percentage) / 100;
            return Math.round(item.price - discountAmount);
        } else {
            return item.price;
        }
    };

    // Add to cart
    const { token } = useSelector((state) => state.LoginUser);
    const productAddToCart = (id) => {
        if (token) {
            dispatch(addToCart({ product_id: id })).then((result) => {
                console.log(result);
                if (result?.payload?.id || result?.payload?.cart) {
                    dispatch(addSnackbarData({ message: 'Added To Cart', variant: 'success' }));
                } else {
                    dispatch(addSnackbarData({ message: "The product is out of stock", variant: 'error' }));
                }
            });
        } else {
            dispatch(addSnackbarData({ message: 'Please Login First', variant: 'error' }));
        }
    }

    return (
        <Card>
            {
                item.discount && item.discount.is_active === 1 && (
                    <div className='tw-bg-primary tw-absolute tw-text-whitee tw-px-2 tw-py-1'> {item.discount.percentage}%</div>
                )
            }
            <CardMedia
                component="img"
                height="250"
                image={item.thumbnail}
                alt="Product Image"
                style={{ objectFit: 'cover', height: '250px' }}
            />
            <CardContent>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        className='tw-flex tw-gap-2 tw-items-center'
                        style={{ cursor: 'pointer' }}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleProductDetail}
                    >
                        {item.name}
                        <span style={{ display: isHovered ? 'inline-block' : 'none' }}>
                            <ArrowRight className='tw-text-primary' />
                        </span>
                    </Typography>
                    <IconButton onClick={handleClick}>
                        <Heart style={{ fill: isClicked ? '#D23F57' : 'none', color: isClicked ? '#D23F57' : 'none' }} />
                    </IconButton>
                </div>
                <div>
                    <b className='tw-text-primary tw-mr-3'>Rs. {discountedPrice(item)}</b>
                    {item.discount && item.discount.is_active === 1 && <i><del>Rs. {item.price}</del></i>}
                </div>
                <AbButton
                    type={"button"}
                    label={"Add to Cart"}
                    className="tw-mt-3"
                    handleClick={() => productAddToCart(item.id)}
                />
            </CardContent>
        </Card>
    );
}

export default ProductCard;