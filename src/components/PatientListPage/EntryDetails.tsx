import { EntryDetailsProps } from "../../types"
import EntryHospital from './EntryHospital';
import EntryOccupational from './EntryOccupational';
import EntryHealthCheck from './EntryHealthCheck';

const EntryDetails = (props: EntryDetailsProps) => {
    const { entry, diagnoses } = props;

    switch (entry.type) {
        case 'Hospital':
            return <EntryHospital entry={entry} diagnoses={diagnoses} />;
        case 'OccupationalHealthcare':
            return <EntryOccupational entry={entry} diagnoses={diagnoses} />;
        case 'HealthCheck':
            return <EntryHealthCheck entry={entry} diagnoses={diagnoses} />;
        default:
            return <div></div>
    }
}

export default EntryDetails