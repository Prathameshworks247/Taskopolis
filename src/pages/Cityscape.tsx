import logo from '../assets/icons/image.png'
import streaking from '../assets/icons/trending-topic.png'
import cityscape from '../assets/icons/cityscape.png'
import tasks from '../assets/icons/add-post.png'
import rank from '../assets/icons/ranking.png'
import { useNavigate } from 'react-router-dom'
import CityGrid from '../components/CityGrid'
import { useCityData } from '../hooks/CityData'
import add from '../assets/icons/add.png'


function Cityscape() {
  const { cityData, addTask, getTodaysTasks } = useCityData();
  const todaysTasks = getTodaysTasks();
    const navigate = useNavigate();
  return (
    <>
    <div className='d-flex'>
    <div className="sidebar">
      <img onClick={()=>navigate('/')} src={logo} style={{ width: '50px', height: '50px', cursor: 'pointer' }} alt="" />
      <ul>
        <li><img src={tasks} style={{ width: '30px', height: '30px' }} alt="" /><div className='tabs' onClick={()=>navigate('/tasks')}>Tasks</div></li>
        <li><img src={cityscape} style={{ width: '30px', height: '30px' }} alt="" /><div className='tabs' style={{background: '#F8D3D3'}} onClick={()=>navigate('/cityscape')}> Cityscape</div></li>
        <li><img src={rank} style={{ width: '30px', height: '30px' }} alt="" /><div className='tabs' onClick={()=>navigate('/rank')}> Rank</div></li>
        <li><img src={streaking} style={{ width: '30px', height: '30px' }} alt="" /><div className='tabs' onClick={()=>navigate('/streak')}>Streak</div></li>
      </ul>
    </div>
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Your Productivity Cityscape
          </h2>
          <CityGrid cityData={cityData} />
        </div>
    </div>
    </>
  )
}

export default Cityscape