import React, {useState} from 'react'
import useSearch from '../hooks/useSearch'
import Stack from 'react-bootstrap/Stack'
import {AiOutlineSearch} from 'react-icons/ai'

import Button from 'react-bootstrap/Button'

const SearchBar = () =>{

    const search = useSearch();
    const [query, setQuery] = useState('')
    
    return (
            <Stack direction="horizontal" gap={2}> 
                    <label style={{color:"black"}}>
                        <AiOutlineSearch/>
                        Search products
                    </label>
                    <input 
                        className='input'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                <Button variant="light"
                        onClick = {() => search('/search', {query})}>
                        Search
                </Button>
            </Stack>
    )
}

export default SearchBar