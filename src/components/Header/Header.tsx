import { BellOutlined, LoginOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Badge, Dropdown, MenuProps } from 'antd'
import { Link } from 'react-router-dom'
import logoImage from 'src/assets/logo.png'

const items: MenuProps['items'] = [
    {
        label: <Link to=''>Profile</Link>,
        icon: <UserOutlined />,
        key: '1'
    },
    {
        label: <Link to=''>Account setting</Link>,
        icon: <SettingOutlined />,
        key: '2'
    },
    {
        type: 'divider'
    },
    {
        label: <Link to='/login'>Sign Out</Link>,
        key: '3',
        icon: <LoginOutlined />
    }
]

interface Props {
    logo?: boolean
}

export default function Header({ logo = true }: Props) {
    return (
        <div className='bg-white shadow px-7 inset-2 flex justify-between items-center'>
            <div className='w-20 h-20'>{logo && <img src={logoImage} alt='logo' className='w-full h-full' />}</div>
            <div className='flex items-center'>
                <Dropdown menu={{ items }} trigger={['click']}>
                    <div className='flex text-end cursor-pointer items-center'>
                        <div>
                            <p className='font-semibold'>Nguyen Khoi Nguyen</p>
                            <p className='text-gray-500'>Partner</p>
                        </div>
                        <div className='w-10 h-10 ml-3 overflow-hidden rounded-full'>
                            <img
                                src='https://styles.redditmedia.com/t5_2su6s/styles/communityIcon_4g1uo0kd87c61.png'
                                alt='avatar'
                                className='w-full h-full'
                            />
                        </div>
                    </div>
                </Dropdown>
                <Badge size='small' count={5} className='ml-3'>
                    <Avatar size={40} icon={<BellOutlined />} />
                </Badge>
            </div>
        </div>
    )
}
