import { useEffect, useRef, useState } from "react";
import CartButton from "./CartButton";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  IconButton,
  Tabs,
  Tab,
  Box,
  Stack,
  Grid,
  Paper,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import Typography from "./Typography";
import { getBookDetailsData } from "../utils/util";
import { SHOP } from "../utils/constants";

const BookModal = (props) => {
  const {
    open,
    setOpen,
    book,
    onCartAction,
    loading,
    addToCart,
    missingValuesText,
    modalTabs,
    disabled,
  } = props;

  const [tabIndex, setTabIndex] = useState(0);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const descriptionElementRef = useRef(null);

  const onClose = () => {
    !loading && setOpen(false);
  };

  const onTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        scroll={"paper"}
        aria-labelledby="book-modal-dialog"
        aria-describedby="book-modal-description"
        fullWidth={true}
        maxWidth="lg"
        fullScreen={fullScreen}
      >
        <DialogTitle id="book-modal-title">
          <Stack
            direction="row"
            alignItems="stretch"
            justifyContent="space-between"
            spacing={1}
          >
            <Box maxWidth={{ xs: 400, sm: 600, md: "none" }}>
              <Typography variant="h5" gutterBottom>
                {book.TITLE ? book.TITLE : missingValuesText.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {book.AUTHOR ? book.AUTHOR : missingValuesText.author}
              </Typography>
            </Box>
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                display: "inline-block",
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
              size="large"
            >
              <Close />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent
          dividers
          sx={{
            background: "linear-gradient(to bottom, #D2F7FE 0%, #FFFFFF 100%)",
          }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={4}
              sx={{
                float: "center",
                display: "flex",
                margin: "auto",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                sx={{
                  width: 300,
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: "0.25rem",
                  overflow: "hidden",
                }}
                src={
                  book["IMAGE URL"] === ""
                    ? "./images/no-image-found.jpg"
                    : book["IMAGE URL"]
                }
                alt={book.TITLE}
                onError={(event) => {
                  event.target.onerror = null;
                  event.target.src = "./images/no-image-found.jpg";
                }}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={tabIndex}
                    onChange={onTabChange}
                    aria-label="book modal tabs"
                  >
                    <Tab
                      label={modalTabs[0]}
                      id={"tab-0"}
                      aria-controls={"tabpanel-0"}
                    />
                    <Tab
                      label={modalTabs[1]}
                      id={"tab-1"}
                      aria-controls={"tabpanel-1"}
                    />
                  </Tabs>
                </Box>
                <TabPanel value={tabIndex} index={0}>
                  <TableContainer component={Paper}>
                    <Table size="small" aria-label="book details table">
                      <TableBody>
                        {getBookDetailsData(book).map((row, index) => (
                          <TableRow
                            key={"modal-book-attribute-" + index}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              sx={{ fontWeight: 700 }}
                            >
                              {row.attribute}
                            </TableCell>
                            <TableCell align="right">{row.value}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabPanel>
                <TabPanel value={tabIndex} index={1}>
                  <DialogContentText
                    id="book-modal-description-tab1"
                    ref={descriptionElementRef}
                    tabIndex={-1}
                  >
                    {book.DESCRIPTION}
                  </DialogContentText>
                </TabPanel>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ mx: "auto", my: 1 }}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress size={30} />
            </Box>
          ) : disabled ? (
            <Box
              sx={{
                fontWeight: "bold",
                color: "#fff",
                backgroundColor: "#e57373",
                py: 1,
                px: 3,
                borderRadius: "0.25rem",
                float: "right",
              }}
            >
              <Typography variant="subtitle1">{SHOP.soldText}</Typography>
            </Box>
          ) : (
            <CartButton
              addToCart={addToCart}
              onCartAction={onCartAction}
              book={book}
              isIcon={false}
              price={book.PRICE}
            />
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BookModal;
