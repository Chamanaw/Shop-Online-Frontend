import {
  Box,
  Button,
  Stack,
  Typography,
  IconButton,
  Container,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useCartContext } from "../../context/cartContext";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const { cartItems, setCartItems } = useCartContext();
  const navigate = useNavigate();

  const calculate = () => {
    let sum: number = 0;
    cartItems.forEach((ele) => {
      sum += ele.price;
    });
    setTotalPrice(sum);
  };

  const handleClickDelete = async (product_id: number) => {
    const result = await axios.delete("/api/deleteitem", {
      data: { product_id: product_id },
    });
    if (result.status === 200) {
      const newUpdate = cartItems.filter((e) => e.product_id != product_id);
      setCartItems(newUpdate);
    }
  };

  useEffect(calculate, [cartItems]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <Container maxWidth="xl" className="mt-24">
      <Box component="div" className="mt-5">
        <Typography variant="h5" className="font-bold" gutterBottom>
          Cart ({cartItems.length})
        </Typography>
        <Stack spacing={3} className="flex flex-col w-full md:flex-row md:justify-between md:gap-x-4">
          <Box component="div" className="w-full" >
            {cartItems.map((element, index) => (
              <Stack
                direction="row"
                key={uuidv4()}
                alignItems="center"
                className={ index % 2 === 0 ? "bg-gray-100 rounded" : "bg-white" }
              >
                <Box
                  component="img"
                  src={`${axios.getUri() + element.image}`}
                  sx={{
                    width: 100,
                    objectFit: "cover",
                    padding: "8px",
                  }}
                />
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  className="w-full"
                  alignItems="center"
                >
                  <Box>
                    <Typography className="font-medium">
                      {element.name}
                    </Typography>
                    <Typography className="text-sm">
                      Brand: {element.brand}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body1"
                    className="text-red-500 font-bold"
                  >
                    ฿{element.price}
                  </Typography>
                  <IconButton
                    className="mr-2 hover:text-red-800"
                    onClick={() => handleClickDelete(element.product_id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Stack>
            ))}
          </Box>
          <Stack
            className="w-full md:w-[750px] md:mt-0 p-6 bg-zinc-100 rounded h-52"
            direction="column"
            spacing={1}
          >
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body1">Subtotal</Typography>
              <Typography>฿{totalPrice}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography>Discount</Typography>
              <Typography>-฿0</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography className="font-semibold">Total</Typography>
              <Typography className="mb-6 font-semibold" gutterBottom>
                ฿{totalPrice}
              </Typography>
            </Stack>
            <Button variant="contained" fullWidth className="bg-[#002379]">
              Proceed to checkout
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}

export default CartPage;
