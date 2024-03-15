import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

function DogList() {

    const { data, status } = useQuery({
        queryKey: ['dogs'],
        queryFn: async () => {
            const res = await axios.get(`https://dog.ceo/api/breeds/list/all`)
            return res.data
        }
    })

    if (status === 'pending') return 'Loading...'

    if (status === 'error') return 'Error!'

    console.log(data)

    const dogs = Object.keys(data?.message)

    return (
        <div>
            {dogs.map((dog) => (
                <div>{dog}</div>
            ))}
        </div>
    )
}

export default DogList