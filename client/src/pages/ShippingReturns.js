import { Container, Box } from "@mui/material";
import Typography from "../components/Typography";
import { SHIPPING_AND_RETURNS } from "../utils/constants";

const ShippingReturns = () => {
  return (
    <Container
      component="section"
      sx={{
        mt: { xs: 8, md: 20 },
        mb: { md: 10 },
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h2"
        gutterBottom
        marked="center"
        sx={{
          fontSize: { xs: "2.5rem", md: "3.75rem" },
          mb: { xs: 8, md: 10 },
        }}
      >
        {SHIPPING_AND_RETURNS.title}
      </Typography>
      <Box
        sx={{
          alignItems: "center",
          textAlign: "left",
        }}
        spacing={2}
      >
        <Typography paragraph>
          <b>SHIPPING INFORMATION:</b> Syber's Books ships books anywhere inside
          Australia at a flat rate of $9.99 for standard postage and $15.99 for
          express postage. For countries outside of Australia, a flat-rate
          shipping fee of $39.99AUD applies. Shipping times will vary, however
          you can usually rely on your order to arrive anywhere in Australia
          within 6-11 business days for standard shipping and 1-5 days for
          express shipping. For international orders, please allow 7-21 business
          days.
        </Typography>
        <Typography paragraph>
          <b>PRODUCT RETURNS:</b> Please choose your books carefully; most of
          our books are in as-new condition, but as this is a 2nd-hand book
          store, obviously wear and tear may sometimes be present on your books.
          When this is present we will make our best efforts to ensure a note is
          added to the listing on our website. You are welcome to email us at
          {SHIPPING_AND_RETURNS.email} if you have any doubts about the quality
          of a book prior to purchasing. If you believe the books you’ve
          received are defective, or ask for a refund based as the condition
          isn’t as you expected, please contact {SHIPPING_AND_RETURNS.email}
          and provide a photo and your Order number, which is available in your
          purchase email. We will do everything in our power to come up with a
          solution. If you have received the wrong product in your order, please
          contact us at {SHIPPING_AND_RETURNS.email} with your Order number, and
          we’ll be happy to refund straight away, or exchange for another book
          of equal value.
        </Typography>
        <Typography paragraph>
          <b>RETURN TO SENDER:</b> We will put the delivery address on the
          parcel exactly as it was put on the order form. Please ensure your
          delivery details are correct as our couriers and Auspost won’t
          second-guess it – they’ll just return to us if there’s an error. If
          the parcel returns to us, you can choose to either: a) refund the cost
          of the book minus the freight charge we incurred, or b) pay the
          replacement postage and we will resend the book.
        </Typography>
      </Box>
    </Container>
  );
};

export default ShippingReturns;
