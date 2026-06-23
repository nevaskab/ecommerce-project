export function PromoBanner() {
  return (
    <>
      <div className="flex lg:bg-[url('/src/assets/promo-banner-bg.png')] bg-[url('/src/assets/promo-mobile-banner.png')] bg-no-repeat bg-cover lg:h-112 h-auto w-full justify-center items-center bg-center">
        <div className="flex flex-col justify-center items-center text-center mx-4 my-26">
          <h1 className="text-[72px] text-(--primary-color) font-thin py-4">
            Big Summer <span className="font-normal">Sale</span>
          </h1>
          <p className="text-base text-(--terciary-font-color)">
            Commodo fames vitae vitae leo mauris in. Eu consequat.
          </p>
          <button className="text-(--primary-color) border-2 mt-12 px-14 py-4 rounded-md">
            Shop Now
          </button>
        </div>
      </div>
    </>
  );
}
