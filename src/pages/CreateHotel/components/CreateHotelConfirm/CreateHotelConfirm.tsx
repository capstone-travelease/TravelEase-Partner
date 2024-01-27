import axios from 'axios'
import { useState } from 'react'

const instance = axios.create({
    baseURL: 'http://34.142.198.2:3634/',
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
})

export default function CreateHotelConfirm() {
    const [file, setFile] = useState<File>()
    const handlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = new FormData()
        if (file) {
            form.append('image', file)
            console.log(form)
            instance
                .post('/user/updateimage?userid=19', form, { headers: { 'Content-Type': 'multipart/form-data' } })
                .then(function (response) {
                    console.log(response)
                })
                .catch(function (error) {
                    console.log(error)
                })
        }
    }
    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files?.[0])
        const f = e.target.files?.[0]
        setFile(f)
    }

    return (
        <div>
            <form onSubmit={handlSubmit}>
                CreateHotelConfirm
                <input type='file' onChange={handleOnchange} />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
