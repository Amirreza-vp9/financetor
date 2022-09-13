import React from "react";
import { gql, useQuery } from "@apollo/client";
import DeleteExpense from "../mutation/deleteExpense";

const GET_MY_EXPENSES = gql`
  query GetMyExpenses {
    getMyExpenses {
      _id
      amount
      geo {
        lat
        lon
      }
      tags {
        _id
        name
        color
      }
      date
      address {
        MunicipalityZone
        Neighbourhood
        FormattedAddress
        Place
      }
    }
  }
`;

const MyExpense = () => {
  const { loading, error, data, refetch } = useQuery(GET_MY_EXPENSES);

  if (loading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-white">Error :(</p>;

  refetch();

  return (
    <>
      {data && (
        <div className="w-[80%] mx-auto bg-gray-400 p-[1em]">
          <div className="text-gray-200 bg-gray-700 font-medium flex p-[1em] my-[.5em]">
            <div>Amount</div>
            <div className="mx-auto">Date</div>
            <div className="mr-auto">Address</div>
            <div>Tags</div>
          </div>
          {data.getMyExpenses.map((item, i) => {
            return (
              <div
                key={i}
                className="text-gray-200 cursor-default flex bg-gray-700 p-[1em] my-[.5em]"
              >
                <div>
                  <div>{item.amount}</div>
                </div>
                <div className="mx-auto">
                  <div>{item.date}</div>
                </div>
                <div className="mr-auto">
                  <div>
                    <div className="text-[whitesmoke] font-medium">
                      FormattedAddress :
                    </div>
                    <div>{item.address.FormattedAddress}</div>
                  </div>
                  <div>
                    <div className="text-[whitesmoke] font-medium">
                      MunicipalityZone :
                    </div>
                    <div>{item.address.MunicipalityZone}</div>
                  </div>
                  <div>
                    <div className="text-[whitesmoke] font-medium">
                      Neighbourhood :
                    </div>
                    <div>{item.address.Neighbourhood}</div>
                  </div>
                  <div>
                    <div className="text-[whitesmoke] font-medium">Place :</div>
                    <div>{item.address.Place}</div>
                  </div>
                </div>
                <div>
                  {item.tags.map((el, ii) => {
                    return (
                      <div key={ii} className="mr-[.25em]">
                        {el.name}
                      </div>
                    );
                  })}
                </div>
                <DeleteExpense id={item._id} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default MyExpense;
