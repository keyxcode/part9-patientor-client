import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import patientService from '../../services/patients'
import { Patient, Entry } from '../../types'
import { Container, Typography, Box } from '@mui/material'
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
            <Typography component="h2" variant="h5" style={{ marginTop: 16 }}>entries</Typography>
            {patient?.entries.map(entry => (
                <Container style={{ padding: 0 }}>
                    <Typography display="inline" variant="body1">{entry.date}</Typography>
                    <Typography display="inline" fontStyle="italic"> {entry.description}</Typography>
                    <ul>
                        {entry.diagnosisCodes?.map(code => (<li>{code}</li>))}
                    </ul>
                </Container>
            ))}

        </Container>)
}

export default PatientDetaills