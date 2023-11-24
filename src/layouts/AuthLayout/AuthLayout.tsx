import logo from '../../assets/logo.png'

interface Props {
    children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
    return (
        <div className='bg-primary min-h-screen flex items-center justify-center'>
            <div className='w-[1125px] shadow rounded-sm my-10 bg-white flex'>
                <div className='flex-1 py-14 px-16 flex items-center justify-center'>
                    <div className='font-medium px-5 text-center'>
                        <div className='w-[200px] h-[200px] m-auto'>
                            <img src={logo} alt='logo' className='h-full w-full' />
                        </div>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit suspendisse.
                    </div>
                </div>
                <div className='w-[1px] bg-gray-200' />
                {children}
            </div>
        </div>
    )
}
