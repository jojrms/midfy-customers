import {
  Avatar,
  Button,
  Drawer,
  Grid,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import { EditCustomerType } from "./types";
import styles from "./style";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { updateCustomer } from "../../../../api";
import { Edit } from "@mui/icons-material";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("E-mail inválido")
    .required("O e-mail é obrigatório"),
  jobTitle: Yup.string().required("O cargo é obrigatório"),
});

const EditCustomer = ({
  actionCustomer,
  setActionCustomer,
}: EditCustomerType) => {
  const initialValues = {
    email: actionCustomer.customer.email,
    jobTitle: actionCustomer.customer.jobTitle,
  };

  const handleSubmit = async (values: any) => {
    try {
      await updateCustomer(actionCustomer.customer.id, values);
    } catch (error) {
      console.error("Erro ao criar usuário");
    }
  };

  return (
    <Drawer
      anchor="right"
      open={actionCustomer.action === "edit"}
      onClose={() => setActionCustomer(null)}
      sx={{ zIndex: 10000 }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <Grid sx={styles.gridForm}>
              <Grid item>
                <Avatar
                  alt={`${actionCustomer.customer.name} photo`}
                  src={actionCustomer.customer.avatar}
                  sx={styles.avatar}
                />
              </Grid>

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
              <Grid item sx={{ width: "20vw" }}>
                <Field
                  as={TextField}
                  name="email"
                  label="E-mail"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="email" />
              </Grid>
              <Grid item sx={{ width: "20vw", mt: 2 }}>
                <Field
                  as={TextField}
                  name="jobTitle"
                  label="Cargo"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage name="email" />
              </Grid>

              <Grid
                item
                display="grid"
                alignItems="center"
                justifyItems="end"
                mt={2}
              >
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  endIcon={<Edit />}
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  Editar Usuário
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Drawer>
  );
};

export default EditCustomer;
