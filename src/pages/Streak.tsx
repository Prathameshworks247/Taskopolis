import React, { useState,useMemo } from 'react'
import logo from '../assets/icons/image.png'
import streaking from '../assets/icons/trending-topic.png'
import cityscape from '../assets/icons/cityscape.png'
import tasks from '../assets/icons/add-post.png'
import rank from '../assets/icons/ranking.png'
import { useNavigate } from 'react-router-dom'
import add from '../assets/icons/add.png'
import { generateMockStreakData } from '../utils/MockData';
import StreakCalendar from '../components/StreakCalender'
function Streak() {
    const navigate = useNavigate();
    const streakData = useMemo(() => generateMockStreakData(), []);
    return (
      <>
      <div className='d-flex'>
      <div className="app-container">
  <div className="sidebar">
    <img onClick={() => navigate('/')} src={logo} style={{ width: '50px', height: '50px', cursor: 'pointer' }} alt="Logo" />
    <ul>
      <li>
        <img src={tasks} style={{ width: '30px', height: '30px' }} alt="Tasks" />
        <div className='tabs' onClick={() => navigate('/tasks')}>Tasks</div>
      </li>
      <li>
        <img src={cityscape} style={{ width: '30px', height: '30px' }} alt="Cityscape" />
        <div className='tabs' onClick={() => navigate('/cityscape')}>Cityscape</div>
      </li>
      <li>
        <img src={rank} style={{ width: '30px', height: '30px' }} alt="Rank" />
        <div className='tabs' onClick={() => navigate('/rank')}>Rank</div>
      </li>
      <li>
        <img src={streaking} style={{ width: '30px', height: '30px' }} alt="Streak" />
        <div className='tabs' style={{ background: '#F8D3D3' }} onClick={() => navigate('/streak')}>Streak</div>
      </li>
    </ul>
  </div>
  </div>
   
      </div>
      <div className="flex justify-center">
          <StreakCalendar data={streakData} />
      </div>
        
      </>
    )
}

export default Streak