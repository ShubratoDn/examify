import React, { useEffect, useRef, useState } from 'react'
import Logo from '../../../assets/img/logo.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faEnvelope, faHistory, faMagnifyingGlass, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { faCircleDot } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'

import userImage from "../../../assets/img/user.png"
import { getCurrentUserInfo } from '../../../services/auth'
import { BASE_URL } from '../../../utils/constants'

function StudentDashboard({title, children}) {

    const navTopRef = useRef(null);
    const bodyRef = useRef(null);
    const [scrolled, setScrolled] = useState(false);

    const [user, setUser] = useState(getCurrentUserInfo());


    useEffect(() => {
        const handleScroll = () => {
            if (bodyRef.current) {
                if (bodyRef.current.scrollTop > 0) {
                    setScrolled(true);
                } else {
                    setScrolled(false);
                }

                // Get the height of the .nav-top element
                const navTopHeight = navTopRef.current.offsetHeight;
                const navTopWidth = navTopRef.current.offsetWidth;

                // Set a CSS variable to store the height
                document.documentElement.style.setProperty('--nav-top-height', `${navTopHeight}px`);
                document.documentElement.style.setProperty('--nav-top-width', `${navTopWidth}px`);
            }
        };

        // Attach the scroll event listener to the #body element
        bodyRef.current.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            if (bodyRef.current) {
                bodyRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);




    return (
        <div className='d-flex'>
            {/* nav left starts */}
            <div className="nav-left">
                <div className="nav-left-user d-flex align-items-center px-3">
                    <img src={BASE_URL +"UserImages/"+user.image} alt={user.name} className='nav-left-user-image' />
                    <div className='d-flex flex-column'>
                        <span className='user-name'>{user.name} </span>
                        <span className='text-muted font-12 align-right d-block'>(Student)</span>
                        <span className='online'> <FontAwesomeIcon icon={faCircleDot} /> Online</span>
                    </div>
                </div>

                {/* <div className='switching-btn-box'>
                    <Link to={"/"} className='switching-btn'> <FontAwesomeIcon icon={faRepeat} className='nav-icon' /> Switch to Teacher</Link>
                </div> */}

                {/* nav bar Link */}
                <ul className='navbar-nav'>
                    <li className='nav-item'><Link to={"/"} className='nav-link'><FontAwesomeIcon icon={faHome} className='nav-icon' /> <span>Home</span></Link></li>
                    <li className='nav-item'><Link to={"/"} className='nav-link'><FontAwesomeIcon icon={faNewspaper} className='nav-icon' /> <span>My Exams</span></Link></li>
                    <li className='nav-item'><Link to={"/"} className='nav-link'><FontAwesomeIcon icon={faMagnifyingGlass} className='nav-icon' /> <span>Search Exam</span></Link></li>
                    <li className='nav-item'><Link to={"/"} className='nav-link'><FontAwesomeIcon icon={faHistory} className='nav-icon' /> <span>Exam history</span></Link></li>
                    <li className='nav-item'><Link to={"/"} className='nav-link'><FontAwesomeIcon icon={faBolt} className='nav-icon' /> <span>Settings</span></Link></li>
                    <li className='nav-item'><Link to={"/logout"} className='nav-link'><FontAwesomeIcon icon={faRightFromBracket} className='nav-icon' /><span>Logout</span></Link></li>
                </ul>

            </div>
            {/* nav left ends */}
            <div className="body" id='body' ref={bodyRef}>
                <div
                    id='nav-top'
                    ref={navTopRef}
                    className={`nav-top d-flex justify-content-between align-items-center ${scrolled ? 'scrolled' : ''}`}
                >
                    <div className='nav-top-left'>
                        <button className="collapse-btn"><FontAwesomeIcon icon={faBarsStaggered} /></button>
                        {/* logo */}
                        <div className='d-flex align-items-center ms-3'>
                            <img src={Logo} alt="Logo" className='nav-top-logo me-3' />
                            <span className='font-28'>Examify</span>
                        </div>
                    </div>

                    <div className='nav-top-right'>
                        {/* interaction */}
                        <div className='d-flex mx-4'>
                            <div className="icon"> <FontAwesomeIcon icon={faBell} /><span id="notification-btn" className='notification-count'>2</span></div>
                            <div className="icon"><FontAwesomeIcon icon={faQuestion} /></div>
                            <div className="icon"><FontAwesomeIcon icon={faEnvelope} /> <span id="message-btn" className='notification-count active'>1</span></div>
                        </div>

                        <div className='nav-top-user-info'>
                            <img src={BASE_URL + "UserImages/" + user.image} alt="User image" />
                            {user.name}
                        </div>
                    </div>
                </div>

                {/* content */}
                <div className="body-content">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default StudentDashboard