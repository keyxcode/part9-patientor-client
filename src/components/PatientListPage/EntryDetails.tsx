import { Container, Typography, Box } from '@mui/material'
import { Diagnose, Entry } from "../../types"

interface EntryDetailsProps {
    entry: Entry;
    diagnoses: Diagnose[] | null
}

const EntryDetails = (props: EntryDetailsProps) => {
    const { entry, diagnoses } = props

    return (
        <Container sx={{ padding: 1, border: 1 }}>
            <Typography variant="body1">{entry.date}</Typography>

            <Typography fontStyle="italic"> {entry.description}</Typography>
            <ul>
                {entry.diagnosisCodes?.map((code) => (
                    <li key={code}>
                        {code}: {diagnoses?.find((diagnose) => diagnose.code === code)?.name}
                    </li>
                ))}
            </ul>
        </Container>
    )
}

export default EntryDetails