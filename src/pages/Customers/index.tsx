import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Copyright } from "../../components/Copyright";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Customer } from "../../api/types";
import { getCustomers } from "../../api";
import { Avatar, Button } from "@mui/material";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];
const defaultTheme = createTheme();

const Customers = () => {
  const [customers, setCustomers] = React.useState<Customer[]>([]);

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
                {customers.map((customer: Customer) => (
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
                      <Button variant="text">Excluir</Button>
                      <Button variant="text">Editar</Button>
                      <Button variant="text">Ver</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Customers;
