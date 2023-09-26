import React from "react"
import Info from "../../images/svg/Info.svg"
import arrows from "../../images/svg/arrows1.svg"

export default function Notification({notification}) {
  return (
    <div className='header'>
    <div className='notification'>
      <div className="alert">
        <div className="alert-line"></div>
      </div>
      <img src={Info} alt="info"/><p>{notification}</p>
    </div>
    <div className='market-link'>
     <img src={arrows}/> Market
    </div>
    </div>
  )
}
