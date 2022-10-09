import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SketchTile({sketchData, users}) {

    const navigate = useNavigate();

    const navigateToSketch = ()=> {
        let data = {
            state : {
                sketchData : sketchData,
                isUpdate: true,
                users: users
            }
        }
        navigate(`/sketch/${sketchData._id}`, data);
    }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src={sketchData.image} alt={`sketch-${sketchData._id}`} />
        <div className="px-6 py-4">
            {/* <div className="font-bold text-xl mb-2">Sketch {sketchData._id}</div> */}
            <p className="text-gray-700 text-base">
                <button onClick={navigateToSketch}> Open Sketch </button>
            </p>
        </div>
        <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{new Date(sketchData.createdAt).toLocaleString()}</span>
        </div>
    </div>
  )
}
