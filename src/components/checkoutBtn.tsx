import { Button } from "@/components/ui/button";

function CheckOutBtn({
  handleCheckOut,
  isLoading,
}: {
  handleCheckOut: () => void;
  isLoading: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row ">
      <Button
        onClick={handleCheckOut}
        disabled={isLoading}
        className="cursor-pointer"
      >
        {isLoading ? "Processing..." : "Checkout"}
      </Button>
    </div>
  );
}

export default CheckOutBtn;
