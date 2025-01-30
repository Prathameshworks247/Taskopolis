
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
import image from '../assets/icons/image.png'
import { useNavigate } from 'react-router-dom';



function Header() {
    const navigate = useNavigate()
    return(
        <div onClick={() => navigate('/')} className="taskopolis-card d-flex justify-content-center align-items-center p-1 row bg-white">
            <div className="col-2"><img
                src={image}
                alt="Taskopolis Icon"
                className="icon me-3"
                style={{ width: '50px', height: '50px' }} /></div>
            <div className="col-10 ">
                <div className="flex-grow-1">
                    <h3 className="title mb-0 ">Taskopolis</h3>
                </div>
            </div>

        </div>
    )
}
export default Header;