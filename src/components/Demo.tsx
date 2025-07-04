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
import '../styles/Demo.css'; // Add this import

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
      return <p className='wiggle fw-bold message-text'>Complete your tasks!!</p>;
    } else if (count === 2) {
      return <p className='wiggle fw-bold message-text'>Almost there!!</p>;
    } else if (count === 3) {
      return <p className='wiggle fw-bold message-text'>Way to go!!</p>;
    } else {
      return null;
    }
  }

  return (
    <div className="demo-container">
      <div className="demo-content flex-1 flex-row">
        {/* Message and Arrow Section */}
        {/* <div className="demo-task"> */}
        <div className="message-section">
          {getMessage(count)}
          <img className='arrow-img' src={arrow} alt="Arrow" />
        </div>

        {/* Task Cards Section */}
        <div className="demo-task-cards">
          <div className="demo-task-card">
            <h3 className="task-title">Complete Homework 📚</h3>
            <div className="checkbox-wrapper">
              <input
                className="task-checkbox"
                type="checkbox"
                name="item1"
                checked={checkedTasks.item1}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="demo-task-card">
            <h3 className="task-title">Hit the gym 💪</h3>
            <div className="checkbox-wrapper">
              <input
                className="task-checkbox"
                type="checkbox"
                name="item2"
                checked={checkedTasks.item2}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="demo-task-card">
            <h3 className="task-title">Water the plants 🌸</h3>
            <div className="checkbox-wrapper">
              <input
                className="task-checkbox"
                type="checkbox"
                name="item3"
                checked={checkedTasks.item3}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Audio Elements */}
      <audio ref={buildRef}>
        <source src={sound} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
      <audio ref={unBuildRef}>
        <source src={sound2} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* Buildings Section */}
      <div className="building-container">
        <div className="building-slot">
          {count >= 1 && (
            <img
              className='building-image-1'
              src={buildings[0]}
              alt="Building 1"
            />
          )}
        </div>
        
        <div className="building-slot">
          {count >= 2 && (
            <img
              className='building-image-2'
              src={buildings[1]}
              alt="Building 2"
            />
          )}
        </div>
        
        <div className="building-slot">
          {count >= 3 && (
            <img
              className='building-image-3'
              src={buildings[2]}
              alt="Building 3"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Demo;