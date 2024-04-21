import Header from 'src/components/Header'
import logoImage from 'src/assets/logo.png'
import { ConfigProvider, Layout, Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content } from 'antd/es/layout/layout'
import { useEffect, useState } from 'react'
import HotelOverview from 'src/pages/HotelOverview'
import HotelDetail from 'src/pages/HotelDetail'
import RoomManagement from 'src/pages/RoomManagement/pages/RoomManagement'
import BookingManagment from 'src/pages/BookingManagement'
import { useParams } from 'react-router-dom'

export default function HotelManagementLayout() {
    const [tabs, setTabs] = useState('2')

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
                            defaultSelectedKeys={[tabs]}
                            onClick={(info) => {
                                setTabs(info.key)
                            }}
                            className='bg-[#180101] !border-none text-base'
                            items={[
                                {
                                    label: 'Overview',
                                    key: '1'
                                },
                                {
                                    label: 'Hotel Management',
                                    key: '2'
                                },
                                {
                                    label: 'Room Management',
                                    key: '3'
                                },
                                {
                                    label: 'Falicities',
                                    key: '4'
                                },
                                {
                                    label: 'Booking Management',
                                    key: '5'
                                },
                                {
                                    label: 'Feedback',
                                    key: '6'
                                }
                            ]}
                        />
                    </Sider>
                    <Content className='ml-[250px]'>
                        <div>
                            <Header logo={false} />
                            {tabs === '1' && <HotelOverview />}
                            {tabs === '2' && <HotelDetail />}
                            {tabs === '3' && <RoomManagement />}
                            {tabs === '5' && <BookingManagment />}
                        </div>
                    </Content>
                </Layout>
            </ConfigProvider>
        </div>
    )
}
