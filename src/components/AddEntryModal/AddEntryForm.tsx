import { useState, SyntheticEvent } from "react";
import { TextField, MenuItem, Select, Grid, Button, FormControl, Box, Typography } from '@mui/material';
import { NewHealthEntry, HealthCheckEntry } from "../../types";

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
        healthCheckRating: 0,
        dischargeDate: "",
        dischargeCriteria: "",
        employerName: "",
        startDate: "",
        endDate: "",
    })

    const addPatient = (event: SyntheticEvent) => {
        event.preventDefault();

        let dataToSubmit = {}

        if (formData.type === "HealthCheck") {
            const { dischargeDate, dischargeCriteria, employerName, startDate, endDate, ...rest } = formData
            dataToSubmit = { ...rest }
        } else if (formData.type === "Hospital") {
            const { healthCheckRating, employerName, startDate, endDate, dischargeDate, dischargeCriteria, ...rest } = formData
            dataToSubmit = { ...rest, discharge: { date: dischargeDate, criteria: dischargeCriteria } }
        } else if (formData.type === "OccupationalHealthcare") {
            const { healthCheckRating, dischargeDate, dischargeCriteria, startDate, endDate, ...rest } = formData
            dataToSubmit = { ...rest, sickLeave: { startDate, endDate } }
        }

        onSubmit(dataToSubmit as NewHealthEntry);
    };

    const handleChange = (event: { target: { name: any; value: any; }; }) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [event.target.name]: event.target.value
        }))
        console.log(formData)
    }

    return (
        <div>
            <form onSubmit={addPatient}>
                <FormControl fullWidth>
                    <Select
                        label="type"
                        name="type"
                        onChange={handleChange}
                        value={formData.type}
                    >
                        <MenuItem value="HealthCheck">HealthCheck</MenuItem>
                        <MenuItem value="Hospital">Hospital</MenuItem>
                        <MenuItem value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
                    </Select>
                </FormControl>
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
                {formData.type === "HealthCheck" &&
                    <TextField
                        label="healthCheckRating"
                        name="healthCheckRating"
                        fullWidth
                        value={formData.healthCheckRating}
                        onChange={handleChange}
                    />}
                {formData.type === "Hospital" &&
                    <Box>
                        <Typography>discharge</Typography>
                        <TextField
                            label="discharge date"
                            name="dischargeDate"
                            fullWidth
                            value={formData.dischargeDate}
                            onChange={handleChange}
                        />
                        <TextField
                            label="discharge criteria"
                            name="dischargeCriteria"
                            fullWidth
                            value={formData.dischargeCriteria}
                            onChange={handleChange}
                        />
                    </Box>}
                {formData.type === "OccupationalHealthcare" &&
                    <Box>
                        <Typography>sick leave</Typography>
                        <TextField
                            label="employer name"
                            name="employerName"
                            fullWidth
                            value={formData.employerName}
                            onChange={handleChange}
                        />
                        <TextField
                            label="start date"
                            name="startDate"
                            fullWidth
                            value={formData.startDate}
                            onChange={handleChange}
                        />
                        <TextField
                            label="end date"
                            name="endDate"
                            fullWidth
                            value={formData.endDate}
                            onChange={handleChange}
                        />
                    </Box>}
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