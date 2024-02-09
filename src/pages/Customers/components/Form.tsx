import { Box, Button, Grid, Modal, Typography } from "@mui/material";
import { CustomerFormType } from "./types";
import { DeleteOutline } from "@mui/icons-material";
import styles from "./style";

const CustomerForm = ({
  createCustomer,
  setCreateCustomer,
}: CustomerFormType) => {
  return (
    <Modal
      open={createCustomer}
      onClose={() => setCreateCustomer(false)}
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
          Criar colaborador
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }} component="p">
          Você tem certeza que deseja excluir o colaborador{" "}
        </Typography>

        <Grid
          container
          alignItems="center"
          justifyContent="space-around"
          sx={styles.buttonsGrid}
        >
          <Button
            onClick={() => setCreateCustomer(false)}
            variant="text"
            size="medium"
            color="inherit"
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            size="medium"
            color="success"
            endIcon={<DeleteOutline />}
          >
            Finalizar
          </Button>
        </Grid>
      </Box>
    </Modal>
  );
};

export default CustomerForm;
