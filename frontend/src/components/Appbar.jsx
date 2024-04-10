import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios";

export const Appbar = () => {
    const navigate = useNavigate();
    const [firstName, setFirstname] = useState("");
    const [firstLetter, setFirstLetter] = useState("");


    async function fetchUserDetails(){
        await axios.get("http://paytm-v1yc.onrender.com/api/v1/account/singleuser", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        }).then(response => {
            setFirstLetter(response.data.user.firstName[0])
            setFirstname(response.data.user.firstName)

        })
    }

    useEffect(()=>{
       setTimeout(() => {
        fetchUserDetails();
       }, 0);
    }, []);


    // console.log(user)
    // console.log(user.firstName[0])
    if(!firstName && !firstLetter){
        return <><div>Loading...</div></>
    } else{

        
        return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex">

            <div className="flex flex-col justify-center h-full mr-4">
                Hello
            </div>
            <div className="flex flex-col justify-center h-full mr-4">
                {firstName}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {firstLetter}
                </div>
            </div>
            <button

            onClick={ ()=>{
                localStorage.removeItem("token", {})
                navigate("/signin")
                
            }}
            
            
            type="button"
            className=" text-white bg-gray-800 hover:bg-gray-900 focus:outline-none mt-1  focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
          Signout
        </button>
            
        </div>
    </div>
        }
}