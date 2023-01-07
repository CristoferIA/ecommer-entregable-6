import React from 'react'
import './imSorry.css'

const ImSorry = ({inputValues}) => {
  return (
    <div className='not-fund'>
        <h1>Sorry :(</h1>
        <p>we couldn't find this product</p>
        <div>{inputValues.length>0 ? `"${inputValues}"`: ''}</div>
    </div>
  )
}

export default ImSorry