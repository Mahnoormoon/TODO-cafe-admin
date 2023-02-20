import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import TotalUsersCard from './TotalUsersCard';
import UserProfileCard from './TotalUserProfileCard';
import TotalMusicPlayerCard from './TotalMusicPlayerCard';
import TotalStudyMethodsCard from './TotalStudyMethodsCard';
import TotalReminderCard from './TotalReminderCard';
import TotalWidgetsCard from './TotalWidgetsCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
import config from '../../../config';

// ==============================|| DEFAULT DASHBOARD ||============================== //

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
        setLoading(false);
    }, []);
    
    const [userprofileList, setUserprofileList] = useState([]);

    const fetchUserprofiles = async () => {
        const res = await fetch(url + '/userprofile/getall');
        const data = await res.json();
        setUserprofileList(data.result);
        console.log(data);
    };

    const [userprofileLoading, setUserProfileLoading] = useState(true);
    useEffect(() => {
        fetchUserprofiles();
        setLoading(false);
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
        setLoading(false);
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
        setLoading(false);
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
        setLoading(false);
    }, []); 

    const [widgetList, setWidgetList] = useState([]);

    const fetchWidgets = async () => {
        const res = await fetch(url + '/widget/getall');
        const data = await res.json();
        setWidgetList(data.result);
        console.log(data);
    };

    const [widgetLoading, setWidgetLoading] = useState(true);
    useEffect(() => {
        fetchWidgets();
        setLoading(false);
    }, []); 

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalUsersCard cardValue={userList.length} isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                         <UserProfileCard userValue={userprofileList.length} isLoading={isLoading} /> 
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalMusicPlayerCard musicValue={musiclistenList.length} isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalStudyMethodsCard studyValue={studymethodList.length} isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalReminderCard reminderValue={reminderList.length} isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalWidgetsCard widgetValue={widgetList.length} isLoading={isLoading} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <TotalGrowthBarChart isLoading={isLoading} />
                    </Grid>
                    /*<Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid>*/
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
