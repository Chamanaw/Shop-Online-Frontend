import { Box} from "@mui/material";
import Header from "../../container/header";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box component={"div"} >
      <Header />
      {children}
    </Box>
  );
}

export default Layout;
