import { useState } from "react";
import { TextBar } from "../../components/InputTextFields";
import { useGetAIModelsQuery } from "../../services/apiSlices";

const HomePage = () => {
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [feature, setCurrentFeature] = useState<string>("");
  const { data } = useGetAIModelsQuery({ model_type: feature });

  return (
    <div className="h-screen bg-secondaryBg w-full flex flex-col">
      <div className="flex flex-col items-center h-1/4 relative top-[20%]">
        <img src="/Afro.svg" alt="" width={200} height={200} />
        <p className="text-4xl font-bold text-center text-text">AfroChat</p>
        <p className="text-center text-text">Generative AI for Africa</p>
      </div>
      <div className="px-2 relative flex overflow-x-auto gap-3 w-full top-[47%]">
        {data ? (
          data.map((item: any, index: number) => (
            <button
              key={index}
              className={`rounded-full  ${
                item.name === selectedModel ? "bg-button" : "bg-secondaryBg"
              } border border-hint text-text h-8 text-sm whitespace-nowrap flex items-center gap-1 px-2`}
              onClick={() => setSelectedModel(item.name)}
            >
              <div className="w-6 h-6 flex items-center">
                <img src={item.image} alt="" />
              </div>
              <div>{item.name}</div>
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
      <div className="px-3 w-full relative top-[49%] bottom-[20%]">
        <TextBar setCurrentFeature={setCurrentFeature} />
      </div>
    </div>
  );
};

export default HomePage;
