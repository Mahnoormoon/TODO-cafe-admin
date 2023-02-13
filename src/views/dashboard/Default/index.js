import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import TotalUsersCard from './TotalUsersCard';
import ToDoListCard from './TotalToDoListCard';
import TotalMusicPlayerCard from './TotalMusicPlayerCard';
import TotalStudyMethodsCard from './TotalStudyMethodsCard';
import TotalReminderCard from './TotalReminderCard';
import TotalWidgetsCard from './TotalWidgetsCard';
import PopularCard from './PopularCard';
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

    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        fetchUsers();
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <ToDoListCard cardValue={userList.length} isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalUsersCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalMusicPlayerCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalStudyMethodsCard isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalReminderCard isLoading={isLoading} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalWidgetsCard isLoading={isLoading} />
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
                    <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
