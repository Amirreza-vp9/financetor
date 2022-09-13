import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import EditTag from "../mutation/editTag";

const GET_MY_TAGS = gql`
  query GetMyTags {
    getMyTags {
      _id
      name
      color
    }
  }
`;

const MyTags = () => {
  const [id, setID] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { loading, error, data, refetch } = useQuery(GET_MY_TAGS);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-white">Error :(</p>;

  refetch();
  return (
    <div>
      {data && (
        <div className="bg-gray-700 p-[.5em] w-[80%] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          {data.getMyTags.map((item, i) => {
            return (
              <div
                key={i}
                className="bg-gray-400 m-[.1em] cursor-default px-[.5em] py-[.25em]"
              >
                <div className="flex">
                  <div
                    style={{ backgroundColor: `${item.color}` }}
                    className={
                      "mt-[8px] mr-[.5em] h-[10px] w-[10px] rounded-[50%]"
                    }
                  ></div>
                  <div className="font-medium">{item.name}</div>
                  <button
                    onClick={() => {
                      setID(item._id);
                      setIsOpen(true);
                    }}
                    className="ml-auto bg-gray-700 text-gray-200 px-[.25em] hover:bg-gray-600"
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <EditTag id={id} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default MyTags;
