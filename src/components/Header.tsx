import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/icons/logo.png'
import { useNavigate } from 'react-router-dom';
import '../styles/Header.css'; // Add this import
import DarkModeToggle from './DarkModeToggle';

function Header() {
    const navigate = useNavigate()
    return(
        <div onClick={() => navigate('/')} className="header-container">
            <div className="header-icon w-20">
                <img
                    src={logo}
                    alt="Taskopolis Icon"
                    className="taskopolis-icon"
                />
            </div>
            <div className="header-title">
                <h3 className="title-text text-charcoal-900">Taskopolis</h3>
            </div>
            <div className='flex z-10 relative left-16'>
                <DarkModeToggle/>
            </div>
            
        </div>
    )
}
export default Header;