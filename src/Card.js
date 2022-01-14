import React from 'react'
import './Card.scss'
import Circle from 'react-circle'

const Card = (prop) => {
    let progress =
        prop.using - prop.param !== 0
            ? 100 - (prop.using / prop.param) * 100
            : 0
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
                    <Circle
                        animate={true}
                        responsive={true}
                        progress={progress}
                        textColor='#808080'
                        progressColor='#00fa9a'
                        roundedStroke={true}
                        bgColor=''
                    />
                    <p>{prop.param - prop.using} 台が使用可能です</p>
                </div>
            </div>
        </div>
    )
}

export default Card
