import React from 'react'
import './verse_container.css'
function verse_container(props) {
    const { ayah } = props
    console.log("Ayah",ayah);
    return (
        <div className="verse">
            <button class="cta btn-tafseer">
                <span>Tafseer</span>
                {/* <svg width="15px" height="10px" viewBox="0 0 13 10">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                </svg> */}
            </button>
            {/* <h2>Verse 1</h2> */}
            <p className="arabic">{ayah.arabic}</p>

            <p className="translation">{ayah.translation}</p>
        </div>
    )
}

export default verse_container
