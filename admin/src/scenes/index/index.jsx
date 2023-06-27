import React, {useEffect, useState} from 'react'

export default function Index(){
    useEffect(() => {
        changeTitle('Admin Dashboard');
      });
    
      const changeTitle = data => {
        document.title = data;
      };
  return (
    <div>
        <h2 className='text-center'>Nothing here!</h2>
    </div>
  )
}
