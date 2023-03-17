import { BlobThree } from '../Blob/Blob';
import './Loader.scss';

export const Loader = () => {
    return (
        <div className="loader">
            <div className="loader__container">
                <BlobThree hoverBtn={true} />
            </div>
        </div>
    );
};