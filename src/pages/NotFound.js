
import { Container, Typography } from '@mui/material';






const NotFound = () => {

    return (
        <Container maxWidth="sm" style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Tidak Ditemukan
            </Typography>
            <Typography variant="body1" component="p">
                Maaf, Resource yang Anda cari tidak ditemukan.
            </Typography>
            {/* Anda bisa menambahkan desain atau komponen tambahan di sini */}
        </Container>
    );
}

export default NotFound;