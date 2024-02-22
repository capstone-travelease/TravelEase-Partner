import Header from 'src/components/Header'

interface Props {
    children: React.ReactNode
}

export default function DashBoardLayout({ children }: Props) {
    return (
        <div className='bg-secondary min-h-screen'>
            <Header />
            {children}
        </div>
    )
}
