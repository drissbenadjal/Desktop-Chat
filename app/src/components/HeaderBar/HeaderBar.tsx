import './HeaderBar.scss'

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
                            call
                        </button>
                    </li>
                    <li>
                        <button>
                            video
                        </button>
                    </li>
                    <li>
                        <button>
                            group
                        </button>
                    </li>
                    <li>
                        <button>
                            all
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