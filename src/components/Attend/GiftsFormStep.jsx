import React from 'react'

export default function GiftsFormStep() {
    return (
        <div className="gift gift__container">
            <img loading="lazy" src="" alt="" />
            <p>
                Your presence at our wedding party is gift enough!
                But if you wish to give something, a contribution to
                our future would mean a lot to us.
            </p>

            <p>You could use one of the following services</p>
            <div className="gift__services">
                <br /><a target="_blank" href="twint://recipient=0797977686">Pay with TWINT</a>
                <br /><a target="_blank" href="https://qr.vipps.no/28/2/01/031/4799229116?v=1">Use Vipps</a>
                <br /><a target="_blank" href="https://paypal.me/jaredisaksen?country.x=NO&locale.x=no_NO">Use PayPal</a>
            </div>
            <p>or contact us if you want to contribute in some other way</p>
        </div>
    )
}
