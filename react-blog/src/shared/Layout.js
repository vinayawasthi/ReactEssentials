import { Outlet, Link } from "react-router-dom";

const NavBar = () => (
    <nav>
        <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about-me">About Me</Link></li>
            <li><Link to="/articles">Articles</Link></li>
            <li><Link to="/article/india">India</Link></li>
            <li><Link to="/contact-us">Contact Us</Link></li>
        </ul>            
    </nav>
)

function Layout() {
    return (
        <>           
            <div className="header">
                <NavBar />
            </div>
            <div className="body">
                <Outlet />
            </div>
            <div className="footer">
            </div>
        </>
    )
}
export default Layout;