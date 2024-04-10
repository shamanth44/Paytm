import { useEffect, useState } from "react";
import axios from "axios";

export const Balance = () => {
  const [balance, setBalance] = useState(0);

  async function balanceCall() {
    await axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBalance(response.data.balance);
      });
  }

  useEffect(() => {
    setTimeout(() => {
      balanceCall();
    }, 0);
  }, []);

  if (!balance) { return <>
      <h1>Fetching balance...</h1>
    </>;
  } else {
    return (
      <div className="flex">
        <div className="font-bold text-lg">
          <h1>Your balance</h1>
        </div>
        <div className="font-semibold ml-4 text-lg">
          Rs {balance.toFixed(2)}
        </div>
      </div>
    );
  }
};
