import { Box} from "@mui/material";
import Header from "../../container/header";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box component={"div"} className="mb-24">
      <Header />
      {children}
    </Box>
  );
}

export default Layout;
