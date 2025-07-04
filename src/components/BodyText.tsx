
import '../styles/BodyText.css'; // Add this import

type BodyTextProps = {
  handlesignup: () => void;
  handlelogin: () => void;
};

function BodyText({ handlesignup, handlelogin }: BodyTextProps) {
  return (
    <div className='bodytext-container'>
      <div className='text-content'>
        <h1 className='upper-text'>Build Your City,</h1>
        <h1 className='lower-text'>One Task at a Time!</h1>
        <p className='tagline'>Gamify your tasks and make them fun and exciting...</p>
      </div>
      <div className='button-group'>
        <button className="gamify-button" onClick={handlesignup}>
          GAMIFY MY TASK
        </button>
        <button className="account-button" onClick={handlelogin}>
          I HAVE AN ACCOUNT
        </button>
      </div>
    </div>
  );
}

export default BodyText;
