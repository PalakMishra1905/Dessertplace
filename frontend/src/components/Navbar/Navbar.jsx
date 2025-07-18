import React, { use, useContext, useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("home");

  const {getTotalCartAmount, token, setToken} = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = async()=>{
      localStorage.removeItem("token")
      setToken("")
      navigate("/")
  }

  return (
    <div className='navbar'>
       <Link to="/"><img src="Bakery_Logo.png" alt="" className='Logo'/></Link>
       <ul className="navbar-menu">
        <Link to="/" onClick={()=>setMenu("home")} className={menu === "home" ? "active":""}>home</Link>
        <a href="#explore-menu" onClick={()=>setMenu("menu")} className={menu === "menu" ? "active":""}>menu</a>
        <a href="#app-download" onClick={()=>setMenu("mobile-app")} className={menu === "mobile-app" ? "active":""}>mobile-app</a>
        <a href="#footer" onClick={()=>setMenu("contact-us")} className={menu === "contact-us" ? "active":""}>contact us</a>
       </ul>
       <div className="navbar-right">
        <img className='search-icon' src="search_icon.png"/>
        <div className="navbar-search-icon">
          <Link to="/cart"><img className='basket-icon' src="basket_icon.png" alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ?"":"dot"}></div>
        </div>
        {!token?<button onClick={()=>setShowLogin(true)}>sign in</button>:
        <div className='navbar-profile'>
          <img src="profile_icon.png" alt="" />
          <ul className="nav-profile-dropdown">
            <li onClick={()=>navigate('/myorders')}><img src="bag_icon.png" alt="" /><p>Orders</p></li>
            <hr/>
            <li onClick={logout}><img src="logout_icon.png" alt="" /><p>Logout</p></li>
          </ul>
        </div>}
       </div>
    </div>
  )
}

export default Navbar