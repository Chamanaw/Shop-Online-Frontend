import SearchBar from "../../components/search";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {

    const [keyword, setKeyword] = useState<string>('')
   
    const navigate = useNavigate()

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            setKeyword('')
            navigate(`/search?keyword=${keyword}`)
        }
    }



    return (
        <SearchBar
            setKeyword={setKeyword}
            handleKeyDown={handleKeyDown}
            searchValue={keyword}
        />
    )
}

export default Search