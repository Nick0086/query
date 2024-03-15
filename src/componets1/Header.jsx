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
                <Link to="/films">
                    <p>Films</p>
                </Link>
                <Link to="/characters">
                    <p>Characters</p>
                </Link>
            </nav>
            <main >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/films" element={<Films />} />
                    <Route path="/films/:filmId" element={<Film />} />
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
