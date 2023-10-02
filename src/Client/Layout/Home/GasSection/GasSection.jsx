import { useQuery } from "@tanstack/react-query";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const GasSection = () => {
    const { data } = useQuery({
        queryKey: ['cylinders'],
        queryFn: async () => {
            const response = await fetch('http://localhost:5000/cylinders')
            return response.json()
        },
    })
    console.log(data)
    return (
        <div className="py-6 px-2">
            <h1 className="text-[#5a6177] font-poppins text-lg font-bold text-center">Our Services </h1>
            <div className="pb-20">
                {
                    data?.map((item) => <div className="grid pt-5"

                        key={item._id}
                    >
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                alt="green iguana"
                                height="140"
                                image={item.img}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {item.name} - {item.weight}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.desc}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Price : {item.price} Taka
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Devlivery : {item.delivery}
                                </Typography>
                            </CardContent>
                            <CardActions className="flex justify-end mr-4 mb-2">
                                <Button variant="outlined" startIcon={<AddShoppingCartIcon />}>
                                    Buy
                                </Button>

                            </CardActions>
                        </Card>
                    </div>)
                }
            </div>
        </div>
    );
};

export default GasSection;