import React from 'react'
import Announcements from '../Announcements'


const DashPanel = (props) => {
  return (
        <div className="py-[2rem] h-full w-full bg-inherit grid rounded-xl grid-rows-[300px_1fr] place-items-center gap-[2rem]">
          <div className="w-[90%] h-full grid grid-rows-[0.6fr_1fr]">
            <div className="mb-[2rem] flex flex-row items-center border-b-[1px] border-gray-200 items-center">
              <div>
                <h1 className="text-lg font-bold">Hello, Simon 👋</h1>
                <p className="text-xs text-slate-400">Welcome to STCF!</p>
              </div>
              <div className="ml-auto flex flex-row w-fit">
                <button type="button" class="text-white bg-gray-800 hover:bg-black focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit User Info</button>
                <button type="button" class="text-white bg-gray-800 hover:bg-black focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Semester</button>
              </div>
            </div>
            <div className="grid grid-cols-2 grid-rows-4 h-full">
              <div className='flex flex-row items-center'>
                <p className="w-[10rem] h-fit">User ID</p>
                <p className="h-fit text-gray-500">
                7ZQIuDvvg94xaba
                </p>
              </div>
              <div className='flex flex-row items-center'>
                <p className="w-[10rem] h-fit">Username</p>
                <p className="h-fit text-gray-500">
                7ZQIuDvvg94xaba
                </p>
              </div>
              <div className='flex flex-row items-center'>
                <p className="w-[10rem] h-fit">ID Number</p>
                <p className="h-fit text-gray-500">
                7ZQIuDvvg94xaba
                </p>
              </div>
              <div className='flex flex-row items-center'>
                <p className="w-[10rem] h-fit">E-mail address</p>
                <p className="h-fit text-gray-500">
                7ZQIuDvvg94xaba
                </p>
              </div>
              <div className='flex flex-row items-center'>
                <p className="w-[10rem] h-fit">Phone number</p>
                <p className="h-fit text-gray-500">
                7ZQIuDvvg94xaba
                </p>
              </div>
              <div className='flex flex-row items-center'>
                <p className="w-[10rem] h-fit">Enrolled</p>
                <p className="h-fit text-gray-500">
                7ZQIuDvvg94xaba
                </p>
              </div>
              <div className='flex flex-row items-center'>
                <p className="w-[10rem] h-fit">Birthday</p>
                <p className="h-fit text-gray-500">
                7ZQIuDvvg94xaba
                </p>
              </div>
              <div className='flex flex-row items-center'>
                <p className="w-[10rem] h-fit">Defeciencies</p>
                <p className="h-fit text-gray-500">
                7ZQIuDvvg94xaba
                </p>
              </div>
            </div>
          </div>
          <Announcements />
        </div>
  )
}

export default DashPanel
