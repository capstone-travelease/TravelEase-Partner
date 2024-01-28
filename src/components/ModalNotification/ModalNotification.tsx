import { Button, Modal, Result } from 'antd'
import { Link } from 'react-router-dom'

type PropsType = {
    open: boolean
    btnContent: string
    routes: string
}

export default function ModalNotification({ open, btnContent, routes }: PropsType) {
    return (
        <>
            <Modal open={open} className='p-0' closeIcon={false} footer={false}>
                <Result
                    status='success'
                    title='Successfully'
                    subTitle='Your request to create a new hotel has been sent successfully'
                    extra={[
                        <Link to={routes} key='console'>
                            <Button type='default'>{btnContent}</Button>
                        </Link>
                    ]}
                />
            </Modal>
        </>
    )
}
