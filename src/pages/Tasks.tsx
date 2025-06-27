import React, { useState } from 'react'
import logo from '../assets/icons/image.png'
import streaking from '../assets/icons/trending-topic.png'
import cityscape from '../assets/icons/cityscape.png'
import tasksimg from '../assets/icons/add-post.png'
import rank from '../assets/icons/ranking.png'
import add from '../assets/icons/add.png'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import building1 from '../assets/buildings/b1.png';
import building2 from '../assets/buildings/b2.png';
import building3 from '../assets/buildings/b3.png';
import building4 from '../assets/buildings/b4.png';
import building5 from '../assets/buildings/b5.png';
import building6 from '../assets/buildings/b6.png';
import sign from '../assets/buildings/image.png'
import confetti from 'canvas-confetti';
import sound from '../assets/sounds/hammer-impacting-nail-metallic-fascinatedsound-1-00-02_ltBE1BSF.mp3'
import sound2 from '../assets/sounds/mixkit-falling-bricks-388_oVB7rJ5s.wav'
import { useRef } from 'react'



function Tasks() {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);
  const [indTask, setIndTask] = useState({ description: '', tag: '', checked: false, color:''}); // Ensure indTask exists
  const [tasks, setTasks] = useState<{ description: string; tag: string; checked:boolean; color: string}[]>([]);  
  const [building, setBuilding] = useState();
  
  const buildings = [
    sign,building1, building2, building3, building4, building5,building6
  ];
  const handleChange= (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIndTask({
        ...indTask,
        [name]: value,
      });
  }
  useEffect(() => {
    console.log("Updated tasks:", tasks); // Runs AFTER the state updates
  }, [tasks]);

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!indTask.description || !indTask.tag) {
      console.error("Task description or tag is missing.");
      return;
    }

    const newItem = {
      description: indTask.description, 
      tag: indTask.tag,
      checked: false,
      color: getRandomColor()
    };
    try {
      setTasks(prevTasks => [...prevTasks, newItem]);
      setPopup(false);

    } catch (e: any) {
      console.log(e.message);
    }
  };
  const handleCheckboxChange = (index: number) => {
    setTasks(prevTasks =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, checked: !task.checked } : task
      )
    );
    if (!tasks[index].checked) {
      confetti({
        particleCount: 500,
        spread: 70,
        origin: { x: 0.81, y: 0.4 },
      });
    
    }
    if (!tasks[index].checked){
      playBuild();
    }
    if (tasks[index].checked){
      playUnbuild();
    }
  };
  const buildRef = useRef<HTMLAudioElement>(null);
  const unBuildRef = useRef<HTMLAudioElement>(null);

  const playBuild = () => {
    if (buildRef.current) {
      buildRef.current.play();
    }
  };
  const playUnbuild = () => {
    if (unBuildRef.current) {
      unBuildRef.current.play();
    }
  };
  const checkCount = () => {
    const newCheckedCount = tasks.filter(task => task.checked).length;
    return newCheckedCount;
  }

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleCancelTask = (taskIndex: number) => {
    setTasks(prevTasks => prevTasks.filter((_, index) => index !== taskIndex));
};
  const buildingtext = (x:number) =>{
    if (x==0) return <p>👷 Better start building!</p>
    if (x == 1) return <p>🏗 Every great building starts with its first brick - you’ve placed yours!</p>
    if (x == 2) return <p>🏢 Your foundation is getting stronger - keep stacking those wins!</p>
    if (x == 3) return <p>🌆 Your building is taking shape! A few more and you'll have a skyline!</p>
    if (x ==4) return <p>🏙 You're on fire! Your building is expanding, and there's no stopping now!</p>
    if (x == 5) return <p>🌇 A true architect of productivity! Your building stands tall – what’s next?</p>
    if (x == 6) return <p>🌇 Crazy Shit blud!</p>

  }

  return (
    <>
    <div className={ `${popup ? "blur-background" : ""} d-flex`}>
    <div className="sidebar">
      <img onClick={()=>navigate('/')} src={logo} style={{ width: '50px', height: '50px', cursor: 'pointer' }} alt="" />
      <ul>
        <li><img src={tasksimg} style={{ width: '30px', height: '30px' }} alt="" /><div className='tabs' style={{background: '#F8D3D3'}} onClick={()=>navigate('/tasks')}>Tasks</div></li>
        <li><img src={cityscape} style={{ width: '30px', height: '30px' }} alt="" /><div className='tabs' onClick={()=>navigate('/cityscape')}> Cityscape</div></li>
        <li><img src={rank} style={{ width: '30px', height: '30px' }} alt="" /><div className='tabs' onClick={()=>navigate('/rank')}> Rank</div></li>
        <li><img src={streaking} style={{ width: '30px', height: '30px' }} alt="" /><div className='tabs' onClick={()=>navigate('/streak')}>Streak</div></li>
      </ul>
    </div>
    <div>
    <div className='d-flex align-items-center' style={{marginLeft: '400px', marginTop: '50px'}}>
      <p className='add-task-text fw-bold'>Add Tasks</p>
      <img onClick={()=>setPopup(true)} className='add-task' src={add} style={{ width: '40px', height: '40px', marginBottom:'15px' }} alt=""/>
      </div>
      <div className='d-flex'>
      <div className='task-container d-flex flex-column justify-content-start shadow align-items-center gap-2' style={{ marginTop: '40px', width: '900px', height: '900px', backgroundColor: '#ffffff', borderRadius: '10px',padding:'30px',marginRight:'30px',marginBottom:'200px'}}>
        {tasks.length == 0 ? <p className='fw-semibold d-flex align-items-center justify-content-center'>GET SOME SHIT DONE!!✅</p>: ' '}
    {tasks.map((task, index) => (
        <div key={index} className="task-task-card position-relative d-flex justify-content-between align-items-center p-3 row bg-white">
            
            {/* Task Details */}
            <div className='d-flex justify-content-center p-1 flex-column col-10'>
                <h3 className={`task-description fw-bold mb-2 ${task.checked ? 'text-decoration-line-through text-muted' : ''}`}>
                    {task.description}
                </h3>
                <span
                    className="px-3 py-1 rounded text-white font-semibold"
                    style={{ backgroundColor: task.color }}
                >
                    {task.tag}
                </span>
            </div>

            {/* Cancel Button at the Corner */}
            <button 
                className="btn btn-danger position-absolute d-flex align-items-center justify-content-center p-0"
                style={{ 
                    width: '18px', 
                    height: '18px', 
                    fontSize: '12px', 
                    lineHeight: '1', 
                    borderRadius: '50%',
                    top: '5px', 
                    right: '5px'  // Moves button to top-right corner
                }}
                onClick={() => handleCancelTask(index)}
            >
                x
            </button>

            {/* Checkbox */}
            <div className="col-2 d-flex align-items-center justify-content-center">
                <input
                    className="checks"
                    type="checkbox"
                    checked={task.checked}
                    onChange={() => handleCheckboxChange(index)}
                />
            </div>

        </div>
    ))}
    </div>

    <div>
    <div
  className="building-container d-flex justify-content-between align-items-center p-3 position-relative"
  style={{
    borderRadius: '10px',
    width: '400px',
    height: '400px',
    maxWidth: '6000px',
    marginTop: '40px',
  }}
>
  {/* Move Text to Top-Left */}
  <p 
    className="position-absolute fw-bolder"
    style={{
      top:'5px',

      lineHeight: '1',
      fontFamily:'Inter',
      fontSize:'13px',
      padding:'2px'
    }}
  >
    {buildingtext(checkCount())}
  </p>

  <div
    className="building-slot"
    style={{
      flex: 1,
      textAlign: 'center',
      padding: '10px',
    }}
  >
    <img
      src={buildings[checkCount()]}
      alt={`Building`}
      style={{
        objectFit: 'inherit',
        width: '18%',
        height: '18%',
      }}
    />
    </div>
  </div>

    </div>
    </div>


    </div>
    
    </div>
    <audio ref={buildRef}>
        <source src={sound} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <audio ref={unBuildRef}>
        <source src={sound2} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    {popup && (
        <div className="popup-window modal fade  show d-block" role="">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bolder">Create Task</h5>
                <button type="button" className="btn-close" onClick={() => setPopup(false)}></button>
              </div>
              <div className="modal-body">
              <form onSubmit={handleAdd} className=''>
            <label className='fw-semibold'>My new task...</label>
            <input style={{marginBottom: '20px'}} className="form-control" type="description" name="description" placeholder="" onChange={handleChange} required/>
            <label className='fw-semibold'>Tag</label>
            <input style={{marginBottom: '50px'}} className="form-control" type="tag" name="tag" placeholder="" onChange={handleChange} required/>
            <button type="submit" className="btn text-black fw-bold font-family-inter w-100" style={{background:'#89F336'}} >
              Add
            </button>
            </form>
            </div>

            </div>
          </div>
        </div>
      )}

      
    </>
  )
}

export default Tasks;