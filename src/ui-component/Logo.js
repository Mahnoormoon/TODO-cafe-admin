// material-ui
import { useTheme } from '@mui/material/styles';
import logo from 'assets/images/ToDoCafe_Logo.png';


/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        <>
            <img style={{ width: 50 }} src={logo} alt="logoerr" width="100" />
            &nbsp;&nbsp;&nbsp;<h3>ToDoCafe'</h3>
        </>
    );
};

export default Logo;
