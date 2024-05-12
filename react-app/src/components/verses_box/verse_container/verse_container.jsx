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
            {/* <h2>Verse 1</h2> */}
            <p className="arabic">{ayah.arabic}  <i>[{ayah.number}]</i></p>

            <p className="translation">{ayah.translation}</p>
        </div>
    )
}

export default verse_container
