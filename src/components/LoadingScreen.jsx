import { BounceLoader } from "react-spinners";

function LoadingScreen() {
  return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <BounceLoader size={70} color={"#64c3c8"} />
    </div>
  );
}

export default LoadingScreen;
