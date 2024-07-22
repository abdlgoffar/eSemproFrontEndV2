
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login } from '../api/users';
import { useSession } from '../contexts/SessionContext';
import { Navigate } from 'react-router-dom';
import { CircularProgress, MenuItem, Select } from '@mui/material';

const roleList = [
    { id: 1, value: "examiners", name: "Dosen Penguji" },
    { id: 2, value: "coordinators", name: "Dosen Koordinator" },
    { id: 3, value: "supervisors", name: "Dosen Pembimbing" },
    { id: 4, value: "head-study-programs", name: "Kaprodi" },
    { id: 5, value: "students", name: "Mahasiswa" },
    { id: 6, value: "academic-administrations", name: "BAA" },
]


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright ©STIKI Malang '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();


export default function Login() {

    const [loading, setLoading] = React.useState(false);
    const { saveToken, token } = useSession();
    const [error, setError] = React.useState(false);
    const [errorMessages, setErrorMessages] = React.useState([]);
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [role, setRole] = React.useState("");
    const [roleLogin, setRoleLogin] = React.useState("");
    const [redirectToReferrer, setRedirectToReferrer] = React.useState(false);

    React.useEffect(() => {
        if (error === true) {
            setTimeout(() => {
                setError(false);

            }, 2000);
        }
    }, [error]);

    async function loginSubmit(e) {
        e.preventDefault();

        setLoading(true);

        const body = {
            "username": username,
            "password": password,
            "role": roleLogin
        }

        try {
            let response = await login(body);
            saveToken(response.data.token);
            setRole(response.data.role);
            setRedirectToReferrer(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            if (error.response) {
                setError(true);
                setErrorMessages(error.response.data.errors.messages);
            } else if (error.request) {
                console.log('The request was made but no response was received');
            } else {
                console.log('Error', error.message);
            }
        }

    }

    if (redirectToReferrer && token) {
        switch (role) {
            case "students":
                return <Navigate to="/students/proposal" />;
            case "examiners":
                return <Navigate to="/examiners/proposal" />;
            case "supervisors":
                return <Navigate to="/supervisors/proposal" />;
            case "coordinators":
                return <Navigate to="/coordinators/proposal" />;
            case "head-study-programs":
                return <Navigate to="/head-study-programs/proposal" />;
            case "academic-administrations":
                return <Navigate to="/academic-administrations/user" />;
            default:
                return <Navigate to="/" />;
        }
    } else {

    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Selamat Datang
                    </Typography>
                    <Box component="form" onSubmit={loginSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={Array.isArray(error) ? error.length > 0 : Boolean(error && (errorMessages.username || errorMessages.account_not_found))}
                            helperText={Array.isArray(error) ? error.join(', ') : error && (errorMessages.username || errorMessages.account_not_found)}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={Array.isArray(error) ? error.length > 0 : Boolean(error && (errorMessages.password || errorMessages.account_not_found))}
                            helperText={Array.isArray(error) ? error.join(', ') : error && (errorMessages.password || errorMessages.account_not_found)}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Select
                            fullWidth
                            sx={{ mt: 2 }}
                            defaultValue={""}
                            onChange={e => setRoleLogin(e.target.value)}
                        >
                            {
                                roleList.map((v, i) => (
                                    <MenuItem key={i} value={`${v.value}`}>{v.name}</MenuItem>
                                ))
                            }
                        </Select>
                        <Typography sx={{ color: "red" }} component={"span"}>{error && errorMessages.role}</Typography>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {loading ? <CircularProgress sx={{ color: "white" }} size={24} /> : "Login"}
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>

    );
}
