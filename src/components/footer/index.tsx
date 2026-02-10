import IconButton from "../icon-button";
import LogoIcon from "../../assets/logo-icon";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <>
      <footer
        id="footer"
        className="flex flex-row bg-black w-full h-116 px-40 py-26 items-center justify-between"
      >
        <div className="w-140">
          <IconButton icon={<LogoIcon color="white" />} />
          <p className="text-(--secondary-font-color) text-sm py-6">
            Project developed by Andressa Martins for portfolio purposes.
          </p>
          <div className="flex gap-8 pt-30">
            <IconButton
                icon={<Twitter size={16} strokeWidth={1.5} color="white" />}
            />
            <IconButton
                icon={<Facebook size={16} strokeWidth={1.5} color="white" />}
            />
            <IconButton
                icon={<Youtube size={16} strokeWidth={1.5} color="white" />}
            />
            <IconButton
                icon={<Instagram size={16} strokeWidth={1.5} color="white" />}
            />
          </div>
        </div>
        <div className="w-100">
            <h6 className="text-(--primary-color) pb-5">Services</h6>
            <div className="text-sm text-(--secondary-font-color) h-50 justify-between flex flex-col">
                <p>Bonus program</p>
                <p>Gift cards</p>
                <p>Credit and payment</p>
                <p>Service contracts</p>
                <p>Non-cash account</p>
                <p>Payment</p>
            </div>
        </div>

        <div className="w-100">
            <h6 className="text-(--primary-color) pb-5">Assistance to the buyer</h6>
            <div className="text-sm text-(--secondary-font-color) h-50 justify-between flex flex-col">
                <p>Find an order</p>
                <p>Terms of delivery</p>
                <p>Exchange and return of goods</p>
                <p>Guarantee</p>
                <p>Frequently asked questions</p>
                <p>Terms of use of the site</p>
            </div>
        </div>
      </footer>
    </>
  );
}
