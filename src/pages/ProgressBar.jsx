import { useState } from 'react';

const ProgressBar = () => {
    const [inputValue, setInputValue] = useState(0);

    const handleInputChange = (event) => {
        let value = event.target.value;
        if (value >= 0 && value <= 100) {  // Ensure value is between 0 and 100
            setInputValue(value);
        }
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-emerald-200 via-lime-200 to-amber-200 text-cyan-950">
            <h1 className="text-2xl font-bold mt-6 mb-4">Progress Bar with Input Control</h1>
            <div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-lg overflow-y-auto max-h-[80vh]">
                <div className="mt-6">
                    {/* Progress bar container with relative positioning */}
                    <div className="w-full bg-gray-300 rounded-full h-5 relative">
                        {/* Progress bar with dynamic width */}
                        <div
                            style={{
                                width: `${inputValue}%`,
                                backgroundColor: '#4caf50',
                                height: '100%',
                                borderRadius: 'inherit',
                            }}
                        >
                                 {/* Centering the percentage text inside the filled part */}
                                 <div
                                style={{
                                    position: 'absolute',
                                    left: '50%',
                                    transform: 'translateX(-50%)', // This will center the text inside the filled portion
                                    color: 'white',
                                    fontWeight: 'bold',
                                }}
                            >
                                {inputValue}%
                            </div>
                        </div>
                    </div>
                </div>

                {/* Input field */}
                <input
                    type="number"
                    value={inputValue}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Enter a number between 0 and 100"
                />
            </div>
        </div>
    );
};

export default ProgressBar;
