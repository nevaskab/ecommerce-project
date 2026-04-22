import Iphone from "../../assets/iphone-banner.png";
import Ps5 from "../../assets/playstation-banner.png";
import Ps5Mobile from "../../assets/playstation-mobile-banner.png";
import Macbook from "../../assets/macbook-banner.png";
import MacbookMobile from "../../assets/macbook-mobile-banner.png";
import Airpods from "../../assets/airpods-banner.png";
import AirpodsMobile from "../../assets/airpods-mobile-banner.png";
import AppleVision from "../../assets/vision-banner.png";
import AppleVisionMobile from "../../assets/vision-mobile-banner.png";

export function Banner() {
  return (
    <>
      <section
        id="principal-banner"
        className="flex lg:flex-row flex-col lg:h-158 h-auto bg-(--banner-bg-primary) w-full justify-center items-center lg:gap-32 px-8"
      >
        <div className="flex flex-col justify-center items-start lg:gap-4 py-10">
          <p className="lg:text-[25px] text-[20px] text-(--secondary-font-color)">
            Pro.Beyond.
          </p>
          <h1 className="lg:text-[96px] text-[56px] text-(--primary-color) font-thin">
            IPhone 14 <span className="font-bold">Pro</span>
          </h1>
          <p className="lg:text-[18px] text-[16px] text-(--terciary-font-color)">
            Created to change everything for the better. For everyone
          </p>
          <button className="max-w-max text-(--light-button-bg) border-2 mt-6 px-14 py-4 rounded-md block lg:inline-block">
            Shop Now
          </button>
        </div>

        <img
          src={Iphone}
          alt="iPhone 14 Pro Banner"
          className="w-9/10 max-w-75 lg:max-w-none lg:w-101.5 h-auto lg:h-158 object-contain"
        />
      </section>

      <section
        id="sub-banner"
        className="flex flex-col lg:grid lg:grid-cols-4 lg:grid-rows-2 w-full h-auto lg:h-150"
      >
        <div
          id="ps5"
          className="flex flex-col lg:flex-row lg:col-span-2 order-3 lg:order-0 bg-white items-center"
        >
          <img
            src={Ps5}
            alt="PlayStation 5 Banner"
            className="hidden lg:block w-90 h-75 object-contain"
          />
          <img
            src={Ps5Mobile}
            alt="PlayStation 5 Banner"
            className="lg:hidden w-1/2 h-auto object-cover"
          />

          <div className="py-8 px-10">
            <h1 className="text-[28px] lg:text-[40px] text-(--primary-font-color) font-medium">
              Playstation 5
            </h1>
            <p className="text-[14px] text-(--terciary-font-color)">
              Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O
              will redefine your PlayStation experience.
            </p>
          </div>
        </div>

        <div
          id="macbook"
          className="flex flex-col-reverse order-4 lg:order-0 lg:flex-row lg:row-span-2 lg:col-span-2 bg-(--banner-bg-terciary) items-center"
        >
          <div className="px-14 py-8">
            <h1 className="text-[40px] lg:text-[64px] text-(--primary-font-color) font-thin">
              Macbook <span className="font-bold">Air</span>
            </h1>
            <p className="text-(--terciary-font-color)">
              The new 15‑inch MacBook Air makes room for more of what you love
              with a spacious Liquid Retina display.
            </p>
            <button className="text-(--primary-font-color) border-2 mt-6 px-14 py-4 rounded-md items-center">
              Shop Now
            </button>
          </div>
          <img
            src={MacbookMobile}
            alt="Macbook Air Banner"
            className="lg:hidden w-full h-auto object-cover"
          />
          <img
            src={Macbook}
            alt="Macbook Air Banner"
            className="hidden lg:block w-73 h-125.5 p-0"
          />
        </div>

        <div
          id="airpods"
          className="order-1 lg:order-0 bg-(--banner-bg-terciary) flex flex-col lg:flex-row items-center p-8 lg:p-0"
        >
          <img
            src={AirpodsMobile}
            alt="AirPods Mobile Banner"
            className="lg:hidden h-auto object-cover"
          />
          <img src={Airpods} alt="AirPods Banner" className="hidden lg:block" />
          <div className="px-8 pt-8 lg:pt-0">
            <h1 className="text-[28px] lg:text-[32px] font-light">
              Apple AirPods <span className="font-medium">Max</span>
            </h1>
            <p className="text-[14px] text-(--terciary-font-color)">
              Computational audio. Listen, it's powerful.
            </p>
          </div>
        </div>

        <div
          id="appplevision"
          className="order-2 lg:order-0 bg-(--banner-bg-secondary) flex flex-col lg:flex-row items-center"
        >
          <img
            src={AppleVisionMobile}
            alt="AirPods Mobile Banner"
            className="lg:hidden h-auto object-cover"
          />
          <img
            src={AppleVision}
            alt="Apple Vision Pro Banner"
            className="hidden lg:block"
          />
          <div className="px-10 py-8">
            <h1 className="text-[28px] lg:text-[32px] text-(--primary-color) font-light">
              Apple Vision <span className="font-medium">Pro</span>
            </h1>
            <p className="text-[14px] text-(--terciary-font-color)">
              An immersive way to experience entertainment.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
