import { Grid, IconButton, Paper, Typography, useTheme } from '@mui/material'
import React from 'react'
import CustomTextField from '../../Custom/CustomTextField';
import CustomButton from '../../Custom/CustomButton';
import useAuth from '../../hooks/useAuth';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const theme = useTheme();    
  const {loading, loginData, handleLoginDataChange, handleLogin} = useAuth();

  return (
    <Grid container justifyContent="center" alignItems="center">
        <Grid container flexDirection="column" gap={2} sx={{width:{xs:'300px', sm:'400px', md:'500px'}}} component={Paper} variant='elevation' p={{xs:2, sm:4 , md:8}}>
            <Typography variant='h5' color={theme.palette.text.secondary}>Sign In</Typography>
            <CustomTextField 
              placeholder='Enter your Email' 
              label="Email" 
              required size="small" 
              type='email'
              value={loginData?.email}
              onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                handleLoginDataChange({
                  key:'email',
                  value: event.target.value
                })
              }}
            />
            <CustomTextField 
              placeholder='Enter your Password' 
              label="Password" 
              required size="small" 
              type={loginData?.showP ? "text" : "password"}
              value={loginData?.password}
              onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                handleLoginDataChange({
                  key:'password',
                  value: event.target.value
                })
              }}
              InputProps={{
                endAdornment:(
                  <IconButton
                    onClick={() => {
                      handleLoginDataChange({
                        key:'showP',
                        value: !loginData?.showP,
                      })
                    }}
                  >
                      {loginData?.showP ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                )
              }}
            />
            <CustomButton 
              loading={loading === "login"} 
              disabled={loading === "login"} 
              variant='contained'
              onClick={() => handleLogin()}
            >
                Sign In
            </CustomButton>
        </Grid>
    </Grid>
  )
}

export default Login