import {
  Stack,
  Typography,
  Box,
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
} from "@mui/material";
import { ProductType, defaultValueProduct } from "../../types";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCartContext } from "../../context/cartContext";
import { useParams } from "react-router-dom";
import axios from "../../api";
import { useEffect, useState } from "react";
import ProductList from "../../container/productList";
import { useProductContext } from "../../context/productContext/intext";
import { useNavigate } from "react-router-dom";

function ProductPage() {
  const { cartItems, setCartItems } = useCartContext();
  const { nameProduct } = useParams();
  const param = nameProduct?.replace(/\s/g, "").toLowerCase();
  const [dialog, setDialog] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<ProductType>(defaultValueProduct);
  const [productAll, setProductAll] = useState<ProductType[]>([]);
  const { products } = useProductContext();
  const navigate = useNavigate()

  const handleClose = () => setDialog(false)


  const handleAddProduct = async () => {
    const token = localStorage.getItem("accessToken")
    if(!token){
        return navigate('/login')
    }
    const resultCheck = cartItems.find((ele) => ele.product_id === currentProduct.product_id);
    if (!resultCheck) {
      const result = await axios.post("/api/addproduct", {product_id: currentProduct.product_id});
      if (result.status === 200) {
        setCartItems([...cartItems,currentProduct])
      }
    } else {
      setDialog(true);
    }
  };

  const fetchProductData = async () => 
    {
        const result = await axios.get(`/api/${param}`);
        setCurrentProduct(result.data[0]);
    };

  useEffect(() => {
    fetchProductData();
  }, [nameProduct]);

  useEffect(() => {
    const fetch_product = products.filter((e: ProductType) => e.product_id != currentProduct.product_id);
    setProductAll(fetch_product);
  }, [currentProduct]);

  return (
    <Container maxWidth="xl" className="mt-32">
      <Box component={"div"}>
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <Box
              sx={{ width: "100%" }}
              display="flex"
              component="div"
              justifyContent="center"
            >
              <Box
                component="img"
                src={`${axios.getUri() + currentProduct.image}`}
                sx={{
                  width: 500,
                  minWidth: 200,
                  objectFit: "contain",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Stack
              sx={{ width: "100%" }}
              direction="column"
              justifyContent="space-between"
              spacing={2}
              className="md:p-[30px]"
            >
              <Box component="div">
                <Typography variant="h5" className="font-semibold">
                  {currentProduct.name}
                </Typography>
                <Typography variant="body1" className="text-gray-600">
                  Brand: {currentProduct.brand}
                </Typography>
              </Box>

              <Typography variant="body1">{currentProduct.description}</Typography>
              <Box>
                <Typography variant="body1" className="font-medium">
                  Capacity
                </Typography>
                <Typography variant="subtitle1">
                  {currentProduct.memory ? currentProduct.memory : "None"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" className="font-medium">
                  color
                </Typography>
                <Box
                  component="div"
                  className="h-4 w-4 rounded-xl mt-2"
                  sx={{
                    backgroundColor: `${currentProduct.color}`,
                  }}
                />
              </Box>

              <Typography variant="h5" className="text-red-600">
                ฿ {currentProduct.price}
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="outlined"
                  sx={{ width: 200 }}
                  startIcon={<ShoppingCartIcon />}
                  onClick={handleAddProduct}
                  className="border-[#002379] text-[#002379]"
                >
                  Add to Cart
                </Button>

                <Button
                  variant="contained"
                  sx={{ width: 200 }}
                  className="bg-[#002379]"
                >
                  Buy now
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
        <Typography variant="h6" gutterBottom className="text-2xl mt-10 mb-2">
          Products
        </Typography>

        <ProductList products={productAll} />

        <Dialog
          open={dialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Item in cart"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Your item is already in the cart. You cannot add it again.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus className="text-[#002379]">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}

export default ProductPage;
