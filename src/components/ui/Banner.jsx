function Banner() {
  return (
    <div className="relative drop-shadow-xl">
      <img
        className="w-full h-48 sm:h-50 md:h-64 lg:h-72 object-cover"
        src="/banner.jpg"
        alt="Welcome to Shoppy"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow-lg">
          Welcome to Shoppy
        </h1>
        <p className="text-lg md:text-xl text-white mt-2 drop-shadow-lg">
          Best Products
        </p>
      </div>
    </div>
  );
}

export default Banner;
