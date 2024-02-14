import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Toolbar, useMediaQuery } from '@mui/material';

// project import
import Drawer from './Drawer';
import Header from './Header';
import { withAuthGuard } from '../../hocs/with-auth-guard';

// ==============================|| MAIN LAYOUT ||============================== //

const Layout = withAuthGuard(({ children }) => {
  const theme = useTheme();
  const matchDownLG = useMediaQuery(theme.breakpoints.down('lg'));
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.SettingsReducer);

  // drawer toggler
  const [open, setOpen] = useState(settings.drawerOpen);
  const handleDrawerToggle = () => {
    setOpen(!open);
    dispatch({
      type: "CHANGE_LAYOUT",
      payload: { ...settings, drawerOpen: !open },
    });
  };

  // set media wise responsive drawer
  useEffect(() => {
    setOpen(!matchDownLG);
    dispatch({
      type: "CHANGE_LAYOUT",
      payload: { ...settings, drawerOpen: !matchDownLG },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownLG]);

  useEffect(() => {
    if (open !== settings.drawerOpen) setOpen(settings.drawerOpen);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Header open={open} handleDrawerToggle={handleDrawerToggle} />
      <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
      <Box component="main" sx={{ width: '100%', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
});

export default Layout;
