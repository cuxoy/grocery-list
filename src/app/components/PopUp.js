import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Checkbox,
  Button,
  Typography,
  DialogActions,
} from "@mui/material";

const PopUp = ({
  isPopupOpen,
  handleClosePopup,
  modalText,
  modalPrice,
  modalIsBought,
  handleEditItem,
  handleDeleteSelectedItem,
  setModalText,
  setModalPrice,
  setModalIsBought,
}) => {
  return (
    <Dialog open={isPopupOpen} onClose={handleClosePopup}>
      <DialogTitle>Edit Item</DialogTitle>
      <DialogContent
        style={{
          padding: 20,
        }}
      >
        <TextField
          label="Item Name"
          value={modalText}
          onChange={(e) => {
            setModalText(e.target.value);
          }}
          fullWidth
        />
        <TextField
          label="Item Price"
          type="number"
          value={modalPrice}
          onChange={(e) => setModalPrice(e.target.value)}
          fullWidth
          style={{ marginTop: 10 }}
        />
        <Checkbox
          checked={modalIsBought}
          onChange={(e) => setModalIsBought(e.target.checked)}
          color="primary"
        />
        <Typography variant="body1">Is Bought</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditItem} color="primary">
          Save
        </Button>
        <Button onClick={handleDeleteSelectedItem} color="primary">
          Delete
        </Button>
        <Button onClick={handleClosePopup} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopUp;
