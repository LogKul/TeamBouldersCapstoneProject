import React from 'react'
import Login from "./components/pages/Login"
import * as rdd from 'react-device-detect'
function Outdated() {

    return rdd.isIE ?
        <div>
            Browser Not Supported
        </div>
        : 
        <div>
            Placeholder text?
        </div>

}

export default Outdated