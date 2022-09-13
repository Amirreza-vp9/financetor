import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";

const EDIT_ME = gql`
  mutation EditMe($name: String!, $img: Upload) {
    editMe(name: $name, img: $img) {
      status
      msg
    }
  }
`;
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

const EditMe = () => {
  const [submit] = useMutation(EDIT_ME);
  const params = useParams();
  const navigate = useNavigate();
  const { data, refetch } = useQuery(ME);
  const [name, setName] = useState(params.id);
  const [file, setFile] = useState();

  const click = async () => {
    try {
      const {
        data: {
          editMe: { status, msg },
        },
      } = await submit({
        variables: {
          name: name,
          img: file,
        },
      });
      if (msg === "ok!" && status === 200) {
        navigate("/me");
      }
    } catch (error) {
      console.log(error);
    }
  };

  refetch();

  return (
    <>
      {data && (
        <div className="cursor-default absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[20em] bg-gray-600 flex flex-col justify-center items-center p-[1em]">
          <img
            src={"http://localhost:80/" + data.me.img}
            className="bg-gray-900 w-[10rem] h-[10rem] rounded-[50%]"
          />
          <input
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <label className="mt-[1em] mr-auto">Name</label>
          <input
            placeholder="Edit your name ..."
            className="w-[100%] px-[.25em]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            onClick={click}
            className="mt-[1em] bg-gray-900 w-[100%] text-gray-200 hover:bg-gray-800"
          >
            Submit
          </button>
        </div>
      )}
    </>
  );
};

export default EditMe;
