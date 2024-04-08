import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AbButton from '@/components/inputfields/AbButton';
import RatingStar from '@/components/inputfields/RatingStar';
import { IconButton } from '@mui/material';
import { Heart } from 'iconsax-react';

const ProductCard = ({ item }) => {
    const [isClicked, setIsClicked] = React.useState(false);

    const handleClick = () => {
        setIsClicked(!isClicked);
    };
    return (
        <Card >
            <div className='tw-bg-primary tw-absolute tw-text-whitee tw-px-2 tw-py-1'> {item.discountPercentage}%</div>
            <CardMedia
                component="img"
                height="140"
                image={item.imageUrl}
                alt="Product Image"
            />
            <CardContent>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                    </Typography>
                    <IconButton onClick={handleClick}>
                        <Heart style={{ fill: isClicked ? '#D23F57' : 'none', color: isClicked ? '#D23F57' : 'none' }}  />
                    </IconButton>
                </div>
                {/* <RatingStar
                    readOnly
                    value={item.rating}
                /> */}
                <div>
                    <b className='tw-text-primary tw-mr-3'>${item.discountPrice}</b>
                    <i><del>${item.price}</del></i>
                </div>
                <AbButton
                    type={"button"}
                    label={"Add to Cart"}
                    className="tw-mt-3"
                />
            </CardContent>
        </Card>
    );
}

export default ProductCard