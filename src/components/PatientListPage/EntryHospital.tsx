import { Container, Typography } from '@mui/material'
import { Diagnose, HospitalEntry } from "../../types"
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

export interface EntryHospitalProps {
    entry: HospitalEntry;
    diagnoses: Diagnose[];
}

const EntryHospital = (props: EntryHospitalProps) => {
    const { entry, diagnoses } = props

    return (
        <Container sx={{ padding: 1, border: 1 }}>
            <Typography variant="body1">{entry.date} <LocalHospitalIcon /></Typography>

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

export default EntryHospital