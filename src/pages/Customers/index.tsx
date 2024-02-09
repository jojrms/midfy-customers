import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Toolbar,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Avatar,
  IconButton,
  Drawer,
  TextField,
  Box,
  Typography,
  Modal,
  Button,
} from "@mui/material";
import { Add, DeleteOutline, Edit } from "@mui/icons-material";
import { Copyright } from "../../components/Copyright";
import { Customer } from "../../api/types";
import { deleteCustomer, getCustomers } from "../../api";
import styles from "./style";
import { ActionCustomer } from "./types";
import CustomerForm from "./components/Form";

const defaultTheme = createTheme();

const Customers = () => {
  const [customers, setCustomers] = React.useState<Customer[]>([]);
  const [actionCustomer, setActionCustomer] =
    React.useState<ActionCustomer | null>(null);
  const [createCustomer, setCreateCustomer] = React.useState<boolean>(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getCustomersFunction = async () => {
    try {
      const response = await getCustomers();
      setCustomers(response);
    } catch {
      console.log("error");
    }
  };

  const deleteCustomerFunction = async (id: number | string) => {
    try {
      const response = await deleteCustomer(id);
      setActionCustomer(null);
      getCustomersFunction();
    } catch {
      console.log("error");
    }
  };

  React.useEffect(() => {
    getCustomersFunction();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Button
            sx={styles.addNewUserButton}
            variant="contained"
            endIcon={<Add />}
            onClick={() => setCreateCustomer(true)}
          >
            Criar novo usuário
          </Button>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="right">Nome</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Cargo</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((customer: Customer) => (
                    <TableRow
                      key={customer.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Avatar
                          alt={`${customer.name} photo`}
                          src={customer.avatar}
                        />
                      </TableCell>
                      <TableCell align="right">{customer.name}</TableCell>
                      <TableCell align="right">{customer.email}</TableCell>
                      <TableCell align="right">{customer.jobTitle}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          aria-label="edit"
                          size="medium"
                          onClick={() =>
                            setActionCustomer({
                              action: "edit",
                              customer: customer,
                            })
                          }
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          size="medium"
                          color="error"
                          onClick={() =>
                            setActionCustomer({
                              action: "delete",
                              customer: customer,
                            })
                          }
                        >
                          <DeleteOutline />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={customers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>

      {actionCustomer && (
        <>
          <Drawer
            anchor="right"
            open={actionCustomer.action === "edit"}
            onClose={() => setActionCustomer(null)}
            sx={{ zIndex: 10000 }}
          >
            <Avatar
              alt={`${actionCustomer.customer.name} photo`}
              src={actionCustomer.customer.avatar}
              sx={styles.avatar}
            />

            <Typography
              component="h1"
              variant="h5"
              color="inherit"
              noWrap
              textAlign="center"
              sx={styles.customerName}
            >
              {actionCustomer.customer.name}
            </Typography>

            <Box component="form" autoComplete="off">
              <TextField
                id="outlined-edit-email"
                label="E-mail"
                type="email"
                defaultValue={actionCustomer.customer.email}
              />
              <TextField
                id="outlined-edit-jobTitle"
                label="Cargo"
                type="text"
                defaultValue={actionCustomer.customer.jobTitle}
              />
            </Box>
          </Drawer>

          <Modal
            open={actionCustomer.action === "delete"}
            onClose={() => setActionCustomer(null)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styles.modal}>
              <Typography
                id="modal-modal-title"
                variant="h5"
                fontWeight="bold"
                component="h1"
              >
                Excluir colaborador
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                component="p"
              >
                Você tem certeza que deseja excluir o colaborador{" "}
                <b>{actionCustomer.customer.name}</b>?
              </Typography>

              <Grid
                container
                alignItems="center"
                justifyContent="space-around"
                sx={styles.buttonsGrid}
              >
                <Button
                  onClick={() => setActionCustomer(null)}
                  variant="text"
                  size="medium"
                  color="inherit"
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  size="medium"
                  color="error"
                  endIcon={<DeleteOutline />}
                  onClick={() =>
                    deleteCustomerFunction(actionCustomer.customer.id)
                  }
                >
                  Excluir
                </Button>
              </Grid>
            </Box>
          </Modal>
        </>
      )}

      <CustomerForm
        setCreateCustomer={setCreateCustomer}
        createCustomer={createCustomer}
      />
    </ThemeProvider>
  );
};

export default Customers;
