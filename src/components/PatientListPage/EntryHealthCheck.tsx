import { Container, Typography } from '@mui/material'
import { HealthCheckEntry, Diagnose } from "../../types"
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

export interface EntryHealthCheckProps {
    entry: HealthCheckEntry;
    diagnoses: Diagnose[];
}

const EntryHealthCheck = (props: EntryHealthCheckProps) => {
    const { entry, diagnoses } = props

    return (
        <Container sx={{ padding: 1, border: 1 }}>
            <Typography variant="body1">{entry.date} <MonitorHeartIcon /></Typography>

            <Typography fontStyle="italic"> {entry.description}</Typography>
            <ul>
                {entry.diagnosisCodes?.map((code) => (
                    <li key={code}>
                        {code}: {diagnoses?.find((diagnose) => diagnose.code === code)?.name}
                    </li>
                ))}
            </ul>
            <Typography>Healthy check rating: {entry.healthCheckRating}</Typography>
            <Typography variant="body1">diagnosed by {entry.specialist}</Typography>
        </Container>
    )
}

export default EntryHealthCheck