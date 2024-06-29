import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [userList, setUserList] = useState([]);

  const [assetsList,setAssetsList]=useState([])

  const [positionList, setPositionList] = useState([
    {
      value: 'user',
      label: 'کاربر',
    },
    {
      value: 'employee',
      label: 'کارمند',
    },
    {
      value: 'manager',
      label: 'مدیر',
    },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

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
  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userList.map((n) => n.attributes.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    console.log('show index', selectedIndex);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    console.log('show event', event.target.value);
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: userList,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  // const getUsers = () => {

  // };

  const getUsers=()=>{
    fetch('http://localhost:1337/api/tableuser', {
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data.data);
        setUserList(data.data);
        console.log('setUserList', userList);
      });
  }

  const getAssets=()=>{
    fetch('http://localhost:1337/api/assets-tables', {
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
    getUsers()
    getAssets()

  }, []);

  const [form, setForm] = useState({
    Uname: null,
    Uposition: null,
    Ustatus: null,
    Uassets: null,
  });

const addUser=()=>{
  console.log("form",form)
  axios.post("http://localhost:1337/api/tableuser",{data:form}).then(res => {
          
    handleClose()
    getUsers()
}).catch(e =>  console.log("show me err",e))
}
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">کاربران</Typography>

        <Button
          variant="contained"
          color="inherit"
          onClick={handleOpen}
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          کاربر جدید
        </Button>
      </Stack>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={userList.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'نام' },
                  { id: 'position', label: 'سمت' },
                  { id: 'assets', label: 'اموال' },
                  { id: 'status', label: 'وضعیت' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.attributes.id}
                      name={row.attributes.Uname}
                      position={row.attributes.Uposition}
                      status={row.attributes.Ustatus}
                      assets={row.attributes.Uassets}
                      avatarUrl={row.avatarUrl}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, userList.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={userList.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

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
                  <label>نام کاربری</label>
                  <TextField
                    sx={{ textAlign: 'right', width: '100%', my: 2 }}
                    size="small"
                    variant="outlined"
                    onChange={(e)=>{setForm({...form,Uname:e.target.value})}}
                  />
                </div>
                <div>
                  <label>سمت :</label>
                  <TextField defaultValue={''} size='small' onChange={(e)=>{setForm({...form,Uposition:e.target.value})}} select sx={{ textAlign: 'right', width: '100%', my: 2 }}>
                    {positionList.map((option, index) => (
                      <MenuItem key={index} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <div>
                  <label>اموال :</label>
                  <TextField defaultValue={''} size='small' select onChange={(e)=>{setForm({...form,Uassets:e.target.value})}} sx={{ textAlign: 'right', width: '100%', my: 2 }}>
                    {assetsList.map((asset, index) => (
                      <MenuItem key={index} value={asset.attributes.Aname}>
                        {asset.attributes.Aname}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                   <div>
                  <label>وضعیت :</label>
                  <TextField defaultValue={''} size='small' onChange={(e)=>{setForm({...form,Ustatus:e.target.value})}} select sx={{ textAlign: 'right', width: '100%', my: 2 }}>
                  
                      <MenuItem  value={false}>
                        غیرفعال
                      </MenuItem>
                   
                      <MenuItem  value={true}>
                        فعال
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
