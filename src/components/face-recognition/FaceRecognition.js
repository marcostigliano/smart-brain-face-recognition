import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imgUrl, box }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputImg' src={imgUrl} alt='' width='500px' height='auto'/>
        {
          box.map((aBox, i) => {
            return (
            <div 
              className='bounding-box' 
              style={{ 
                top: aBox.topRow, 
                right: aBox.rightCol, 
                bottom: aBox.bottomRow, 
                left: aBox.leftCol 
              }} 
            />
            )
          })
        }
      </div>
    </div>
  )
}

export default FaceRecognition;