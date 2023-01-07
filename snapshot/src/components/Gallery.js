import { Route,Routes,Link } from 'react-router-dom';
import {useState, useEffect} from 'react'
import React from 'react'

const Gallery = (props) => {


    const [query, setQuery] = useState('flowers')
    const [photos, setPhotos] = useState([])    
    const [header, setHeader] = useState('')

    const handleClick = (e) => {
        console.log(query);
        setQuery(e.target.text)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setQuery(e.target[0].value)
    }
    
    useEffect(() => {
        const getPhotos = async() => {
            const call = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=30`,{
                headers: {
                    Authorization: '563492ad6f91700001000001ac6332983b544e46924272837db2c879'
                }
            })
            const res = await call.json()
            setPhotos(res.photos);
            setHeader(query)
        }
        getPhotos()
    },[query])
    
        return (
        <>
            <div>
                <h1>snapshot</h1>
                <form className='form' onSubmit={handleSubmit}>
                    <input type='text' required/>
                    <button type='submit'>🔍search</button>
                </form>
                <div className='linkContainer'>
                    <div><Link className='link' onClick={handleClick} to='/lizards'>Lizards</Link></div>
                    <div><Link className='link' onClick={handleClick} to='/plants'>Plants</Link></div>
                    <div><Link className='link' onClick={handleClick} to='/hamburgers'>Hamburgers</Link></div>
                    <div><Link className='link' onClick={handleClick} to='/towers'>Towers</Link></div>
                </div>
                <h2>{header}</h2>
                <div className='imgContainer'>
                {
                    photos.map(item => {
                        return (
                                <div className='imgDiv' key={item.id}>
                                    <img alt='img' src={item.src.original}/>
                                </div>
                        )
                    })
                }
                </div>
            <Routes>
                <Route exact path='/'/>
                <Route path='/lizards'/>
                <Route path='/plants'/>
                <Route path='/hamburgers'/>
                <Route path='/towers'/>
            </Routes>
            </div>
        </>
        );

    }

export default Gallery;