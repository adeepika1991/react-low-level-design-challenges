import React from 'react'

const AnalogClock = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-yellow-200 via-orange-200 to-red-200 text-gray-800">
            <div className="text-4xl font-bold">Analog Clock</div>
            <div className="w-120 h-120 rounded-full bg-gray-200 border-2 border-gray-100 flex items-center justify-center"></div>
        </div>
    )
}

export default AnalogClock