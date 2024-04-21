import { LoginOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Dropdown, MenuProps } from 'antd'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logoImage from 'src/assets/logo.png'
import { ROUTES } from 'src/constants/Routes'
import { AppContext } from 'src/contexts/app.context'
import { clearLocalStorage } from 'src/utils/auth'

interface Props {
    logo?: boolean
}

export default function Header({ logo = true }: Props) {
    const { setIsAuthenticated, setProfile, profile } = useContext(AppContext)
    const navigate = useNavigate()

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
            label: 'Sign Out',
            key: '3',
            icon: <LoginOutlined />,
            onClick: () => {
                clearLocalStorage()
                setIsAuthenticated(false)
                setProfile(null)
                navigate(ROUTES.LOGIN)
            }
        }
    ]

    return (
        <div className='bg-white shadow px-7 inset-2 flex justify-between items-center'>
            <div className='w-20 h-20 flex items-center'>
                {logo && <img src={logoImage} alt='logo' className='w-full h-full' />}
                <Link to={ROUTES.DASHBOARD} className={logo ? 'ml-5 font-semibold' : 'font-semibold'}>
                    Dashboard
                </Link>
            </div>
            <Dropdown menu={{ items }} trigger={['click']}>
                <div className='flex text-end cursor-pointer items-center'>
                    <div>
                        <p className='font-semibold'>{profile?.fullName || 'Guest'}</p>
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
        </div>
    )
}
