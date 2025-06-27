
type BodyTextProps = {
  handlesignup: () => void;
  handlelogin: () => void;
};

function BodyText({ handlesignup, handlelogin }: BodyTextProps) {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <div className='' style={{marginBottom : "40px"}}>
        <h1 className='uppertext '>Build Your City,</h1>
        <h1 className='lowertext mb-3'>One Task at a Time!</h1>
        <p className='tagline mb-4'>Gamify your tasks and make them fun and exciting...</p>
      </div>
      <div className='buttons d-flex justify-content-center flex-column align-item-center gap-2'>
        <button className="gamify-button p-3" onClick={handlesignup}>
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
