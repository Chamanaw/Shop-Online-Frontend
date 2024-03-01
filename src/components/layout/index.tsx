import {Box} from '@mui/material'
import Header from "../../container/header"
function Layout ({children}:{children:React.ReactNode}){
    return(
        <Box>
            <Box sx={{height:75}}/>
            <Header/>
            {children}
        </Box>
    )
}

export default Layout