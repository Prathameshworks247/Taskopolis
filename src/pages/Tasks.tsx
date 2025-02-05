import React, { useState } from 'react'
import logo from '../assets/icons/image.png'
import streaking from '../assets/icons/trending-topic.png'
import cityscape from '../assets/icons/cityscape.png'
import tasksimg from '../assets/icons/add-post.png'
import rank from '../assets/icons/ranking.png'
import add from '../assets/icons/add.png'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'


function Tasks() {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(false);
  const [indTask, setIndTask] = useState({ description: '', tag: '', checked: false }); // Ensure indTask exists
  const [tasks, setTasks] = useState<{ description: string; tag: string; checked:boolean}[]>([]);
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
      checked: false
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
  };


  
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
    <div className='task-container  d-flex flex-column justify-content-start align-items-center gap-2 ' style={{marginTop: '40px'}}>
      <div className='d-flex align-items-center'>
      <p className='add-task-text '>Add Tasks</p>
      <img onClick={()=>setPopup(true)} className='add-task' src={add} style={{ width: '40px', height: '40px', marginBottom:'15px' }} alt=""/>
      </div>
      <div className="tasks-div  justify-content-center flex-row">
        {tasks.map((task, index) => (
          <div className="demo-task-card d-flex justify-content-center align-items-center p-3 row bg-white">
          <h3 className="title mb-0 col-10">{task.description}</h3>
          <div className="col-2">
            <input
              className="checks"
              type="checkbox"
              name={`item${index}`}
              checked={task.checked}
              onChange={() => {handleCheckboxChange(index)}}
            />
          </div>
          </div>
        ))}
      </div>
    </div>
    </div>

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
            <button type="submit" className="btn bg-black text-white font-family-inter w-100" >
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