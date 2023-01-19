import React, { useState } from "react"

function LoggedInView({ Logout, error }) {

    return (
        <div className="welcome">
          <h2>Welcome</h2>
          <button onClick={() => Logout()}>Logout</button>
        </div>
    )
}

export default LoggedInView