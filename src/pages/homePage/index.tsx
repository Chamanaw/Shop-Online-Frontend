import { Typography, Box, Container, Stack } from "@mui/material";
import ProductList from "../../container/productList";
import { useProductContext } from "../../context/productContext/intext";
import bgOffer from "../../assets/images/home/bg-offer.jpg";
import Grid from "@mui/material/Unstable_Grid2";
function HomePage() {
  const { products } = useProductContext();
  return (
    <Container maxWidth="xl">
      <Grid className="mt-24" container>
        <Grid
          sm={12}
          md={6}
          xl={6}
          className="max-md:h-[40vh] max-md:text-center"
        >
          <Stack
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            className="w-full h-full "
          >
            <Typography
              variant="h6"
              className="text-4xl font-bold font-color lg:text-6xl"
            >
              Find all kinds of products here{" "}
              <span className="text-[#ff4c3b]">Click Me.</span>
            </Typography>
          </Stack>
        </Grid>

        <Grid
          sm={1}
          md={6}
          xl={6}
          sx={{ display: { xs: "none", md: "block" } }}
        >
          <Box component={"div"} className="w-full">
            <Box
              component={"img"}
              src={bgOffer}
              className="rounded-xl w-full h-[200] "
            />
          </Box>
        </Grid>
      </Grid>

      <Grid container className="mt-10 md:justify-center" spacing={1} >
        <Grid xs={12} sm={6} lg={3}>
          <Stack
            direction={"row"}
            className="border-solid border-2 border-gray-300 rounded-lg w-full gap-2"
          >
            <Box
              component="img"
              src="https://kit8.net/wp-content/uploads/edd/2022/08/Delivery_truck_preview.jpg"
              className="w-32 rounded-r-lg rounded-s-md lg:w-36"
            />
            <Stack
              direction={"column"}
              justifyContent={"center"}
              className="p-2"
            >
              <Typography variant="h6" className="font-bold text-lg lg:text-xl">
                Delivery Free
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                Spend 3,000 baht or more
              </Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid xs={12} sm={6} lg={3}>
          <Stack
            direction={"row"}
            className="border-solid border-2 border-gray-300 rounded-lg w-full gap-2"
          >
            <Box
              component="img"
              src="https://kit8.net/wp-content/uploads/edd/2022/08/Discount_preview.jpg"
              className="w-32 rounded-r-lg rounded-s-md lg:w-36"
            />
            <Stack
              direction={"column"}
              justifyContent={"center"}
              className="p-2"
            >
              <Typography variant="h6" className="font-bold text-lg lg:text-xl">
                Discount
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                Get discounts every day
              </Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid xs={12} sm={6} lg={3}>
          <Stack
            direction={"row"}
            className="border-solid border-2 border-gray-300 rounded-lg w-full"
          >
            <Box
              component="img"
              src="https://kit8.net/wp-content/uploads/edd/2022/08/24hours_preview.jpg"
              className="w-32 rounded-r-lg rounded-s-md lg:w-36"
            />
            <Stack
              direction={"column"}
              justifyContent={"center"}
              className="p-4"
            >
              <Typography variant="h6" className="font-bold text-lg lg:text-xl">
                24/7
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                online supports
              </Typography>
            </Stack>
          </Stack>
        </Grid>

        <Grid xs={12} sm={6} lg={3}>
          <Stack
            direction={"row"}
            className="border-solid border-2 border-gray-300 rounded-lg w-full"
          >
            <Box
              component="img"
              src="https://kit8.net/wp-content/uploads/edd/2022/08/Terminal_preview.jpg"
              className="w-32 rounded-r-lg rounded-s-md lg:w-36"
            />
            <Stack
              direction={"column"}
              justifyContent={"center"}
              className="p-4"
            >
              <Typography variant="h6" className="font-bold text-lg lg:text-xl">
                Payment
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                secure system
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <Typography variant="h6" gutterBottom className="text-xl mt-7 md:mt-10 sm:text-2xl">
        Products
      </Typography>
      <ProductList products={products} />
    </Container>
  );
}

export default HomePage;
