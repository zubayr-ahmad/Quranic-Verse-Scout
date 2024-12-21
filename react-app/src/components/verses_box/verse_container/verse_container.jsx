import React from "react";
import "./verse_container.css";
import { useNavigate } from "react-router-dom";
function verse_container(props) {
  const navigate = useNavigate();
  const { ayah, id } = props;
  console.log(props);
  const seeTafseer = (ayat) => {
    const surah_id = ayat.surah_id;
    const verse_id = ayat.number_in_surah;
    localStorage.setItem("ayat", JSON.stringify(ayat));
    navigate(`/tafseer/${surah_id}/${verse_id}`);
  };
  return (
    <div className="verse">
      <button
        class="btn-tafseer"
        title="Tafseer"
        onClick={() => seeTafseer(ayah)}
      >
        <i class="fa-solid fa-book-open"></i>
      </button>
      <div className="verse-content">
        <p className="arabic">
          {ayah.text}
          <i>[{ayah.ayat_number}]</i>
        </p>
        <p className="translation">{ayah.english}</p>
      </div>
    </div>
  );
}

export default verse_container;
