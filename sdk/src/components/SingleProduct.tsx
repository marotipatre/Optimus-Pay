import React from 'react'
import { Button } from './Button'

const SingleProduct = ({data,company}) => {
   
    return (
        <>

            <div className="max-full py-3 mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">

                        <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                            <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
                                <img src={data?.image} />
                            </div>


                        </div>

                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{data.name}</h2>
                        <p className="text-gray-500 text-sm">By <a href="#" className="text-indigo-600 hover:underline">{company}</a></p>

                        <div className="flex items-center space-x-4 my-4">
                            <div>
                                <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                                   
                                    <span className="font-bold text-indigo-600 text-3xl">{data.price} OPTI</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="text-green-500 text-xl font-semibold">Save 12%</p>
                                <p className="text-gray-400 text-sm">Inclusive of all Taxes.</p>
                            </div>
                        </div>

                        <p className="text-gray-500">{data.description}</p>



                         <div className="flex gap-2 w-full">
                         <button type="button" className="h-14 mt-3 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white">
                            Pay Using UPI
                        </button>
                        <Button amount={data?.price}  />
                         </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default SingleProduct