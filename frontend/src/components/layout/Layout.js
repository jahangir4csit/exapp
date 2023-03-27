import React from 'react'
import Header from '../header/Header'
import Sidebar from '../sidebar/Sidebar'

export default function Layout({ children }) {
  return (
    <main className='wrapper bg-secondary overflow-hidden min-h-screen'>
        <Header />
        <div className='content_layout_wrap bg-primary grid grid-cols-7 m-6 mb-5 rounded-xl'>
            <Sidebar />
            <section className='col-span-6 rounded-xl p-6 bg-white'>
                {children}
            </section>
        </div>
    </main>
  )
}
