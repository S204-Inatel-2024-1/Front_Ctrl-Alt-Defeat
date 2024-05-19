import "./Home.css"
import { Link } from "react-router-dom";

import { useSelecto, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


const Home = () => {

    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    return (
        <div id="home">

        </div>
    );
};


export default Home;
