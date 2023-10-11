import { useQuery } from "@tanstack/react-query";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import "/GasSection.css"
import "./GasSection.css"

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
        <div className="pt-4 px-2">
            <h1 className="text-gray-400 font-roboto text-lg   pb-4">Cylinder Service </h1>
            <div className=" grid grid-cols-2">
                {
                    data?.map((item) => <div

                        key={item._id}
                    >
                        <Card sx={{ maxWidth: 345 , }}  className="cardShadow ">
                            <CardMedia
                                
                                component="img"
                                alt="gas cylinder"
                                height="140"
                                image={item.img}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="p" color="text.secondary" component="div" className="text-[11px] font-poppins ">
                                    {item.name} - {item.weight}
                                </Typography>
                                {/* <Typography variant="body2" color="text.secondary">
                                    {item.desc}
                                </Typography> */}
                                <Typography variant="p" color="text.secondary" className="text-[11px] font-poppins">
                                    Devlivery : {item.delivery}
                                </Typography>
                                <Typography variant="p" color="text.secondary" className="text-[11px] font-poppins">
                                   <br /> Price : <span className="text-[#1976D2]">{item.price}</span> Taka
                                </Typography>
                            </CardContent>
                            <CardActions className="flex justify-end mr-4 mb-2">
                                <Button variant="outlined" size="small" startIcon={<AddShoppingCartIcon />}>
                                    Buy Now
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