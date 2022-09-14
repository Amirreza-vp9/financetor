import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import ExternalStateExample from "./map";

const CREATE_EXPENSE = gql`
  mutation Create_expense($data: ExpenseInfo!) {
    create_expense(data: $data) {
      status
      msg
    }
  }
`;

const GET_MY_TAGS = gql`
  query GetMyTags {
    getMyTags {
      _id
      name
      color
    }
  }
`;

const CreateExpense = () => {
  const [submit] = useMutation(CREATE_EXPENSE);
  const [amount, setAmount] = useState("");
  const [tag, setTag] = useState([]);
  let currentDate = new Date();
  const [date, setDate] = useState(
    moment(currentDate).utc().format("YYYY-MM-DD")
  );
  const [isOpen, setIsOpen] = useState(false);
  const [municipalityZone, setMunicipalityZone] = useState("");
  const [neighbourhood, setNeighbourhood] = useState("");
  const [formattedAddress, setFormattedAddress] = useState("");
  const [place, setPlace] = useState("");
  const [arr, setArr] = useState([]);
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery(GET_MY_TAGS);
  const [position, setPosition] = useState("");

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-white">Error :(</p>;

  const dom = arr.filter((item) => item.isSelected === true);
  // let time = { currentTime: new Date().toLocaleString() };

  const click = async () => {
    try {
      const variables = {
        data: {
          amount: Number(amount),
          geo: {
            lat: position.lat,
            lon: position.lng,
          },
          tags: tag,
          date: moment(currentDate).utc().format("YYYY-MM-DD"),
          address: {
            MunicipalityZone: Number(municipalityZone),
            Neighbourhood: neighbourhood,
            FormattedAddress: formattedAddress,
            Place: place,
          },
        },
      };

      // return console.log(variables);

      const {
        data: {
          create_expense: { status, msg },
        },
      } = await submit({
        variables,
      });
      if (status === 200 && msg === "ok") {
        navigate("/myExpenses");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectTag = () => {
    const clone = [...arr];
    data.getMyTags.filter((item) => {
      if (clone.length < data.getMyTags.length) {
        clone.push({
          name: item.name,
          _id: item._id,
          isSelected: false,
        });
      }
    });
    setArr(clone);
    setIsOpen(true);
  };

  // Array.prototype.remove = function () {
  //   var what,
  //     a = arguments,
  //     L = a.length,
  //     ax;
  //   while (L && this.length) {
  //     what = a[--L];
  //     while ((ax = this.indexOf(what)) !== -1) {
  //       this.splice(ax, 1);
  //     }
  //   }
  //   return this;
  // };

  const select = (_id, i) => {
    const clone = [...arr];
    clone[i].isSelected === false
      ? (clone[i].isSelected = true)
      : (clone[i].isSelected = false);
    setArr(clone);
  };

  const done = () => {
    let domination = dom.map((item) => {
      return item["_id"];
    });
    setTag(domination);
    setIsOpen(false);
  };

  refetch();

  return (
    <>
      {data && (
        <div className="cursor-default absolute top-[53%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gray-600 p-[1em]">
          <div className="mb-[2em]">
            <h5 className="text-white mb-[.5em] font-medium">Amount</h5>
            <input
              className="py-[2px] px-[.5em] w-[100%]"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="mb-[2em]">
            <h5 className="text-white mb-[.5em] font-medium">Date</h5>
            <input
              className="py-[2px] px-[.5em] w-[100%]"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-[2em]">
            <h5 className="text-white mb-[.5em] font-medium">Geo</h5>
            <div>
              <ExternalStateExample absolutePosition={setPosition} />
            </div>
          </div>
          <div className="text-gray-200 font-medium mt-[-1em] mb-[.25em]">
            Address :
          </div>
          <div className="flex gap-[1em]">
            <div className="mb-[2em]">
              <h5 className="text-white mb-[.5em]">MunicipalityZone</h5>
              <input
                className="py-[2px] px-[.5em] w-[100%]"
                value={municipalityZone}
                onChange={(e) => setMunicipalityZone(e.target.value)}
              />
            </div>
            <div className="mb-[2em]">
              <h5 className="text-white mb-[.5em]">Neighbourhood</h5>
              <input
                className="py-[2px] px-[.5em] w-[100%]"
                value={neighbourhood}
                onChange={(e) => setNeighbourhood(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-[1em]">
            <div className="mb-[2em]">
              <h5 className="text-white mb-[.5em]">FormattedAddress</h5>
              <input
                className="py-[2px] px-[.5em] w-[100%]"
                value={formattedAddress}
                onChange={(e) => setFormattedAddress(e.target.value)}
              />
            </div>
            <div className="mb-[2em]">
              <h5 className="text-white mb-[.5em]">Place</h5>
              <input
                className="py-[2px] px-[.5em] w-[100%]"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div
              onClick={selectTag}
              className="bg-gray-800 text-center cursor-pointer text-gray-200 hover:bg-gray-700"
            >
              Select Tags
            </div>
            {isOpen ? (
              <div className="mt-[-2em] flex flex-col gap-[4px] bg-gray-800 p-[.5em]">
                {arr.map((item, i) => {
                  return (
                    <div
                      className={
                        item.isSelected === false
                          ? "bg-gray-400 p-[2px] hover:bg-gray-600 text-gray-800 font-medium"
                          : "font-medium p-[2px] text-gray-800 bg-gray-700 "
                      }
                      key={i}
                      onClick={() => select(item._id, i)}
                    >
                      <div>{item.name}</div>
                    </div>
                  );
                })}
                <button
                  onClick={done}
                  className="bg-gray-500 text-gray-800 font-medium hover:bg-gray-600"
                >
                  Done
                </button>
              </div>
            ) : (
              <button
                onClick={click}
                className="w-[100%] bg-gray-800 text-gray-300 mt-[2em] hover:bg-gray-700"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CreateExpense;
