import React from 'react'
import { NavLink } from "react-router-dom";
import { Menu } from 'antd';
import { PieChartOutlined, TeamOutlined, ShopOutlined } from '@ant-design/icons';

export default function Sidebar() {
    function getItem(label, key, icon, children) {
        return {
          key,
          icon,
          children,
          label,
        };
      }

    const navitems = [
    getItem(<NavLink to='/dashboard'>Overview</NavLink>, '1', <PieChartOutlined />),
    getItem('User', 'sub1', <TeamOutlined />, [
        getItem(<NavLink to='/users'>All Users</NavLink>, '3'),
        getItem(<NavLink to='/add-role'>Add Role</NavLink>, '4'),
    ]),
    getItem('Products', 'sub2', <ShopOutlined />, [
      getItem(<NavLink to='/products'>All Products</NavLink>, '6'), 
      getItem(<NavLink to='/add-product'>Add New</NavLink>, '8'),
      getItem(<NavLink to='/categories'>Categories</NavLink>, '9'),
      getItem(<NavLink to='/add-category'>Add New Categories</NavLink>, '10')
      ]),
    ];

  return (
    <aside className='col-span-1 bg-primary rounded-xl rounded-r-0 p-6 content'>
        <Menu className='sidebarNav' defaultSelectedKeys={['1']} mode="inline" items={navitems} />
    </aside>
  )
}
