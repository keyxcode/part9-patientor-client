import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import patientService from '../../services/patients'
import diagnoseService from '../../services/diagnoses'
import { Diagnose, NewHealthEntry, Patient, } from '../../types'
import { Container, Typography } from '@mui/material'
import { Female, Male } from '@mui/icons-material';
import EntryDetails from './EntryDetails'
import axios from 'axios'

const PatientDetaills = () => {
    const [patient, setPatient] = useState<Patient | null>(null)
    const id = useParams().id
    const [diagnoses, setDiagnoses] = useState<Diagnose[]>([])
    const [notification, setNotification] = useState("");

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

    const displayNotification = (noti: string) => {
        setNotification(noti)
        setTimeout(() => {
            setNotification("")
        }, 3000)
    }

    const submitNewEntry = async (object: NewHealthEntry) => {
        try {
            if (id) {
                const entry = await patientService.createHealthEntry(id, object);
                if (patient?.entries) {
                    setPatient({ ...patient, entries: patient?.entries.concat(entry) });
                }
            }
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (e.response) {
                    displayNotification(e.response.data)
                } else {
                    displayNotification("An unrecognized Axios error has occured")
                }
            } else {
                displayNotification("An unknown error has occured" + e)
            }
        }
    };

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
            <Typography variant="body1" sx={{ color: "red" }}>{notification}</Typography>
            <Typography component="h2" variant="h5" style={{ marginTop: 16 }}>entries</Typography>
            {patient?.entries.map(entry => (
                <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
            ))}

        </Container>)
}

export default PatientDetaills