import React from 'react'
import SearchResults from './SearchResults'

function Search() {

    const [query, setQuery] = React.useState('')

    return (
        <div>
            <div>Search</div>

            <div>
                <input
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    placeholder="Search products"
                    className='border-2 border-gray-600'
                />
                <SearchResults query={query} />
            </div>
        </div>

    )
}

export default Search