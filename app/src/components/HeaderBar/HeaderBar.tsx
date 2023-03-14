import './HeaderBar.scss'

import UserPlusLogo from '../../assets/icons/user-plus.svg'
import VideoLogo from '../../assets/icons/video.svg'
import UsersLogo from '../../assets/icons/user-square.svg'
import CallLogo from '../../assets/icons/call.svg'
import { Link } from 'react-router-dom'


export const HeaderBar = ({ type, onClick, LinkPage }: { type: string, onClick?: any, LinkPage: string }) => {
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
                            <button onClick={() => onClick("online")} className={LinkPage == "online" ? "active" : ""}>
                                Online
                            </button>
                        </li>
                        <li>
                            <button onClick={() => onClick("all")} className={LinkPage == "all" ? "active" : ""}>
                                All
                            </button>
                        </li>
                        <li>
                            <button onClick={() => onClick("waiting")} className={LinkPage == "waiting" ? "active" : ""}>
                                Waiting
                            </button>
                        </li>
                        <li>
                            <button onClick={() => onClick("blocked")} className={LinkPage == "blocked" ? "active" : ""}>
                                Blocked
                            </button>
                        </li>
                        <li>
                            <button onClick={() => onClick("requests")} className={LinkPage == "requests" ? "add-link active" : "add-link"}>
                                Add Friend
                            </button>
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