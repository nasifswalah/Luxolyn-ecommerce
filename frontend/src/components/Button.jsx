import React from 'react'


const Button = ({ name, icon, onClick, type }) => {
  return (
    <button type={type}  className='bg-white w-fit px-4 py-2 flex text-black rounded-full mx-auto font-normal gap-2 justify-center items-center hover:bg-[#d8d8d8] outline-none transition duration-500 ease-in-out text-sm ' onClick={onClick}>
      <img src={icon} alt="" className='w-5 h-5' />
      <span>{name}</span>
    </button>
  )
}

export default Button
