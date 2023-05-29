import { Container, Typography, Box } from '@mui/material'
import { Diagnose, OccupationalHealthcareEntry } from "../../types"
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

export interface EntryOccupationalProps {
    entry: OccupationalHealthcareEntry;
    diagnoses: Diagnose[];
}

const EntryOccupational = (props: EntryOccupationalProps) => {
    const { entry, diagnoses } = props

    return (
        <Container sx={{ padding: 1, border: 1 }}>
            <Typography display="inline" variant="body1">{entry.date} <MedicalInformationIcon /></Typography>
            <Typography display="inline">{entry.employerName}</Typography>
            <Typography fontStyle="italic"> {entry.description}</Typography>
            <ul>
                {entry.diagnosisCodes?.map((code) => (
                    <li key={code}>
                        {code}: {diagnoses?.find((diagnose) => diagnose.code === code)?.name}
                    </li>
                ))}
            </ul>
            <Typography variant="body1">diagnosed by {entry.specialist}</Typography>
        </Container>
    )
}

export default EntryOccupational