import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Typography } from '@mui/material';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import { useNavigate } from 'react-router-dom';

// ==============================|| DRAWER HEADER ||============================== //

const DrawerHeader = ({ open }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <DrawerHeaderStyled theme={theme} open={open}>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        <Typography variant='h5'>EVENT HUB</Typography>
      </Stack>
    </DrawerHeaderStyled>
  );
};

DrawerHeader.propTypes = {
  open: PropTypes.bool
};

export default DrawerHeader;
