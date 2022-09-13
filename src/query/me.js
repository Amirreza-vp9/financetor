import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const ME = gql`
  query Me {
    me {
      _id
      name
      username
      img
    }
  }
`;

const Me = () => {
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(ME);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-white">Error :(</p>;

  refetch();

  return (
    <>
      {data && (
        <div className="text-gray-200 cursor-default absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[20em] bg-gray-600 flex flex-col justify-center items-center p-[1em]">
          <img
            src={"http://localhost:80/" + data.me.img}
            className="bg-gray-900 w-[10rem] h-[10rem] rounded-[50%]"
          />
          <div className="flex mr-auto">
            <h5 className="mr-[.5em] font-medium text-white">Name</h5>
            <div>{data.me.name}</div>
          </div>
          <div className="flex mr-auto">
            <h5 className="mr-[.5em] font-medium text-white">Username</h5>
            <div>{data.me.username}</div>
          </div>
          <button
            onClick={() => navigate(`/editMe/${data.me.name}`)}
            className="bg-gray-900 w-[100%] mt-[1em] text-gray-200 hover:bg-gray-800"
          >
            Edit
          </button>
        </div>
      )}
    </>
  );
};

export default Me;
