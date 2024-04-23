import Header from 'src/components/Header'
import logoImage from 'src/assets/logo.png'
import { ConfigProvider, Layout, Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

interface HotelManagementLayoutProps {
    children?: React.ReactNode
}

export default function HotelManagementLayout({ children }: HotelManagementLayoutProps) {
    const { hotelId } = useParams()
    const { pathname } = useLocation()
    const tab = pathname.split('/')[3] || 'overview'

    const navigate = useNavigate()
    return (
        <div className='bg-[#F5F5F5] min-h-screen'>
            <ConfigProvider
                theme={{
                    components: {
                        Menu: {
                            itemSelectedBg: '#341C1C',
                            itemHoverColor: '#ccc',
                            itemHoverBg: '#341C1C',
                            itemMarginInline: 0,
                            itemHeight: 38,
                            colorText: '#fff'
                        },
                        Layout: {
                            siderBg: '#180101'
                        }
                    }
                }}
            >
                <Layout hasSider>
                    <Sider
                        width={250}
                        style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
                        className='py-5 px-6 text-white'
                    >
                        <div className='w-36 h-36 m-auto'>
                            <img src={logoImage} alt='logo' className='w-full h-full' />
                        </div>
                        <h4>Menu</h4>
                        <Menu
                            mode='inline'
                            inlineIndent={24}
                            defaultSelectedKeys={[tab]}
                            onClick={(info) => {
                                navigate(`/hotel/${hotelId}/${info.key}`)
                            }}
                            className='bg-[#180101] !border-none text-base'
                            items={[
                                {
                                    label: 'Overview',
                                    key: 'overview'
                                },
                                {
                                    label: 'Hotel Management',
                                    key: 'hotel-detail'
                                },
                                {
                                    label: 'Room Management',
                                    key: 'room-management'
                                },
                                {
                                    label: 'Booking Management',
                                    key: 'booking-management'
                                },
                                {
                                    label: 'Feedback',
                                    key: 'feedback'
                                }
                            ]}
                        />
                    </Sider>
                    <Content className='ml-[250px]'>
                        <div>
                            <Header logo={false} />
                            {children}
                        </div>
                    </Content>
                </Layout>
            </ConfigProvider>
        </div>
    )
}
