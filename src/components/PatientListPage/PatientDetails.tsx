import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import patientService from '../../services/patients'
import diagnoseService from '../../services/diagnoses'
import { Diagnose, NewHealthEntry, Patient, } from '../../types'
import { Container, Typography, Button, Alert } from '@mui/material'
import { Female, Male } from '@mui/icons-material';
import EntryDetails from './EntryDetails'
import axios from 'axios'
import AddEntryModal from '../AddEntryModal'

const PatientDetaills = () => {
    const [patient, setPatient] = useState<Patient | null>(null)
    const id = useParams().id
    const [diagnoses, setDiagnoses] = useState<Diagnose[]>([])
    const [error, setError] = useState("");
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => setModalOpen(false);

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
        setError(noti)
        setTimeout(() => {
            setError("")
        }, 3000)
    }

    const submitNewEntry = async (object: NewHealthEntry) => {
        try {
            if (id) {
                const newEntry = await patientService.createHealthEntry(id, object);
                if (patient?.entries) {
                    setPatient({ ...patient, entries: patient?.entries.concat(newEntry) });
                }
            }
            setModalOpen(false);
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
            {error && <Alert severity="error">{error}</Alert>}
            <Typography component="h2" variant="h5" style={{ marginTop: 16 }}>entries</Typography>
            {patient?.entries.map(entry => (
                <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
            ))}
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button variant="contained" onClick={() => openModal()}>
                Add New Entry
            </Button>
        </Container>)
}

export default PatientDetaills