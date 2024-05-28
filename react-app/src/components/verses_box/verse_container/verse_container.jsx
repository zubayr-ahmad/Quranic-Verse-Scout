import React from 'react'
import './verse_container.css'
import { useNavigate } from 'react-router-dom'
function verse_container(props) {
    const navigate = useNavigate()
    const { ayah, id } = props
    console.log(props)
    const seeTafseer = (id) => {
        navigate(`/tafseer/${id}`)
    }
    return (
        <div className="verse">
            <button class="btn-tafseer" title='Tafseer' onClick={() => seeTafseer(id)}>
                <i class="fa-solid fa-book-open"></i>
            </button>
            <div className='verse-content'>
                <p className="arabic">{ayah.text}  <i>[{ayah.ayat_number}]</i></p>
                <p className="translation">{ayah.english}</p>
            </div>
        </div>
    )
}

export default verse_container
