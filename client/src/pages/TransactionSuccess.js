import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetCartState, markBooksAsSold } from "../slices/cart";
import { resetSearchResultsState } from "../slices/searchResults";
import { Container } from "@mui/material";
import InfoActionBox from "../components/InfoActionBox";
import { SUCCESS } from "../utils/constants";

const TransactionSuccess = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const cart = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();

  const onTransactionSuccess = useCallback(
    async (bookIds, email, orderNo) => {
      try {
        dispatch(
          markBooksAsSold({
            bookIds: bookIds,
            buyerEmail: email,
            orderNumber: orderNo,
          })
        );
        dispatch(resetCartState());
        dispatch(resetSearchResultsState());
      } catch (error) {
        console.error(error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    //scroll to top when page is navigated to
    window.scrollTo(0, 0);

    const url = new URL(window.location.href);
    const sessionId = url.searchParams.get("session_id");

    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_PROD_URL}/success?session_id=${sessionId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = await response.json();
      if (response.ok) {
        setTitle(`Congratulations ${json.customerName}!`);
        setMessage([
          `Your order was successfully placed. A confirmation email has been sent to ${json.customerEmail}. Please allow up to 30 minutes for the email to arrive.`,
          `Your receipt number is ${
            json.customerReceiptNumber ?? json.customerOrderNumber
          }.`,
        ]);

        const cartBookIds = cart.map((book) => book.SERIAL);
        onTransactionSuccess(
          cartBookIds,
          json.customerEmail,
          json.customerReceiptNumber ?? json.customerOrderNumber
        );
      } else {
        console.error(json.message);
        setTitle(SUCCESS.title);
        setMessage(SUCCESS.message);
      }
    };

    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container
      component="section"
      sx={{
        mt: 8,
        alignItems: "center",
        textAlign: "center",
      }}
      disableGutters
      maxWidth={false}
    >
      <InfoActionBox
        title={title}
        infoText={message}
        buttonText={SUCCESS.redirectLinkText}
        navigateTo={SUCCESS.redirectLink}
      />
    </Container>
  );
};

export default TransactionSuccess;
