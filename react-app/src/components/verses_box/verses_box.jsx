import React from 'react'
import './verses_box.css'
import Verse_container from './verse_container/verse_container'
function Verses_box() {
  return (
    <>
    <div className="verse-container">
        <Verse_container />
        <div className="verse">
          <h2>Verse 2</h2>
          <p className="arabic">إِذَا مَسَّهُ الشَّرُّ جَزُوعًا دُعَاءًا وَإِذَا خَيْرٌ مَنُوعًا كَانَ عَنُوٓا۟</p>
          <p className="translation">When adversity touches him, he begins to cry out for help. But when We bestow a favor upon him from Us, he says, "I have [certainly] been given [this] because of [my] knowledge."</p>
        </div>
        <div className="verse">
          <h2>Verse 3</h2>
          <p className="arabic">قُلْ هُوَ الرَّحْمَـٰنُ آمَنَّا بِهِ وَعَلَيْهِ تَوَكَّلْنَا ۖ فَسَتَعْلَمُونَ مَنْ هُوَ فِي ضَلَالٍ مُّبِينٍ</p>
          <p className="translation">Say, "He is the Most Merciful; we have believed in Him, and upon Him we have relied. And you will [come to] know who it is that is in clear error."</p>
        </div>
      </div>
      <button className="see-more" >See More<i className="down_icon fa-solid fa-arrow-down"></i></button>
    </>
  )
}

export default Verses_box
