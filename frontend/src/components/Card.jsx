import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({
  title = "Default Title",
  description = "Default description goes here.",
  imgSrc = "/docs/images/blog/image-1.jpg",
  altText = "Card image",
  link = "#"
}) => {
  return (
    <div className="w-[360px] bg-white border border-blue-200 rounded-lg shadow-sm">
      <Link to={link}>
        <img className="rounded-t-lg w-[500px] h-[200px] object-cover" src={imgSrc} alt={altText} />
      </Link>
      <div className="p-5">
        <Link to={link}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-blue-900">
            {title}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-blue-800">
          {description}
        </p>
        <Link
          to={link}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Card;
