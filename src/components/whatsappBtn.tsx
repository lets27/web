import { Button } from "@/components/ui/button";
import { FaWhatsapp } from "react-icons/fa";

function WhatsAppBtn({
  handleOrder,
  isLoading,
}: {
  handleOrder: () => void;
  isLoading: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button
        onClick={handleOrder}
        disabled={isLoading}
        className=" cursor-pointer bg-[#25D366] text-white hover:bg-[#1ebe5d] flex items-center gap-2 px-4 py-2 rounded-2xl transition"
      >
        <FaWhatsapp size={20} />
        {isLoading ? "Processing..." : "WhatsApp Order"}
      </Button>
    </div>
  );
}

export default WhatsAppBtn;
