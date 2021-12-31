import React from 'react'
import './Card.scss'

const Card = (prop) => {
    return (
        <div>
            <div className={prop.isShow ? 'showCard' : 'notDisplay'}>
                <div className='contents'>
                    <p>
                        {prop.floor} 階の{' '}
                        {prop.machine === ''
                            ? ''
                            : prop.machine === 'washer'
                            ? '洗濯機'
                            : '乾燥機'}{' '}
                        の空き状況
                    </p>
                    <p>
                        {prop.using} / {prop.param} が使用中です
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Card
