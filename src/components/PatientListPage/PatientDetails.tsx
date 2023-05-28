import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import patientService from '../../services/patients'
import { Patient } from '../../types'
import { Container, Typography } from '@mui/material'
import { Female, Male } from '@mui/icons-material';

const PatientDetaills = () => {
    const [patient, setPatient] = useState<Patient | null>(null)
    const id = useParams().id

    useEffect(() => {
        if (id) {
            patientService
                .getPatient(id)
                .then(data => {
                    setPatient(data)
                    console.log(data)
                })
                .catch(e => console.log(e))
        }
    }, [id])

    console.log("hi")

    return (
        <Container>
            <Typography component="h1" variant="h4">
                {patient?.name} {patient?.gender === "male" ? <Male /> : <Female />}
            </Typography>
            <Typography variant="body1">
                ssn: {patient?.ssn}
            </Typography>
            <Typography variant="body1">
                occupation: {patient?.occupation}
            </Typography>
        </Container>)
}

export default PatientDetaills