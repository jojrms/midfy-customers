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
} from "@mui/material";
import { DeleteOutline, Visibility, Edit } from "@mui/icons-material";
import { Copyright } from "../../components/Copyright";
import { Customer } from "../../api/types";
import { getCustomers } from "../../api";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const defaultTheme = createTheme();

const Customers = () => {
  const [customers, setCustomers] = React.useState<Customer[]>([]);

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

  React.useEffect(() => {
    getCustomersFunction();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <p>Teste</p>
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
                      key={customer.name}
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
                        <IconButton aria-label="see" size="medium">
                          <Visibility />
                        </IconButton>
                        <IconButton aria-label="edit" size="medium">
                          <Edit />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          size="medium"
                          color="error"
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
    </ThemeProvider>
  );
};

export default Customers;
