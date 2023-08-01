import React from "react";
import { Link } from "react-router-dom";

const List = () => {
  const handleOpenNewTab = (url) => {
    window.open(url, "_blank", "noopener, noreferrer");
  };

  return (
    <div className="h-full mb-24 overflow-y-scroll overflow-x-hidden scrollbar-hide">
      <div className="flex justify-around pt-6 pb-6 border-b-2 border-zinc-200">
        <div className="font-bold text-3xl">Categories</div>
      </div>
      <div className="flex flex-col justify-center items-center mt-4 pb-6">
        <div className="text-lg font-bold">Seoul City Tour</div>
        <div className="mt-4 flex flex-col gap-6">
          <img
            onClick={() =>
              handleOpenNewTab(
                "https://www.seoulcitybus.com/service/tour_course_view.php?code=1"
              )
            }
            className="w-[340px] h-40 rounded-xl hover:opacity-70"
            src="/images/List/nigthview.jpeg"
            alt="citytour1"
          />
          <img
            onClick={() =>
              handleOpenNewTab(
                "https://www.seoulcitybus.com/service/tour_course_view.php?code=2"
              )
            }
            className="w-[340px] h-40 rounded-xl hover:opacity-70"
            src="/images/List/palace_tour.jpeg"
            alt="citytour2"
          />
          <img
            onClick={() =>
              handleOpenNewTab(
                "https://www.seoulcitybus.com/service/tour_course_list.php"
              )
            }
            className="w-[340px] h-40 rounded-xl hover:opacity-70"
            src="/images/List/CITYTOUR.jpeg"
            alt="citytour3"
          />
          <img
            onClick={() =>
              handleOpenNewTab(
                "https://www.seoulcitybus.com/service/tour_course_list.php"
              )
            }
            className="w-[340px] h-40 rounded-xl hover:opacity-70"
            src="/images/List/Seoul_Tiger_Open_Top_Bus.jpg"
            alt="citytour3"
          />
        </div>
      </div>
    </div>
  );
};

export default List;
