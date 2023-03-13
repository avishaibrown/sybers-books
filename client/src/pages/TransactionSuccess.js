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

    fetch("http://localhost:4000/success", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId: sessionId,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        setTitle(`Congratulations ${data.customerName}!`);
        setMessage([
          `Your order was successfully placed. A confirmation email has been sent to ${data.customerEmail}. Please allow up to 30 minutes for the email to arrive.`,
          `Your receipt number is ${data.customerReceiptNumber}.`,
        ]);

        const cartBookIds = cart.map((book) => book.SERIAL);
        onTransactionSuccess(
          cartBookIds,
          data.customerEmail,
          data.customerReceiptNumber
        );
      })
      .catch((error) => {
        console.error(error.message);
        setTitle(SUCCESS.title);
        setMessage(SUCCESS.message);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container
      component="section"
      sx={{
        mt: { xs: 8 },
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
