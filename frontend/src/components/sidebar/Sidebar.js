import React from 'react'
import { Menu } from 'antd';
import { FileOutlined, PieChartOutlined, UserOutlined, DesktopOutlined, TeamOutlined } from '@ant-design/icons';

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
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
    ];

  return (
    <aside className='col-span-1 bg-primary rounded-xl rounded-r-0 p-6 content'>
        <Menu className='sidebarNav' defaultSelectedKeys={['1']} mode="inline" items={navitems} />
    </aside>
  )
}
