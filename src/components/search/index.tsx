import { InputBase, styled ,InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';


const SearchStyle = styled('div')(({ theme }) => (
    {
        padding: '3px 10px',
        borderRadius: theme.shape.borderRadius,
        maxWidth: '660px'
    }
))

interface SearchProps {
    setKeyword:any
    searchValue:string,
    handleKeyDown:any,
}

const SearchBar:React.FC<SearchProps> = ({setKeyword,searchValue,handleKeyDown}) => {
    return (
        <SearchStyle sx={{ flexGrow: 1 }} className="bg-gray-200">
            <InputBase placeholder='Search'
                endAdornment={<InputAdornment position='end'><SearchIcon /></InputAdornment>}
                fullWidth
                onInput={(e:React.ChangeEvent<HTMLInputElement>)=>setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}
                value={searchValue}
                type="search"
            />
        </SearchStyle>
    )
}

export default SearchBar