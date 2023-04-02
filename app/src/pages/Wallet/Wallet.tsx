import './Wallet.scss'
import { HeaderBar } from '@/components/HeaderBar/HeaderBar'

export const Wallet = () => {
    return (
        <div className="wallet">
            <HeaderBar type="wallet" />
            <div className="wallet__content">
                <div className="container__soon">
                    <h1>Soon</h1>
                </div>
            </div>
        </div>
    )
}