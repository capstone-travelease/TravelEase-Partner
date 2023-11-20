import { Button, Checkbox, Input } from 'antd'

export default function DashBoard() {
    return (
        <div>
            DashBoard
            <Button size='large' type='primary'>
                Hello
            </Button>
            <Input size='large' placeholder='Username' />
            <Checkbox />
        </div>
    )
}
