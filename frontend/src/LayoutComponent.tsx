import {Outlet, Link, useLocation} from 'react-router-dom';
import './LayoutComponent.css';


export default function LayoutComponent() {
    const location = useLocation();

    return (
        <div>
            <header className="navbar">
                <Link to="/" className={`nav-link ${location.pathname === '/' && 'active'}`}>Home</Link>
                <span className="vertical-bar">|</span>
                <Link to="/save" className={`nav-link ${location.pathname === '/save' && 'active'}`}>Save</Link>
                <span className="vertical-bar">|</span>
                <Link to="/fetch" className={`nav-link ${location.pathname === '/fetch' && 'active'}`}>Fetch</Link>
            </header>
            <Outlet />
        </div>
    )
}
