import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import patientService from '../../services/patients'
import diagnoseService from '../../services/diagnoses'
import { Diagnose, Patient, } from '../../types'
import { Container, Typography } from '@mui/material'
import { Female, Male } from '@mui/icons-material';
import EntryDetails from './EntryDetails'

const PatientDetaills = () => {
    const [patient, setPatient] = useState<Patient | null>(null)
    const id = useParams().id
    const [diagnoses, setDiagnoses] = useState<Diagnose[]>([])

    useEffect(() => {
        if (id) {
            patientService
                .getPatient(id)
                .then(data => {
                    setPatient(data)
                })
                .catch(e => console.log(e))
        }
    }, [id])

    useEffect(() => {
        diagnoseService
            .getDianoses()
            .then(data => {
                setDiagnoses(data)
            })
            .catch(e => console.log(e))
    })

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
                <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
            ))}

        </Container>)
}

export default PatientDetaills