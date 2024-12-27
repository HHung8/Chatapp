
import { Grid, IconButton, Paper, Typography, useTheme } from "@mui/material";
import CustomTextField from "../../Custom/CustomTextField";
import CustomButton from "../../Custom/CustomButton";
import useAuth from "../../hooks/useAuth";
import React from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const SignUp = () => {
    const theme = useTheme();
    const {handleSignup, handleSignupDataChange, signupData, loading} = useAuth();

    return (
        <Grid container justifyContent="center" alignItems="center">
            <Grid container flexDirection="column" gap={2} sx={{width:{xs:'300px', sm:'400px', md:'500px'}}} component={Paper} variant="elevation" p={{xs:2, sm:4, md:8}}>
                <Typography variant="h5" color={theme.palette.text.secondary}>SignUp</Typography>
                <CustomTextField 
                    placeholder="Enter your FullName" 
                    label="Full Name" 
                    required size="small" 
                    type="text" 
                    value={signupData?.fullName}
                    onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >) => {
                        handleSignupDataChange({key:"fullName", value:event.target.value});
                    }}
                />
                <CustomTextField 
                    placeholder="Enter your Email" 
                    label="Email" 
                    required size="small" 
                    type="email" 
                    value={signupData?.email}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        handleSignupDataChange({key:"email", value:event.target.value});
                    }}
                />
                <CustomTextField 
                    placeholder="Enter your Password" 
                    label="Password" 
                    required size="small" 
                    type={signupData?.showP ? "text" : "password"} 
                    value={signupData?.password}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        handleSignupDataChange({key:"password", value:event.target.value});
                    }}
                    InputProps={{
                        endAdornment:(
                            <IconButton onClick={() => {
                                handleSignupDataChange({
                                    key: "showP",
                                    value: !signupData?.showP,
                                })
                            }}>
                                {signupData?.showP ? <VisibilityIcon /> : <VisibilityOffIcon/>}
                            </IconButton>
                        ),
                    }}
                />
                <CustomTextField 
                    placeholder="Confirm your Password" 
                    label="Confirm Password" 
                    required size="small" 
                    value={signupData?.cPassword}
                    type={signupData?.showCP ? "text" : "password"}
                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
                        handleSignupDataChange({key:"cPassword", value:event.target.value});
                    }}
                    InputProps={{
                        endAdornment:(
                            <IconButton onClick={() => {
                                handleSignupDataChange({
                                    key:"showCP",
                                    value: !signupData?.showCP,
                                })
                            }}>
                                {signupData?.showCP ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                        )
                    }}
                />
                <CustomButton 
                    loading={loading === 'signup'} 
                    disabled={loading === 'signup'} 
                    variant="contained"
                    onClick={() => {handleSignup()}}
                >
                    SignUp
                </CustomButton>
            </Grid>
        </Grid>    
    )
}

export default SignUp 