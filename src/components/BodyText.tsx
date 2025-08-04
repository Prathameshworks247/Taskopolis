
import '../styles/BodyText.css'; // Add this import

type BodyTextProps = {
  handlesignup: () => void;
  handlelogin: () => void;
};
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function BodyText({ handlesignup, handlelogin }: BodyTextProps) {
  return (
    <div className='bodytext-container '>
      {/* <video 
    autoPlay 
    muted 
    loop 
    className="absolute inset-0 w-full h-full object-fit "
  >
    <source src="src/assets/demovids/Buildings.webm" type="video/webm" />
  </video> */}
  {/* Lottie iframe background */}
      <div className='text-content  w-full -mb-[300px] sm:-mb-[300px] md:-mb-[300px] lg:-mb-[250px]'>
        <p className='upper-text '>Build Your City</p>
        <p className='lower-text '>One Task at a Time!</p>
        <p className='tagline text-saffron-400 font-bold'>Gamify your tasks and make them fun and exciting...</p>
      </div>
      <iframe 
    src="https://lottie.host/embed/5ffded5f-e5df-4b95-bf87-9c07d69546be/HbDnqa5xej.lottie"
    className=" left-6 dark:invert -z-10 inset-0 w-full border-none pointer-events-none -mb-[200px] sm:mb-4"
    style={{ width: '100vw', height: '80vh' }}
    title="Background Animation"
  />
      <div className='button-group'>
        <button className="gamify-button bg-persian_green-500 hover:bg-persian_green-600 text-white" onClick={handlesignup}>
          GAMIFY MY TASK
        </button>
      </div>
    </div>
  );
}

export default BodyText;
