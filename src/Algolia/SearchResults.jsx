import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

function SearchResults({ query }) {

    console.log(query)

    const { data, isPending, isError, error, isLoading, status, isFetching } = useQuery({
        queryKey: ['serch', query],
        queryFn: async () => {
            const res = await axios.get(`https://dummyjson.com/products/search?q=${query}`)
            return res.data
        }
    })

    if (!query) return null

    if (isLoading) return <div className="loading">Loading...</div>

    if (isError) return <h1>Something went wrong! : {error.message} </h1>

    return (
        <div>
            {
                console.log(data)
            }
            <div className="">
                Satus: {status} {isFetching && <span>fetching...</span>}
            </div>
            <div>
                {
                    data && data.products.map((item) => (
                        <li key={item.id} className="my-2 list-none  ">
                            <div className='w-1/2 border-2 mx-auto' >
                            <span className="product-name">{item.brand}</span>
                            {item.title && (
                                <>
                                    <br />
                                    <span className="product-description">
                                        {item.title}
                                    </span>
                                </>
                            )}
                            <br />
                            <span className="product-price">${item.description}</span>
                            </div>
                            
                        </li>
                    ))
                }
            </div>
        </div>
    )
}

export default SearchResults