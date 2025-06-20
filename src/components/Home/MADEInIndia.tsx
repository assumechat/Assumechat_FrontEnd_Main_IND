import React from 'react';
import Image from 'next/image';

export default function MadeInIndiaPage() {
    return (
        <div className="min-h bg-gradient-to-b from-saffron-50 to-green-50">
            {/* Hero Section with Flag Colors */}
            <div className="relative z-10 flex flex-col items-center justify-center my-10 h-full text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold text-black drop-shadow-lg">
                    Made in India
                </h1>
                <p className="mt-4 text-xl md:text-2xl text-black font-semibold drop-shadow-md">
                    Proudly Indian, Aiming Global
                </p>
            </div>
            <section className="relative h-64 md:h-96 overflow-hidden">
                <div className="absolute inset-0 flex flex-col">
                    <div className="h-1/3 bg-[#FF9933]"></div> {/* Saffron */}
                    <div className="h-1/3 bg-white flex items-center justify-center">
                        <div className="relative w-24 h-24 md:w-36 md:h-36">
                            <Image
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Ashoka_Chakra.svg/330px-Ashoka_Chakra.svg.png" // Replace with your Ashoka Chakra image
                                alt="Ashoka Chakra"
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                    </div>
                    <div className="h-1/3 bg-[#138808]"></div> {/* Green */}
                </div>
            </section>
        </div>
    );
}