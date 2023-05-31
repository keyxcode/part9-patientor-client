import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';
import AddEntryForm from "./AddEntryForm";
import { NewHealthEntry, Diagnose } from "../../types";

interface Props {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: NewHealthEntry) => void;
    error?: string;
    diagnoses: Diagnose[]
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, diagnoses }: Props) => (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
        <DialogTitle>Add a new patient</DialogTitle>
        <Divider />
        <DialogContent>
            {error && <Alert severity="error">{error}</Alert>}
            <AddEntryForm onSubmit={onSubmit} onCancel={onClose} diagnoses={diagnoses} />
        </DialogContent>
    </Dialog>
);

export default AddEntryModal;
