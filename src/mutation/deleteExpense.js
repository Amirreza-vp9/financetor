import React from "react";
import { gql, useMutation } from "@apollo/client";
import * as AiIcons from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const DELETE_EXPENSE = gql`
  mutation Delete_expense($id: ID!) {
    delete_expense(_id: $id) {
      status
      msg
    }
  }
`;

const DeleteExpense = ({ id }) => {
  const [submit] = useMutation(DELETE_EXPENSE, { variables: { id } });
  const navigate = useNavigate();

  const click = async () => {
    try {
      const {
        data: {
          delete_expense: { status, msg },
        },
      } = await submit();
      if (status === 200 && msg === "ok") {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <AiIcons.AiOutlineDelete
        onClick={click}
        className="mr-[-.75em] cursor-pointer"
      />
    </>
  );
};

export default DeleteExpense;
