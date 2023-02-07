// material-ui
import { useTheme } from '@mui/material/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {
    const theme = useTheme();

    return (
        <>
            <img style={{ width: 30 }} src={'https://s3.amazonaws.com/ionic-marketplace/todo-app-theme/icon.png'} alt="Berry" width="100" />
            &nbsp;&nbsp;<h3>TODO-Cafe</h3>
        </>
    );
};

export default Logo;
