import './HeaderBar.scss'

import UserPlusLogo from '../../assets/icons/user-plus.svg'
import VideoLogo from '../../assets/icons/video.svg'
import UsersLogo from '../../assets/icons/user-square.svg'
import CallLogo from '../../assets/icons/call.svg'
import { Link } from 'react-router-dom'


export const HeaderBar = ({ type }: { type: string }) => {
    if(type == "private") {
        return (
            <div className="headerbar">
                <div className="headerbar__left">
                    <button>
                        Username
                    </button>
                    <div className="status online"></div>
                </div>
                <div className="headerbar__right">
                    <ul>
                        <li>
                            <button>
                                <img className='call-logo' src={CallLogo} alt="" />
                            </button>
                        </li>
                        <li>
                            <button>
                                <img className='video-logo' src={VideoLogo} alt="" />
                            </button>
                        </li>
                        <li>
                            <button>
                                <img className='user-plus-logo' src={UserPlusLogo} alt="" />
                            </button>
                        </li>
                        <li>
                            <button>
                                <img className='users-logo' src={UsersLogo} alt="" />
                            </button>
                        </li>
                        <li>
                            <form action="">
                                <input type="text" placeholder="Search" />
                            </form>
                        </li>
                    </ul>
                </div>
            </div>
        );
    } else if (type == "home") {
        return (
            <div className="headerbar">
                <div className="headerbar__left">
                    <h4>Friends</h4>
                    <ul className='headerbar__left__list'>
                        <li>
                            <Link to="/">
                                Online
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                All
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                Waiting
                            </Link>
                        </li>
                        <li>
                            <Link to="/">
                                Blocked
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className='add-link'>
                                Add Friend
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="headerbar__right">
                    <ul>
                    </ul>
                </div>
            </div>
        );
    }
};