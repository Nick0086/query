import React from 'react'
import Films from './Films'
import Film from './Film'
import Characters from './Characters'
import Character from './Character'
import Home from './Home'
import { Routes, Route, Link } from 'react-router-dom'

export default function Header(props) {

    return (
        <div className="App">
            <nav >
                <Link to="/">
                    <p>Home</p>
                </Link>
                <Link to="/Episodes">
                    <p>Episodes</p>
                </Link>
                <Link to="/Characters">
                    <p>Characters</p>
                </Link>
            </nav>
            <main >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/episodes" element={<Films />} />
                    <Route path="/episodes/:episodeId" element={<Film />} />
                    <Route path="/characters" element={<Characters />} />
                    <Route
                        path="/characters/:characterId"
                        element={<Character />}
                    />

                </Routes>
            </main>
        </div>
    )
}
