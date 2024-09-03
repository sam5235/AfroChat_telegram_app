import { useState } from "react";
import { TextBar } from "../../components/InputTextFields";
import { useGetAIModelsQuery } from "../../services/apiSlices";
import { FaAppStore } from "react-icons/fa";
import { IoGlobeOutline, IoLogoGooglePlaystore } from "react-icons/io5";
import useAppRedirect from "../../utils/useAppRedirect";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setSelectedModel } from "../../services/inputSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const {selectedModel} = useSelector((state: RootState)=>state.input);
  const [feature, setCurrentFeature] = useState<string>("");
  const { data } = useGetAIModelsQuery({ model_type: feature });
  const sortedData: any[] = data
    ? [
        // First, filter and include "GPT 3.5" and "GPT Mini 40"
        ...data.filter((item: any) => item.name === "GPT 3.5" || item.name === "GPT-4o mini"),
        // Then, include all other items that are not "GPT 3.5" or "GPT Mini 40"
        ...data.filter((item: any) => item.name !== "GPT 3.5" && item.name !== "GPT-4o mini"),
      ]
    : [];
  const handleRedirect = useAppRedirect();

  const handleDisAbled = (model: string) => {
    if (model !== "GPT 3.5" && model !== "GPT-4o mini") {
      handleRedirect();
    }
  };

  return (
    <div className="h-screen bg-secondaryBg w-full flex flex-col">
      <div className="flex flex-col items-center h-1/4 relative top-[15%]">
        <img src="/Afro.svg" alt="" width={200} height={200} />
        <p className="text-4xl font-bold text-center text-text">AfroChat</p>
        <p className="text-center text-text">Generative AI for Africa</p>
      </div>
      <div className="relative text-button flex justify-center gap-5 text-3xl place-self-center top-[37%]">
        <FaAppStore onClick={handleRedirect} />
        <IoLogoGooglePlaystore onClick={handleRedirect} />
        <IoGlobeOutline onClick={() => window.open("https://afrochat.app/application/chat/home", "_blank")} />
        </div>
      <div className="px-2 relative flex overflow-x-auto gap-3 w-full top-[45%]">
        {data ? (
          sortedData.map((item: any, index: number) => (
            <button
              key={index}
              className={`rounded-full  ${
                item.name === selectedModel ? "bg-button" : "bg-secondaryBg"
              } border border-hint text-text h-8 text-sm whitespace-nowrap flex items-center gap-1 px-2`}
              onClick={() => {
                dispatch(setSelectedModel(item.name));
                handleDisAbled(item.name);
              }}
            >
              <div className="w-6 h-6 flex items-center">
                <img src={item.image} alt="" />
              </div>
              <div className={`${item.name !== "GPT-4o mini" && item.name !== "GPT 3.5" && "text-subtitle "}`}>{item.name}</div>
            </button>
          ))
        ) : (
          <>
            <div className="shimmer rounded-full h-8 w-20"></div>
            <div className="shimmer rounded-full h-8 w-20"></div>
            <div className="shimmer rounded-full h-8 w-20"></div>
            <div className="shimmer rounded-full h-8 w-20"></div>
          </>
        )}
      </div>
      <div className="px-3 w-full relative top-[45%] bottom-[20%]">
        <TextBar setCurrentFeature={setCurrentFeature} />
      </div>
    </div>
  );
};

export default HomePage;
