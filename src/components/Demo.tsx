import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import building1 from '../assets/buildings/b1.png';
import building2 from '../assets/buildings/b2.png';
import building3 from '../assets/buildings/b3.png';
import building4 from '../assets/buildings/b4.png';
import building5 from '../assets/buildings/b5.png';
import sound from '../assets/sounds/hammer-impacting-nail-metallic-fascinatedsound-1-00-02_ltBE1BSF.mp3'
import sound2 from '../assets/sounds/mixkit-falling-bricks-388_oVB7rJ5s.wav'
import arrow from '../assets/patterns/arrow.png'

function Demo() {
  interface CheckedItems {
    [key: string]: boolean;
  }

  const [checkedTasks, setCheckedTasks] = useState<CheckedItems>({
    'item1': false,
    'item2': false,
    'item3': false
  });

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

  const [count, setCount] = useState(0);

  const buildings = [
    building1, building2, building3, building4, building5
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckedTasks((prevState) => ({
      ...prevState,
      [name]: checked,
    }));

    setCount((prevCount) => (checked ? prevCount + 1 : prevCount - 1));

    if (checked) {
      switch (name) {
        case "item1":
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { x: 0.78, y: 0.36 },
          });
          break;
        case "item2":
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { x: 0.78, y: 0.46 },
          });
          break;
        case "item3":
          confetti({
            particleCount: 200,
            spread: 70,
            origin: { x: 0.78, y: 0.56},
          });
          break;
        default:
          break;
      }
    }
    if (checked){
      playBuild();
    }
    if (!checked){
      playUnbuild();
    }
    
  };

function getMessage(count: number) {
  if (count <= 1) {
    return <p className='wiggle fw-bold'>Complete your tasks!!</p>;
  } else if (count === 2) {
    return <p className='wiggle fw-bold ml-5'>Almost there!!</p>;
  } else if (count === 3) {
    return <p className='wiggle fw-bold ml-5'>Way to go!!</p>;
  } else {
    return null;
  }
}
  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{marginTop: '50px'}}>
      <div className="d-flex flex-row justify-content-center align-items-center">
      <div>
        
      {getMessage(count)}
          <img  className= 'arrowimg' src={arrow} style={{
                  width: '80px',
                  height:'80px'
                }}/>
      </div>
      <div className="demo-task-cards d-flex flex-column" style={{marginLeft: '30px', marginTop:'90px'}}>
      <div className="demo-task-card d-flex justify-content-center align-items-center p-3 row">
        <h3 className="title mb-0 col-10">Complete Homework 📚</h3>
        <div className="col-2">
          <input
            className="checks"
            type="checkbox"
            name="item1"
            checked={checkedTasks.item1}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="demo-task-card d-flex justify-content-center flex-row align-items-center p-3 row">
        <h3 className="title mb-0 col-10">Hit the gym 💪</h3>
        <div className="col-2">
          <input
            className="checks"
            type="checkbox"
            name="item2"
            checked={checkedTasks.item2}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="demo-task-card d-flex justify-content-center align-items-center p-3 row">
        <h3 className="title mb-0 col-10">Water the plants 🌸</h3>
        <div className="col-2">
          <input
            className="checks"
            type="checkbox"
            name="item3"
            checked={checkedTasks.item3}
            onChange={handleChange}
          />
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

      <div
        className="building-container d-flex justify-content-between align-items-center p-3"
        style={{
          borderRadius: '10px',
          width: '100%',
          maxWidth: '600px',
          marginTop: '40px',
        }}
      >
        {Object.keys(checkedTasks).map((task, index) => (
          <div
            key={index}
            className="building-slot"
            style={{
              flex:1,
              textAlign: 'center',
              padding: '10px',
            }}
          >
            {checkedTasks[task] && (
              <div style={{
                flex:1,
                textAlign: 'center',
                borderRight: '2px solid grey',
                width: '100%',
                height: '100%',

              }}>
                <img
                src={buildings[index]}
                alt={`Building for ${task}`}
                style={{
                  objectFit: 'inherit',
                  width: '18%',
                  height: '18%',
                }}
              />
              </div>
              
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Demo;
