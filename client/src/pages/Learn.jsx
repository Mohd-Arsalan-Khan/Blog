import React from 'react'
import CallToAction from"../components/CallToAction"

function Learn() {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
      <h1 className='text-3xl font-semibold'>Learn More</h1>
      <p className='text-md text-gray-500'>Build more porject while learning HTML, CSS, JS, React, Next</p>
      <CallToAction/>
    </div>
  )
}

export default Learn