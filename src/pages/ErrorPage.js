import React from 'react'

import errorImage from "../assets/img/error2.jpg"

function ErrorPage() {
  return (
    <div id='errorPage'>
        <img src={errorImage} alt="404 Not Found" />
    </div>
  )
}

export default ErrorPage
