import React from 'react'
import Link from "next/link";


function result() {
  return (
    <div className='psx-60 flex-col gap-28'>
      <div className='py-40'>

      <h1 className='text-blue-400 text-center text-[60px] font-bold'>Congratulations You Submitted Form</h1>
      </div>
   <div className='flex justify-center'>

      <Link href={{  pathname: "/"}}>
          <button
            className="bg-green-400 p-3 text-white font-bold"
            type="button"
            >
            Go to Home Page
          </button>
            </Link>
   
   </div >
   
    </div>
  )
}

export default result
