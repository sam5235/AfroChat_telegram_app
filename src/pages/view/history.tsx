import { useCallback, useEffect, useRef } from "react";
import HistoryCard from "../../components/HistoryCard";
import { useGetHistoryQuery } from "../../services/apiSlices";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setHistoryList, setOffset } from "../../services/historySlice";
import { historyDateFormat } from "../../utils/timeFormatter";
import HistoryPageShimmer from "../../components/HistoryPageShimmer";

const HistoryPage = () => {
  const dispatch = useDispatch();
  const { limit, offset, historyList } = useSelector(
    (state: RootState) => state.history
  );
  const { data, isLoading, isFetching, refetch } = useGetHistoryQuery({
    limit: limit,
    offset: offset,
  });

  useEffect(() => {
    if (data) {
      dispatch(setHistoryList(data.data));
    }
  }, [data]);

  useEffect(() => {
    refetch;
  }, []);

  const observer = useRef<IntersectionObserver | null>(null);
  const latHistoryElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isFetching) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data?.data.length > 0) {
          const nextPageOffset = offset + limit;
          dispatch(setOffset(nextPageOffset));
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, isFetching, data, offset, limit, dispatch]
  );

  return (
    <div className="h-auto w-full bg-secondaryBg pb-20">
      {isLoading ? (
        <HistoryPageShimmer />
      ) : (
        <div className="relative flex flex-col items-center gap-2 top-4">
          {historyList.map((history, idx) => (
            <div
              key={idx}
              ref={idx === historyList.length - 1 ? latHistoryElementRef : null}
              className="w-full flex flex-col justify-center items-center"
            >
              {idx > 0 &&
                historyDateFormat(historyList[idx - 1].updated_at) !==
                  historyDateFormat(history.updated_at) && (
                  <p className="text-text my-1 text-center bg-background rounded-full text-sm w-32 pb-1">
                    {historyDateFormat(history.updated_at)}
                  </p>
                )}
              {(idx === 0 &&
                historyDateFormat(history.updated_at) ===
                  historyDateFormat(new Date().toISOString()) && (
                  <p className="text-text my-1 text-center bg-background rounded-full text-sm w-32 pb-1 ">
                    Today
                  </p>
                )) ||
                (idx === 0 && (
                  <p className="text-text bg-background rounded-full my-2 text-center text-sm w-32 pb-1">
                    {historyDateFormat(history.updated_at)}
                  </p>
                ))}
              <HistoryCard history={history} />
            </div>
          ))}
          {isFetching && (
            <div className="spinner-dot-pulse pb-3 self-center">
              <div className="spinner-pulse-dot"></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
