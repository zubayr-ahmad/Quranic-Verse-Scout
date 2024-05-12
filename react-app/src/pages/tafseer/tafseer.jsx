import { useParams } from 'react-router-dom';
import { ayahs } from '../../utils/sample_data/ayahs';

function tafseer() {
    const { verse_id } = useParams();
    const ayah = ayahs[verse_id]
  return (
    <div>
        <p className='arabic'>{ayah.arabic}</p>
        <p className='translation'>{ayah.translation}</p>
        <h3>Tafseer</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, dignissimos voluptatem inventore ipsum rem est officia temporibus ex commodi, veritatis accusamus! Explicabo rem quidem eum cum ex, tempore maxime labore perferendis. Provident, harum distinctio.</p>

    </div>
  )
}

export default tafseer
