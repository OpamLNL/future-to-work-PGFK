import React, { useContext } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { makeStyles } from "@material-ui/core/styles";
import { LanguageContext } from "../language/language-context";
import statisticLocales from './Locales/statisticLocales.json';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {RoundButton} from "../components";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'start',
        minHeight: '100vh',
        padding: theme.spacing(2),
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Напівпрозорий фон
        borderRadius: theme.shape.borderRadius,
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(3),
        },
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(4),
        },
        overflow: 'hidden',
    },
    title: {
        fontSize: '2rem',
        fontFamily: theme.typography.fontFamily,
        marginBottom: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.primary.contrastText,
        [theme.breakpoints.up('sm')]: {
            fontSize: '2.5rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '3rem',
        },
    },
    table: {
        minWidth: 650,
        backgroundColor: 'transparent', // Видалено білий фон у таблиці
    },
    checkIcon: {
        color: theme.palette.success.main,
    },
    cancelIcon: {
        color: theme.palette.error.main,
    },
    button: {
        fontSize: '0.875rem',
        padding: theme.spacing(0.5, 2),
        textTransform: 'none',
    },
    smallCell: {
        width: '150px', // Зменшена ширина колонок
    },
}));

const employers = [
    { name: "TechNova", diversity: true, fairHiring: true, chatTolerance: true },
    { name: "FutureWave", diversity: true, fairHiring: true, chatTolerance: false },
    { name: "InnoSoft", diversity: false, fairHiring: true, chatTolerance: true },
    { name: "CloudSphere", diversity: true, fairHiring: false, chatTolerance: true },
    { name: "QuantumEdge", diversity: true, fairHiring: true, chatTolerance: false },
    { name: "Nexus Solutions", diversity: true, fairHiring: true, chatTolerance: true },
    { name: "CodeHorizon", diversity: true, fairHiring: true, chatTolerance: true },
    { name: "ByteLogic", diversity: false, fairHiring: true, chatTolerance: true },
    { name: "CyberNest", diversity: true, fairHiring: true, chatTolerance: false },
    { name: "SkyNetics", diversity: true, fairHiring: false, chatTolerance: true }
];

export const StatisticPage = () => {
    const classes = useStyles();
    const language = useContext(LanguageContext);

    return (
        <Container className={classes.container}>
            <Typography variant="h3" className={classes.title}>
                {`${statisticLocales.find(item => item.hasOwnProperty('title'))?.title[language.language] || ''}`}
            </Typography>
            <TableContainer>
                <Table className={classes.table} aria-label="employers statistics">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Компанія</strong></TableCell>
                            <TableCell align="center" className={classes.smallCell}><strong>Інклюзивність</strong></TableCell>
                            <TableCell align="center" className={classes.smallCell}><strong>Неупереджений найм</strong></TableCell>
                            <TableCell align="center" className={classes.smallCell}><strong>Толерантність у чатах</strong></TableCell>
                            <TableCell align="center"><strong>Дії</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employers.map((employer, index) => (
                            <TableRow key={index}>
                                <TableCell>{employer.name}</TableCell>
                                <TableCell align="center" className={classes.smallCell}>{employer.diversity ? <CheckCircleIcon className={classes.checkIcon} /> : <CancelIcon className={classes.cancelIcon} />}</TableCell>
                                <TableCell align="center" className={classes.smallCell}>{employer.fairHiring ? <CheckCircleIcon className={classes.checkIcon} /> : <CancelIcon className={classes.cancelIcon} />}</TableCell>
                                <TableCell align="center" className={classes.smallCell}>{employer.chatTolerance ? <CheckCircleIcon className={classes.checkIcon} /> : <CancelIcon className={classes.cancelIcon} />}</TableCell>
                                <TableCell align="center">
                                    <RoundButton >
                                        ✎ Відгук
                                    </RoundButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};
