import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../../utils/api';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    password: '',
  });
  const [formCompleted, setFormCompleted] = useState(false);

  useEffect(() => {
    const isFormCompleted =
      formData.first_name !== '' &&
      formData.last_name !== '' &&
      formData.email !== '' &&
      formData.mobile !== '';

    setFormCompleted(isFormCompleted);
  }, [formData]);

  const handleChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleClick = async () => {
    try {
      const response = await axios.post('/register', formData);
      
      console.log(response.data ,"hlooooo");
      navigate('/otp', { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField name="first_name" label="First Name" value={formData.first_name} onChange={handleChange} />
        <TextField name="last_name" label="Last Name" value={formData.last_name} onChange={handleChange} />
        <TextField name="email" label="Email address" value={formData.email} onChange={handleChange} />
        <TextField name="mobile" label="Mobile" value={formData.mobile} onChange={handleChange} />

        {/* <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        /> */}
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClick}
        disabled={!formCompleted} // Disable the button if the form is not completed
      >
        Register
      </LoadingButton>
    </>
  );
}
