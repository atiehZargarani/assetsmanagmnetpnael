import { useState , useEffect} from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
// import { products } from 'src/_mock/products';
import Modal from '@mui/material/Modal';
import ProductCard from '../product-card';
import Iconify from 'src/components/iconify';
import ProductCartWidget from '../product-cart-widget';
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const [openFilter, setOpenFilter] = useState(false);
  
  const [assetsList,setAssetsList]=useState([]);

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  // const handleOpenFilter = () => {
  //   setOpenFilter(true);
  // };

  // const handleCloseFilter = () => {
  //   setOpenFilter(false);
  // };


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    round: 5,
    boxShadow: 24,
    p: 4,
  };

  const getAssets=()=>{
    fetch('http://localhost:1337/api/assets-tables?populate=*', {
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data.data);
        setAssetsList(data.data);
       
      });
  }

  
  useEffect(() => {
   
    getAssets()

  }, []);


  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Products
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="flex-end"
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
        <Button
          variant="contained"
          color="inherit"
          onClick={handleOpen}
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
        اضافه کردن
      </Button>
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {assetsList.map((asset) => (
          <Grid key={asset.id} xs={12} sm={6} md={3}>
            <ProductCard asset={asset} />
          </Grid>
        ))}
      </Grid>

      <ProductCartWidget />


      {openModal && (
        <div>
          {/* <Button onClick={handleOpen}>Open modal</Button> */}
          <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <FormControl defaultValue="" required>
                <div>
                  <label>نام :</label>
                  <TextField
                    sx={{ textAlign: 'right', width: '100%', my: 2 }}
                    size="small"
                    variant="outlined"
                    onChange={(e)=>{setForm({...form,Aname:e.target.value})}}
                  />
                </div>
           
                   <div>
                  <label>وضعیت :</label>
                  <TextField defaultValue={''} size='small' onChange={(e)=>{setForm({...form,Ainventory:e.target.value})}} select sx={{ textAlign: 'right', width: '100%', my: 2 }}>
                  
                      <MenuItem  value={false}>
                       عدم موجودی
                      </MenuItem>
                   
                      <MenuItem  value={true}>
                        موجود
                      </MenuItem>
                  </TextField>
                </div>
                <div style={{display:"flex",justifyContent:"left"}}>
                  <Button className='px-5' color='success' variant="contained" onClick={addUser}>
                  ثبت
                </Button>
                </div>
              </FormControl>
            </Box>
          </Modal>
        </div>
      )}

    </Container>
  );
}
