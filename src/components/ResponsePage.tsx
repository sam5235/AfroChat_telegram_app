import { TbWritingSign } from "react-icons/tb";
import { GrCopy } from "react-icons/gr";
import { HiLink } from "react-icons/hi";
import MarkdownText from "./MarkDown";

interface SourceProps {
  title: string;
  short_description: string;
  URL: string;
}

interface ResponsePageProps {
  data: any;
}

export default function ResponsePage({ data }: ResponsePageProps) {
  const handleClickOnSource = (link: string) => {
    window.open(link);
  };

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(data.summary)
      .then(() => {
        alert("Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <div className="flex flex-col h-full bg-secondaryBg gap-3 text-text">
      <div className="w-full flex flex-col gap-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2 items-center ">
            <TbWritingSign size={26} />
            <p className="font-extrabold text-xl">Summary</p>
          </div>
          <div className="flex flex-row gap-3 items-center">
            <div className="my-1">
              {" "}
              <button className="rounded-full bg-button text-buttonText text-xs font-semibold p-1">
                {data.llm_model}
              </button>{" "}
            </div>
            <GrCopy
              onClick={handleCopyClick}
              className="text-button"
              size={24}
            />
          </div>
        </div>
        <p className="text-sm text-ellipsis overflow-hidden text-subtitle bg-background p-3 rounded-lg w-full">
          <MarkdownText content={data.summary}/>
        </p>
      </div>
      <div className="flex-col">
        <div className="flex justify-start my-1">
          <HiLink size={25} />
          <p className="font-extrabold text-xl ml-2 ">Sources</p>
        </div>
        <div className="flex flex-nowrap w-full overflow-x-scroll gap-2 ">
          {data.sources?.map((item: SourceProps, key: number) => (
            <div
              key={key}
              className="flex-1 bg-background text-hint w-56  rounded-md p-2 text-sm h-30"
              onClick={() => handleClickOnSource(item.URL)}
            >
              <p className="w-40 link link-link line-clamp-2"> {item.title}</p>
              <p className="line-clamp-3">{item.short_description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
