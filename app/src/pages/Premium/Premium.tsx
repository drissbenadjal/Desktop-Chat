import './Premium.scss'
import { HeaderBar } from '@/components/HeaderBar/HeaderBar'

export const Premium = () => {
    return (
        <div className="premium">
            <HeaderBar type="premium" />
            <div className="premium__content">
                <div className="container__soon">
                    <h1>Soon</h1>
                </div>
            </div>
        </div>
    )
}