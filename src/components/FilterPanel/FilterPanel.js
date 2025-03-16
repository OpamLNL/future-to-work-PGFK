import { makeStyles } from "@material-ui/core";
import { Checkbox, ListItemText, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
    fetchCompaniesByFilters,
    fetchFilters,
} from "../../services/mapService";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "76%",
        gap: "10px",
    },
    select: {
        background: theme.palette.primary.light,
    },
    button: {
        border: "none",
        borderRadius: "5px",
        fontSize: "24px",
        padding: "7px 10px 7px 10px",
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.containerBackground,
        transition: "background-color 0.3s, box-shadow 0.3s, transform 0.3s",
        "&:hover": {
            backgroundColor: theme.palette.primary.dark,
            boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.3)",
            transform: "translateY(-2px)",
        },
        "&[disabled]": {
            backgroundColor: "#CCCCCC",
            color: "#666666",
            cursor: "not-allowed",
            boxShadow: "none",
        },
        "&.active": {
            backgroundColor: "#FF4081",
            boxShadow: "0px 4px 10px rgba(255, 64, 129, 0.5)",
        },
    },
}));

const FiltersPanel = ({ onFiltersApplied }) => {
    const [filters, setFilters] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        const loadFilters = async () => {
            try {
                const filterData = await fetchFilters();
                setFilters(filterData);
            } catch (error) {
                console.error("Помилка при завантаженні фільтрів", error);
            }
        };

        loadFilters();
    }, []);

    const handleFilterChange = (event) => {
        setSelectedFilters(event.target.value);
    };

    const handleApplyFilters = async () => {
        setLoading(true);
        try {
            const response = await fetchCompaniesByFilters(selectedFilters);
            onFiltersApplied(response);
        } catch (error) {
            console.error("Помилка при отриманні компаній", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={classes.container}>
            <Select
                className={classes.select}
                multiple
                value={selectedFilters}
                onChange={handleFilterChange}
                renderValue={(selected) => selected.join(", ")}
                fullWidth
            >
                {filters.map((filter) => (
                    <MenuItem key={filter} value={filter}>
                        <Checkbox
                            checked={selectedFilters.indexOf(filter) > -1}
                        />
                        <ListItemText primary={filter} />
                    </MenuItem>
                ))}
            </Select>

            <button
                className={classes.button}
                onClick={handleApplyFilters}
                disabled={loading}
            >
                Застосувати
            </button>
        </div>
    );
};

export default FiltersPanel;
