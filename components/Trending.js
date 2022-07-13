import React from "react";
import Image from "next/image";
import {DotsHorizontalIcon} from "@heroicons/react/solid";

const Trending = ({ result }) => {
  return (
    <div className="trending justify-between ">
      <div className="space-y-0.5 ">
        <p className="text-[#6e767d] text-xs font-medium">{result.heading}</p>
        <h6 className="font-bold max-w-[250px] text-sm">
          {result.description}
        </h6>
        <p className="text-[#6e767d] text-xs font-medium max-w-[250px]">
          Trending with{" "}
          {result.tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </p>
      </div>
        {result.img ? (
            <Image src={result.img} alt='img' width={70} height={70} objectfit='cover' className='rounded-2xl' />
        )
        : (
            <div className='icon group'>
                <DotsHorizontalIcon className='h-5 text-[#6e767d] group-hover:text-[#1d9bf0]'/>
            </div>
            )}
    </div>
  );
};

export default Trending;
