import React from 'react'
import {Icon} from '../../Icons'
import { NavLink } from 'react-router-dom'

function Menu() {
  return (
    <>
    <nav className='px-2'>
        <ul className='flex flex-col'>
            <li>
                <NavLink to='/' className='h-10 flex gap-x-4 items-center text-sm text-gray-500 font-semibold hover:text-white'>
                    <Icon name='home'></Icon>Home
                </NavLink>
            </li>

            <li>
                <NavLink to='/search' className='h-10 flex gap-x-4 items-center text-sm text-gray-500 font-semibold hover:text-white'>
                    <Icon name='search'></Icon>Search
                </NavLink>
            </li>

            <li>
                <div className='h-10 flex gap-x-4 items-center text-sm text-gray-500 font-semibold hover:text-white'>
                    <Icon name='collection'></Icon>Library
                </div>
            </li>

        </ul>
    </nav>
    </>
  )
}

export default Menu
