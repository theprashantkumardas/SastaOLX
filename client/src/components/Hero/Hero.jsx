import React from 'react'

const Hero = () => {

    return (
        <>
        <section className='container max-w-7xl mx-auto '>



            <div className="container mx-auto   px-6 py-20 flex flex-col-reverse md:flex-row justify-between">
                <div className=" mx-auto my-auto    md:w-1/2">
                    <h1 className="text-4xl font-bold mb-6">
                        FIND CLOTHES <br />
                        THAT MATCHES <br />
                        YOUR STYLE
                    </h1>
                    <p className="text-lg mb-10">
                        Browse through our diverse range of meticulously crafted garments, designed
                        to bring out your individuality and cater to your sense of style.
                    </p>
                    <button className="bg-black text-white font-bold py-3 px-6 rounded-full">
                        Shop Now
                    </button>

                    {/* <div className="mt-16 flex justify-center space-x-4">
                        <div className="flex flex-col items-center">
                            <span className="text-4xl font-bold">200+</span>
                            <span className="text-sm">High-Quality Products</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-4xl font-bold">2,000+</span>
                            <span className="text-sm">International Brands</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-4xl font-bold">30,000+</span>
                            <span className="text-sm">Happy Customers</span>
                        </div>
                    </div> */}


                </div>


                <div className="md:w-1/2">
                    <img src="https://images.pexels.com/photos/325044/pexels-photo-325044.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Hero Image" className="w-full object-cover h-auto md:h-full" />
                </div>


            </div>


           

        </section>
         <div className=" grid grid-cols-5 place-items-center justify-center bg-black h-20 hidden md:grid">
         {/* <div className='w-36 h-20 bg-black ' >  */}



         
         {/* <img src="/images/versace.png" alt="Versace" className="w-20 h-20 object-contain" /> */}
         {/* <img src="/images/zara.png" alt="Zara" className="w-20 h-20 object-contain" /> */}
         {/* <img src="/images/gucci.png" alt="Gucci" className="w-20 h-20 object-contain" /> */}
         <p className='text-white text-4xl font-bold  items-center justify-center  '>PRADA</p>
         <p className='text-white text-4xl font-bold  items-center justify-center  '>APPLE</p>
         <p className='text-white text-4xl font-bold  items-center justify-center  '>ROLEX</p>
         <p className='text-white text-4xl font-bold  items-center justify-center  '>GUCCI</p>
         <p className='text-white text-4xl font-bold  items-center justify-center  '>SAMSUNG</p>
         {/* <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Fvector-art%2F23870512-prada-milano-logo-brand-white-symbol-clothes-design-icon-abstract-vector-illustration-with-black-background&psig=AOvVaw102ecUoczjLEwWAkzgzlCC&ust=1736450239227000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMCv4LPr5ooDFQAAAAAdAAAAABAE" alt="Prada" className="w-20 h-20 object-contain" /> */}
         {/* <img src="/images/calvin-klein.png" alt="Calvin Klein" className="w-20 h-20 object-contain" /> */}
     </div>
     </>
        



    )
}

export default Hero