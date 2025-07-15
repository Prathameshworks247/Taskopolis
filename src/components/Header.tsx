import 'bootstrap/dist/css/bootstrap.min.css';
import image from '../assets/icons/image.png'
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css'; // Add this import
import DarkModeToggle from './DarkModeToggle';

function Header() {
    const navigate = useNavigate()
    return(
        <div onClick={() => navigate('/')} className="header-container">
            <div className="header-icon">
                <img
                    src={image}
                    alt="Taskopolis Icon"
                    className="taskopolis-icon"
                />
            </div>
            <div className="header-title">
                <h3 className="title-text text-charcoal-900">Taskopolis</h3>
            </div>
            <div className='flex relative left-16'>
                <DarkModeToggle/>
            </div>
            
        </div>
    )
}
export default Header;