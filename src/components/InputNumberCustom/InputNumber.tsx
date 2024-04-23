import { Input } from 'antd'
import { useState } from 'react'

export interface InputNumberProps {
    placeholder?: string
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    value?: string
    max?: number
    className?: string
}

export default function InputNumberCustom({ placeholder, onChange, value = '', max, className }: InputNumberProps) {
    const [localValue, setLocalValue] = useState<string>(value as string)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        if (value.match(/^[0-9]+$/) || value === '') {
            onChange && onChange(event)
            setLocalValue(value)
        }
    }

    return (
        <Input
            size='large'
            maxLength={max}
            placeholder={placeholder}
            value={value || localValue}
            onChange={handleChange}
            className={className}
        />
    )
}
