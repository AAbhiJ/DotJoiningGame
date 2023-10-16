import { useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const items: MenuProps['items'] = [
  {
    label: 'Config',
    key: 'config',
    icon: <SettingOutlined />,
    children: [
        {
            label: (<Link to={`/login`} style={{fontWeight:'normal'}}>
                        Login
                    </Link>),
            key: 'config:3',
        },
        {
            label: (<Link to={`/about`} style={{fontWeight:'normal'}}>
                        About
                    </Link>),
            key: 'config:1',
        },
        {
            label: (<Link to={`/contact`} style={{fontWeight:'normal'}}>
                        Course
                    </Link>),
            key: 'config:2',
        },
        {
            label: (<Link to={`/practical`} style={{fontWeight:'normal'}}>
                        Practical
                    </Link>),
            key: 'config:4',
        },
        // {
        //   type: 'Department',
        //   label: 'Item 1',
        //   children: [
        //     {
        //       label: 'Option 1',
        //       key: 'setting:1',
        //     },
        //     {
        //       label: 'Option 2',
        //       key: 'setting:2',
        //     },
        //   ],
        // },
        // {
        //   type: 'group',
        //   label: 'Item 2',
        //   children: [
        //     {
        //       label: 'Option 3',
        //       key: 'setting:3',
        //     },
        //     {
        //       label: 'Option 4',
        //       key: 'setting:4',
        //     },
        //   ],
        // },
      ],
  },
  // {
  //   label: 'Navigation Two',
  //   key: 'app',
  //   icon: <AppstoreOutlined />,
  //   disabled: true,
  // },
  // {
  //   label: 'Navigation Three - Submenu',
  //   key: 'SubMenu',
  //   icon: <SettingOutlined />,
   
  // },
  // {
  //   label: (
  //     <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
  //       Navigation Four - Link
  //     </a>
  //   ),
  //   key: 'alipay',
  // },
];

const TopMenu = () => {
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
      console.log('click ', e);
      setCurrent(e.key);
    };
  
    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
}

export default TopMenu;
