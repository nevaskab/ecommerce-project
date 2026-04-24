import IconButton from "../icon-button";
import LogoIcon from "../../assets/logo-icon";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <>
      <footer
        id="footer"
        className="flex flex-col lg:flex-row bg-black w-full h-auto lg:px-40 lg:py-26 py-12 px-8 lg:justify-between"
      >
        <div className="flex flex-col w-full lg:items-start lg:justify-start items-center justify-center">
          <IconButton icon={<LogoIcon color="white" />} />
          <p className="text-(--secondary-font-color) text-sm py-6 text-center lg:text-left">
            Project developed by Andressa Martins for portfolio purposes.
          </p>
          <div className="hidden lg:flex w-md justify-between pt-12 pr-10">
            <IconButton
                icon={<Twitter size={28} strokeWidth={1.5} color="white" />}
            />
            <IconButton
                icon={<Facebook size={28} strokeWidth={1.5} color="white" />}
            />
            <IconButton
                icon={<Youtube size={28} strokeWidth={1.5} color="white" />}
            />
            <IconButton
                icon={<Instagram size={28} strokeWidth={1.5} color="white" />}
            />
          </div>
        </div>
          <div className="flex flex-col lg:flex-row w-full justify-between">
            <div className="lg:w-full items-center justify-between flex flex-col lg:items-start p-3">
              <h6 className="text-(--primary-color) pb-5">Services</h6>
            <div className="text-sm text-(--secondary-font-color) gap-4 justify-between flex flex-col items-center lg:items-start">
                <p>Bonus program</p>
                <p>Gift cards</p>
                <p>Credit and payment</p>
                <p>Service contracts</p>
                <p>Non-cash account</p>
                <p>Payment</p>
            </div>
          </div>

          <div className="lg:w-full items-center justify-between flex flex-col lg:items-start p-3">
              <h6 className="text-(--primary-color) pb-5">Assistance to the buyer</h6>
              <div className="text-sm text-(--secondary-font-color) gap-4 justify-between flex flex-col items-center lg:items-start">
                  <p>Find an order</p>
                  <p>Terms of delivery</p>
                  <p>Exchange and return of goods</p>
                  <p>Guarantee</p>
                  <p>Frequently asked questions</p>
                  <p>Terms of use of the site</p>
              </div>
          </div>
        </div>
        <div className="flex lg:hidden justify-around pt-8 px-10">
            <IconButton
                icon={<Twitter size={28} strokeWidth={1.5} color="white" />}
            />
            <IconButton
                icon={<Facebook size={28} strokeWidth={1.5} color="white" />}
            />
            <IconButton
                icon={<Youtube size={28} strokeWidth={1.5} color="white" />}
            />
            <IconButton
                icon={<Instagram size={28} strokeWidth={1.5} color="white" />}
            />
          </div>
      </footer>
    </>
  );
}
