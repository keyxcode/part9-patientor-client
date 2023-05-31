import { useState, SyntheticEvent } from "react";
import { TextField, InputLabel, MenuItem, Select, Grid, Button } from '@mui/material';
import { NewHealthEntry, Gender, HospitalEntry, HealthCheckEntry } from "../../types";

interface Props {
    onCancel: () => void;
    onSubmit: (values: NewHealthEntry) => void;
}

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
    const [formData, setFormData] = useState({
        description: "",
        date: "",
        specialist: "",
        type: "HealthCheck",
        diagnosisCodes: [],
        healthCheckRating: 0
    })

    const addPatient = (event: SyntheticEvent) => {
        event.preventDefault();
        onSubmit(formData as Omit<HealthCheckEntry, "id">);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [event.target.name]: event.target.value
        }))
        console.log(formData)
    }

    return (
        <div>
            <form onSubmit={addPatient}>
                <TextField
                    label="description"
                    name="description"
                    fullWidth
                    value={formData.description}
                    onChange={handleChange}
                />
                <TextField
                    label="date"
                    name="date"
                    fullWidth
                    value={formData.date}
                    onChange={handleChange}
                />
                <TextField
                    label="specialist"
                    name="specialist"
                    fullWidth
                    value={formData.specialist}
                    onChange={handleChange}
                />
                <TextField
                    label="healthCheckRating"
                    name="healthCheckRating"
                    fullWidth
                    value={formData.healthCheckRating}
                    onChange={handleChange}
                />

                <Grid>
                    <Grid item>
                        <Button
                            color="secondary"
                            variant="contained"
                            style={{ float: "left" }}
                            type="button"
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            style={{
                                float: "right",
                            }}
                            type="submit"
                            variant="contained"
                        >
                            Add
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default AddEntryForm;