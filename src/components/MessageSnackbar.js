import { Snackbar, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const MessageSnackbar = (props) => {
  const { open, onClose, onBlur, message } = props;

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={open}
      onClose={onBlur}
      sx={{ height: 100 }}
      message={message}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <Close fontSize="small" />
        </IconButton>
      }
    />
  );
};

export default MessageSnackbar;
