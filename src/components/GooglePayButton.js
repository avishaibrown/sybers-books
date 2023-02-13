import GooglePayButton from "@google-pay/button-react";

const GooglePay = (props) => {
  const {
    amount,
    onCancelHandler,
    shippingOptions,
    unserviceableCountries,
    unserviceableReason,
    shipping,
    shippingType,
    subtotal,
    onTransactionSuccess,
  } = props;

  return (
    <GooglePayButton
      //TODO: Register website with Google Pay Business Console
      //TODO: Change environment attribute on Google Pay component from TEST to PRODUCTION
      environment="TEST"
      paymentRequest={{
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: [
          {
            type: "CARD",
            parameters: {
              allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
              allowedCardNetworks: ["MASTERCARD", "VISA"],
            },
            tokenizationSpecification: {
              type: "PAYMENT_GATEWAY",
              parameters: {
                gateway: "example",
                gatewayMerchantId: "exampleGatewayMerchantId",
                // TODO: Switch to Stipe when going live
                // gateway: "stripe",
                // "stripe:version": "2018-10-31",
                // "stripe:publishableKey": process.env.REACT_APP_STRIPE_API_KEY,
              },
            },
          },
        ],
        //TODO: merchantId issued after registration with the Google Pay and Wallet Console
        merchantInfo: {
          merchantId: "12345678901234567890",
          merchantName: "Syber's Books",
        },
        transactionInfo: {
          totalPriceStatus: "FINAL",
          totalPriceLabel: "Total",
          totalPrice: amount,
          currencyCode: "AUD",
          countryCode: "AU",
          displayItems: [
            {
              label: "Subtotal",
              type: "SUBTOTAL",
              price: subtotal,
            },
            {
              label: "Shipping",
              type: "TAX",
              price: shipping,
            },
          ],
        },
        emailRequired: true,
        shippingAddressRequired: true,
        shippingOptionRequired: true,
        callbackIntents: [
          "SHIPPING_ADDRESS",
          "SHIPPING_OPTION",
          "PAYMENT_AUTHORIZATION",
        ],
        shippingAddressParameters: {
          phoneNumberRequired: true,
        },
        shippingOptionParameters: {
          defaultSelectedOptionId: shippingType,
          shippingOptions: shippingOptions.map((o) => ({
            id: o.id,
            label: o.label,
            description: o.description,
          })),
        },
      }}
      //Invoked when a user has successfully nominated payment details
      onLoadPaymentData={(paymentRequest) => {
        console.log("load payment data", paymentRequest);
      }}
      onReadyToPayChange={(result) => {
        console.log("ready to pay change", result);
      }}
      //Invoked when a user chooses a payment method
      //This callback should be used to validate whether or not the payment method can be used to complete a payment
      onPaymentAuthorized={(paymentData) => {
        console.log("payment authorized", paymentData);
        onTransactionSuccess();
        return {
          transactionState: "SUCCESS",
        };
      }}
      //Invoked when payment the user changes payment data options including payment method, shipping details, and contact details
      //transactionInfo is updated
      onPaymentDataChanged={(paymentData) => {
        if (
          unserviceableCountries.includes(
            paymentData.shippingAddress?.countryCode
          )
        ) {
          return {
            error: {
              reason: "SHIPPING_ADDRESS_UNSERVICEABLE",
              message: unserviceableReason,
              intent: "SHIPPING_ADDRESS",
            },
          };
        }
        return {};
      }}
      style={{ width: 400, height: 60 }}
      buttonSizeMode="fill"
      buttonType={"checkout"}
      onError={(error) => {
        if (error instanceof Error) {
          console.log("Error", error, error.message, error.stack);
        } else {
          console.log("Error", error.statusCode, error.statusMessage);
        }
      }}
      onCancel={onCancelHandler}
    />
  );
};

export default GooglePay;
