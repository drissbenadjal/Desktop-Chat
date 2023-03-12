import CLOSE_BTN from '@/samples/node-api'
import './DragBar.scss'

import minimize from '../../assets/icons/minimize-svg.svg'
import maximize from '../../assets/icons/maximize-svg.svg'
import close from '../../assets/icons/close-svg.svg'


export const DragBar = () => {
    return (
        <nav className="top-nav">
          <ul>
            <li className="minimize-window" onClick={() => CLOSE_BTN.window.minimize()}>
              <img draggable="false" src={minimize} alt="logo" />
            </li>
            <li className="maximize-window" onClick={() => CLOSE_BTN.window.maximize()}>
              <img draggable="false" src={maximize} alt="logo" />
            </li>
            <li className="close-window" onClick={() => CLOSE_BTN.window.close()}>
              <img draggable="false" src={close} alt="logo" />
            </li>
          </ul>
        </nav>
    )
}