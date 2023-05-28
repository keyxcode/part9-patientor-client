import { useParams } from 'react-router-dom'

const PatientPage = () => {
    const id = useParams().id

    return <div>Hello {id}</div>
}

export default PatientPage