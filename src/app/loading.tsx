import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full py-10">
      <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
    </div>
  );
};

export default Loading;
