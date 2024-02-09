import {
  Box,
  Button,
  Grid,
  IconButton,
  Input,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { CustomerFormType } from "./types";
import { Done, Photo } from "@mui/icons-material";
import styles from "./style";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { createNewCustomer } from "../../../../api";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("O nome é obrigatório"),
  email: Yup.string()
    .email("E-mail inválido")
    .required("O e-mail é obrigatório"),
  jobTitle: Yup.string().required("O cargo é obrigatório"),
  avatar: Yup.mixed().required("A foto é obrigatória"),
});

const CustomerForm = ({
  createCustomer,
  setCreateCustomer,
}: CustomerFormType) => {
  const initialValues = {
    name: "",
    email: "",
    avatar: null,
    jobTitle: "",
  };

  const handleSubmit = async (values: any) => {
    try {
      await createNewCustomer(values);
    } catch (error) {
      console.error("Erro ao criar usuário");
    }
  };

  return (
    <Modal
      open={createCustomer}
      onClose={() => setCreateCustomer(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <Box sx={styles.modal}>
              <Typography
                id="modal-modal-title"
                variant="h5"
                fontWeight="bold"
                component="h1"
                mb={4}
              >
                Criar colaborador
              </Typography>

              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Field name="avatar">
                    {({ form, field }: any) => (
                      <div>
                        <input
                          accept="image/*"
                          id="icon-button-file"
                          type="file"
                          style={{ display: "none" }}
                          onChange={(event) => {
                            event.currentTarget.files &&
                              form.setFieldValue(
                                field.name,
                                event.currentTarget.files[0]
                              );
                          }}
                        />
                        <label htmlFor="icon-button-file">
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            sx={styles.fakeAvatar} // Certifique-se de que `styles.fakeAvatar` está definido corretamente
                          >
                            <Photo />
                          </IconButton>
                        </label>
                        {form.values.avatar && (
                          <div
                            style={{ display: "grid", justifyItems: "center" }}
                          >
                            <img
                              src={URL.createObjectURL(form.values.avatar)}
                              alt="Avatar"
                              style={{ maxWidth: 100, maxHeight: 100 }}
                            />
                            <Typography variant="body2">
                              {form.values.avatar.name}
                            </Typography>
                          </div>
                        )}
                        <ErrorMessage name={field.name} />
                      </div>
                    )}
                  </Field>
                  <ErrorMessage name="avatar" />
                </Grid>
                <Grid item>
                  <Field
                    as={TextField}
                    name="name"
                    label="Nome"
                    variant="outlined"
                    fullWidth
                  />
                  <ErrorMessage name="name" />
                </Grid>
                <Grid item>
                  <Field
                    as={TextField}
                    name="email"
                    label="E-mail"
                    variant="outlined"
                    fullWidth
                  />
                  <ErrorMessage name="email" />
                </Grid>
                <Grid item>
                  <Field
                    as={TextField}
                    name="jobTitle"
                    label="Cargo"
                    variant="outlined"
                    fullWidth
                  />
                  <ErrorMessage name="jobTitle" />
                </Grid>
              </Grid>

              <Grid
                container
                alignItems="center"
                justifyContent="space-around"
                sx={styles.buttonsGrid}
              >
                <Grid item>
                  <Button
                    onClick={() => setCreateCustomer(false)}
                    variant="text"
                    size="medium"
                    color="inherit"
                  >
                    Cancelar
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    size="medium"
                    color="success"
                    endIcon={<Done />}
                    type="submit"
                    disabled={formik.isSubmitting}
                  >
                    Finalizar
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default CustomerForm;
