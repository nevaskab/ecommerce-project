import Iphone from "../../assets/iphone-banner.png";
import Ps5 from "../../assets/playstation-banner.png";
import Macbook from "../../assets/macbook-banner.png";
import Airpods from "../../assets/airpods-banner.png";
import AppleVision from "../../assets/vision-banner.png";

export function Banner() {
  return (
    <>
      <section
        id="principal-banner"
        className="flex flex-row h-158 bg-(--banner-bg-primary) w-screen justify-center px-40"
      >
        <div className="w-178.5 h-64 py-47">
          <p className="text-[25px] text-(--secondary-font-color)">
            Pro.Beyond.
          </p>
          <h1 className="text-[96px] text-(--primary-color) font-thin">
            IPhone 14 <span className="font-bold">Pro</span>
          </h1>
          <p className="text-[18px] text-(--terciary-font-color)">
            Created to change everything for the better. For everyone
          </p>
          <button className="text-(--light-button-bg) border-2 mt-6 px-14 py-4 rounded-md">Shop Now</button>
        </div>

        <img
          src={Iphone}
          alt="iPhone 14 Pro Banner"
          className="w-101.5 h-158 p-0"
        />
      </section>

      <section
        id="sub-banner"
        className="grid grid-cols-4 grid-rows-2 w-screen h-150"
      >
        <div id="ps5" className="col-span-2 bg-white flex items-center">
          <img 
            src={Ps5} 
            alt="PlayStation 5 Banner" 
            className="w-90 h-75"
          />

          <div className="w-120 py-10 px-10">
            <h1 className="text-[40px] text-(--primary-font-color) font-medium">Playstation 5</h1>
            <p className="text-[14px] text-(--terciary-font-color)">Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.</p>
          </div>
        </div>

        <div id="macbook" className="flex row-span-2 col-span-2 bg-(--banner-bg-terciary) items-center">
          <div className="px-14">
            <h1 className="text-[64px] text-(--primary-font-color) font-thin">Macbook <span className="font-bold">Air</span></h1>
            <p className="text-(--terciary-font-color)">The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.</p>
            <button className="text-(--primary-font-color) border-2 mt-6 px-14 py-4 rounded-md">Shop Now</button>
          </div>
          <img 
            src={Macbook} 
            alt="Macbook Air Banner" 
            className="w-73 h-125.5 p-0" />
        </div>

        <div id="airpods" className="bg-(--banner-bg-terciary) flex items-center">
          <img src={Airpods} alt="AirPods Banner"  />
          <div className="px-10">
            <h1 className="text-[29px] font-light">Apple AirPods <span className="font-medium">Max</span></h1>
            <p className="text-[14px] text-(--terciary-font-color)">Computational audio. Listen, it's powerful.</p>
          </div>
        </div>

        <div id="appplevision" className="bg-(--banner-bg-secondary) flex items-center">
          <img src={AppleVision} alt="Apple Vision Pro Banner" />
          <div className="px-10">
            <h1 className="text-[29px] text-(--primary-color) font-light">Apple Vision <span className="font-medium">Pro</span></h1>
            <p className="text-[14px] text-(--terciary-font-color)">An immersive way to experience entertainment.</p>
          </div>

        </div>

      </section>
    </>
  );
}
