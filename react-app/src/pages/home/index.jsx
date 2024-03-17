import React from 'react'
import './index.css'
import Search_bar from '/src/components/search_bar'
function index() {
  return (
    <div className="container">
      <img src="src/assets/images/img03.avif" alt="Quran Image" />
      <Search_bar />
      <div className="verse-container">
        <div className="verse">
          <h2>Verse 1</h2>
          <p className="arabic">وَلَقَدْ خَلَقْنَا الْإِنسَانَ وَنَعْلَمُ مَا تُوَسْوِسُ بِهِ نَفْسُهُ ۖ وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ الْوَرِيدِ</p>
          <p className="translation">And We have already created man and know what his soul whispers to him, and We are closer to him than [his] jugular vein</p>
        </div>
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
      <button className="see-more" >
        See More

        <i className="down_icon fa-solid fa-arrow-down"></i>
      </button>
    </div>
  )
}

export default index
