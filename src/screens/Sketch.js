import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { useNavigate, useLocation} from 'react-router-dom';
import {useUser} from "../context/UserContext";
import down from "../assets/down.png";

const Canvas = ({isAuth}) => {
    const {userData} = useUser();
    const [showList, setShowList] = useState(true);

    let location = useLocation();
    const navigate = useNavigate();

    const getColor = ()=> {
        if (Object.keys(location.state.sketchData).length === 0) {
            return "red";
        }
        const data = location.state.sketchData.collaborator.filter((item) => item.user === userData._id);
        return data.length === 0 ? "red" : data[0].color
    }

    const { current: canvasDetails } = useRef({ color: getColor(), socketUrl: '/' });


    // const changeColor = (newColor) => {
    //     canvasDetails.color = newColor;
    // }

    const addCollaborator = async(event, user)=>{
        event && event.preventDefault();
        const isAlreadyCollaborator = location.state.sketchData.collaborator.filter((item) => item.user === user._id);

        // console.log(location.state.sketchData.collaborator);

        if(isAlreadyCollaborator.length > 0){
            alert("User is already a collaborator");
        }else{
            if (!canvasDetails.waiting) {
                await fetch(`http://localhost:3000/sketches/updateSketch/${location.state.sketchData._id}`, {
                    method: "PUT",
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: user._id
                    })
                });
            }
            alert("User is added as collaborator");
        }
    }

    const saveSketch = async(e)=>{
        e && e.preventDefault();
        const canvas = document.getElementById('canvas');
        if (!canvasDetails.waiting) {
            const base64EncodedUrl = canvas.toDataURL('image/png');
            if(location.state.isUpdate){
                //updateApi update image
                // console.log(base64EncodedUrl);
                await fetch(`http://localhost:3000/sketches/updateSketch/${location.state.sketchData._id}`, {
                    method: "PUT",
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        image: base64EncodedUrl
                    })
                });
            }else{
                //addApi
                await fetch('http://localhost:3000/sketches/addSketch', {
                    method: "POST",
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        image: base64EncodedUrl,
                        userId: userData._id
                    })
                });
            }
            navigate('/');
        }
    }

    React.useEffect(() => {
        if(!isAuth){
            navigate('/');
        }
    }, [isAuth, navigate]);

    useEffect(()=> {
        if(location.state.isUpdate){
            const image = new Image();
            const canvas = document.getElementById('canvas');
            const context = canvas.getContext('2d');
            image.src = location.state.sketchData.image;
            image.addEventListener('load', () => {
                context.drawImage(image, 0, 0);
            });
        }
    }, [location]);

    useEffect(() => {
        console.log('client env', process.env.NODE_ENV)
        if (process.env.NODE_ENV === 'development') {
            canvasDetails.socketUrl= 'http://localhost:3000'
        }
        console.log('socketUrl', canvasDetails.socketUrl)
        canvasDetails.socket = io.connect(canvasDetails.socketUrl, () => {
            console.log('connecting to server')
        })
        canvasDetails.socket.on('image-data', (data) => {
            const image = new Image()
            const canvas = document.getElementById('canvas');
            const context = canvas.getContext('2d');
            image.src = data;
            image.addEventListener('load', () => {
                context.drawImage(image, 0, 0);
            });
        })
    }, [canvasDetails]);
    
    useEffect(() => {
        const mouseMoveHandler = (e, type) => {
            const event = type === 'touch' ? e.touches[0] : e;
            findxy('move', event)
        }
        const mouseDownHandler = (e, type) => {
            const event = type === 'touch' ? e.touches[0] : e;
            findxy('down', event);
        }
        const mouseUpHandler = (e, type) => {
            const event = type === 'touch' ? e.touches[0] : e;
            findxy('up', event)
        }
        
        let prevX = 0, currX = 0, prevY = 0, currY = 0, flag = false;

        const canvas = document.getElementById('canvas');
        canvas.height = window.innerHeight - 30;
        canvas.width = window.innerWidth;
        const context = canvas.getContext('2d');

        const onSave = () => {
            if (!canvasDetails.waiting) {
                const base64EncodedUrl = canvas.toDataURL('image/png')
                canvasDetails.socket.emit('image-data', base64EncodedUrl);
                canvasDetails.waiting = true;
                setTimeout(() => {
                    canvasDetails.waiting = false;
                }, 100);
            }
        }
    
        const draw = (e) => {

        // START- DRAW
        context.beginPath();
        context.moveTo(prevX, prevY);
        context.lineTo(currX, currY);
        context.strokeStyle = canvasDetails.color;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.lineWidth = 2;
        context.stroke();
        context.closePath();
        // END- DRAW
        
        onSave();
    }
    
    const findxy= (res, e) => {
        if (res === 'down') {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            flag = true;
        }
        if (res === 'up' || res === "out") {
            flag = false;
        }
        if (res === 'move') {
            if (flag) {
                prevX = currX;
                prevY = currY;
                currX = e.clientX - canvas.offsetLeft;
                currY = e.clientY - canvas.offsetTop;
                draw(e);
            }
        }
    }
        
    canvas.addEventListener("mousemove", mouseMoveHandler);
    canvas.addEventListener("mousedown", mouseDownHandler);
    canvas.addEventListener("mouseup", mouseUpHandler);
    canvas.addEventListener("touchmove", (e) => mouseMoveHandler(e, 'touch'), { passive: true });
    canvas.addEventListener("touchstart", (e) => mouseDownHandler(e, 'touch'), { passive: true });
    canvas.addEventListener("touchend", (e) => mouseUpHandler(e, 'touch'));
    canvas.addEventListener("dblclick", onSave);
        
    return () => {
        canvas.removeEventListener("mousemove", mouseMoveHandler);
        canvas.removeEventListener("mousedown", mouseDownHandler);
        canvas.removeEventListener("mouseup", mouseUpHandler);
        canvas.removeEventListener("dblclick", onSave);
    }
    }, [canvasDetails]);

    let isCreator = (location.state.sketchData.created_by===userData._id || !location.state.sketchData.created_by);

    return (
        <>
            <div className='flex absolute bottom-10 right-10'>
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" onClick={(e)=>saveSketch(e)}>
                    Save
                </button>
            </div>

            {isCreator && <div className='flex absolute top-20 right-10 p-5 h-48 border border-black'>
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between">
                        <div>
                            Users
                        </div>
                        <div>
                            <button onClick={()=> {setShowList(!showList)}}>
                                <img src={down} alt="..."/>
                            </button>                  
                        </div>
                    </div>
                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-gray-400"></div>
                    </div>
                    {!showList && <div>
                        Tap on Down Button to see the list
                    </div>}
                    {showList && location.state.users.length!==0 && <div className="overflow-scroll">
                        {location.state.users.map((user)=>{
                            return (
                                <div key={user._id} className="my-2">
                                    <div className='flex flex-row'>
                                        <div className="flex mr-5"> {user.userFirstName} {user.userLastName} </div>
                                        <button onClick={(event)=>addCollaborator(event, user)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded">
                                            Add Collaborator
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>}
                </div>
            </div>}

            <div className='canvas-wrapper'>
                <div className='color-picker-wrapper'>
                    {/* <input
                        className='color-picker'
                        type='color'
                        defaultValue='#00FF00'
                        onChange={(e) => changeColor(e.target.value)}
                    /> */}
                </div>
                <canvas className='canvas' id='canvas'></canvas>
            </div>
        </>
        
    )

}

export default Canvas