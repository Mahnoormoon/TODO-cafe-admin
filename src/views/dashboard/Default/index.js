import { useEffect, useState } from 'react';

// material-ui
import { Grid, MainCard, Typography } from '@mui/material';

// project imports
import TotalUsersCard from './TotalUsersCard';
import TotalTodoCard from './TotalTodoCard';
import TotalMusicPlayerCard from './TotalMusicPlayerCard';
import TotalStudyMethodsCard from './TotalStudyMethodsCard';
import TotalReminderCard from './TotalReminderCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import UserDataGrid from './UserDataGrid';
import TodoDataGrid from './TodoDataGrid';
import StudyMethodsDataGrid from './StudyMethodsDataGrid';
import MusicDataGrid from './MusicDataGrid';
import ContactDataGrid from './ContactDataGrid';
import UserChart from './UserChart.js';
import TodoChart from './TodoChart.js';
import MusicChart from './MusicChart.js';
import StudyChart from './StudyChart.js';
import { gridSpacing } from 'store/constant';
import config from '../../../config';

// ==============================|| DASHBOARD ||============================== //

const Dashboard = () => {
    const url = config.api_url;

    const [userList, setUserList] = useState([]);

    const fetchUsers = async () => {
        const res = await fetch(url + '/user/getall');
        const data = await res.json();
        setUserList(data.result);
        console.log(data);
    };

    const [userLoading, setUserLoading] = useState(true);
    useEffect(() => {
        fetchUsers();
        setUserLoading(false);
    }, []);

    const [todoList, setTodoList] = useState([]);

    const fetchTodos = async () => {
        const res = await fetch(url + '/todolist/getall');
        const data = await res.json();
        setTodoList(data.result);
        console.log(data);
    };

    const [todoLoading, setTodoLoading] = useState(true);
    useEffect(() => {
        fetchTodos();
        setTodoLoading(false);
    }, []);

    const [musiclistenList, setMusiclistenList] = useState([]);

    const fetchMusiclistens = async () => {
        const res = await fetch(url + '/music/getall');
        const data = await res.json();
        setMusiclistenList(data.result);
        console.log(data);
    };

    const [musicLoading, setMusicLoading] = useState(true);
    useEffect(() => {
        fetchMusiclistens();
        setMusicLoading(false);
    }, []);

    const [studymethodList, setStudymethodList] = useState([]);

    const fetchStudymethods = async () => {
        const res = await fetch(url + '/study/getall');
        const data = await res.json();
        setStudymethodList(data.result);
        console.log(data);
    };

    const [studyLoading, setStudyLoading] = useState(true);
    useEffect(() => {
        fetchStudymethods();
        setStudyLoading(false);
    }, []);

    const [reminderList, setReminderList] = useState([]);

    const fetchReminders = async () => {
        const res = await fetch(url + '/reminder/getall');
        const data = await res.json();
        setReminderList(data.result);
        console.log(data);
    };

    const [reminderLoading, setReminderLoading] = useState(true);
    useEffect(() => {
        fetchReminders();
        setReminderLoading(false);
    }, []);

    const [growthList, setGrowthList] = useState([]);

    const fetchGrowth = async () => {
        const res = await fetch(url + '/growth/getall');
        const data = await res.json();
        setGrowthList(data.result);
        console.log(data);
    };

    const [growthLoading, setGrowthLoading] = useState(true);
    useEffect(() => {
        fetchGrowth();
        setGrowthLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalUsersCard cardValue={userList.length} userLoading={userLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalMusicPlayerCard musicValue={musiclistenList.length} musicLoading={musicLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalStudyMethodsCard studyValue={studymethodList.length} studyLoading={studyLoading} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalTodoCard todoValue={todoList.length} todoLoading={todoLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalReminderCard reminderValue={reminderList.length} reminderLoading={reminderLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5">MongoDB Charts</Typography>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={6} md={2}>
                        <UserChart />
                        <TodoChart />
                        <MusicChart />
                        <StudyChart />
                    </Grid>
                </Grid>
                {/*User Table*/}
                <div style={{ width: "100%", padding: "20px" }}>

                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h5">User DataTable</Typography>
                        </Grid>
                        <Grid item />
                    </Grid>
                    <MainCard sx={{ mt: 2 }} content={false}>
                        <UserDataGrid />
                    </MainCard>

                </div>
                {/*Todo Table*/}
                <div style={{ width: "100%", padding: "20px" }}>

                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h5">Todo DataTable</Typography>
                        </Grid>
                        <Grid item />
                    </Grid>
                    <MainCard sx={{ mt: 2 }} content={false}>
                        <TodoDataGrid />
                    </MainCard>

                </div>
                {/*Music Table*/}
                <div style={{ width: "100%", padding: "20px" }}>

                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h5">Study Music DataTable</Typography>
                        </Grid>
                        <Grid item />
                    </Grid>
                    <MainCard sx={{ mt: 2 }} content={false}>
                        <MusicDataGrid />
                    </MainCard>

                </div>
                {/*Study Methods Table*/}
                <div style={{ width: "100%", padding: "20px" }}>

                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h5">Study Methods DataTable</Typography>
                        </Grid>
                        <Grid item />
                    </Grid>
                    <MainCard sx={{ mt: 2 }} content={false}>
                        <StudyMethodsDataGrid />
                    </MainCard>

                </div>
                {/*Contact Table*/}
                <div style={{ width: "100%", padding: "20px" }}>

                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="h5">Contact DataTable</Typography>
                        </Grid>
                        <Grid item />
                    </Grid>
                    <MainCard sx={{ mt: 2 }} content={false}>
                        <ContactDataGrid />
                    </MainCard>

                </div>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={16} md={12}>
                        <TotalGrowthBarChart growthValue={growthList.length} growthLoading={growthLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;