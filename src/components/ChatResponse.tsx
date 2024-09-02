import {
    historyDateFormat,
    historyHourFormatter,
  } from "../utils/timeFormatter";
import MarkdownText from "./MarkDown";
  
  interface ResponseProps {
    response: string;
    timeStamp: string;
  }
  
  const ChatResponse = ({ response, timeStamp }: ResponseProps) => {
    return (
      <div className="my-6">
        {response.startsWith("http") ? (
          <div className="w-72 h-72 lg:w-11/12 lg:h-[800px] rounded-xl relative overflow-hidden">
            <img alt="user input image" src={response} className="object-fill" />
          </div>
        ) : (
          <div className="p-4 max-w-full overflow-auto prose text-text mt-2 rounded-tr-3xl rounded-b-3xl">
            <MarkdownText content={response} />
          </div>
        )}
        <div className="flex text-sm justify-end items-center relative gap-2 px-1">
          <div className="text-text max-w">
            {timeStamp ? (
              <div className="text-text flex gap-1">
                {historyDateFormat(new Date().toDateString()) !==
                  historyDateFormat(timeStamp) && (
                  <span>{historyDateFormat(timeStamp)}</span>
                )}
                <span>{historyHourFormatter(timeStamp)}</span>
              </div>
            ) : (
              "Just Now"
            )}
          </div>
      
        </div>
      </div>
    );
  };
  
  export default ChatResponse;
  