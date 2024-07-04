import React from "react";

interface CardProps {
  title: string;
  onClick: () => void;
}

export const Card: React.FC<CardProps> = ({ title, onClick }) => {
  return (
    <div
      className="bg-gray-800 text-white text-center p-4 m-2 rounded-lg shadow-lg cursor-pointer hover:bg-gray-700 transition duration-200"
      onClick={onClick}
    >
      <p className="text-md lg:text-lg">{title}</p>
    </div>
  );
};
