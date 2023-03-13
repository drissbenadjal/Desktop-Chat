import './HeaderBar.scss'

import UserPlusLogo from '../../assets/icons/user-plus.svg'
import VideoLogo from '../../assets/icons/video.svg'
import UsersLogo from '../../assets/icons/user-square.svg'
import CallLogo from '../../assets/icons/call.svg'


export const HeaderBar = () => {
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
};