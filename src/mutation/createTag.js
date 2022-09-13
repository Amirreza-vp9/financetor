import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const CREATE_TAG = gql`
  mutation Create_tag($data: tagInfo!) {
    create_tag(data: $data) {
      status
      msg
    }
  }
`;

const CreateTag = () => {
  const [submit] = useMutation(CREATE_TAG);
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [color, setColor] = useState("black");

  const click = async () => {
    try {
      const {
        data: {
          create_tag: { status, msg },
        },
      } = await submit({
        variables: {
          data: {
            name: name,
            color: color,
          },
        },
      });
      cookies.get("token");
      if (status === 200 && msg === "ok") {
        navigate("/myTags");
        setName("");
        setColor("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="cursor-default absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-600 p-[1em]">
        <div>
          <h5 className="text-white mb-[.5em]">name</h5>
          <input
            className="py-[2px] px-[.5em]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mt-[2em]">
          <h5 className="text-white mb-[.5em]">color</h5>
          <select
            className="w-[100%] py-[2px] px-[.5em]"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          >
            <option>black</option>
            <option>green</option>
            <option>red</option>
            <option>blue</option>
            <option>white</option>
          </select>
        </div>
        <button
          onClick={click}
          className="w-[100%] bg-gray-800 text-gray-300 mt-[2em] hover:bg-gray-700"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default CreateTag;
