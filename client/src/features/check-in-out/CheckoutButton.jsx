import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();
  console.log("checkout button", bookingId);
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkout({ bookingId })}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
