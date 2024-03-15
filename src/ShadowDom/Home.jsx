import React from 'react'
import DogList from './DogList'

function Home() {
    return (
        <div>
            <div className='w-full p-9'>
                <h2>Dog Breeds</h2>
                <DogList />
            </div>
        </div>
    )
}

export default Home