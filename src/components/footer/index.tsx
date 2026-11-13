import IconButton from "../icon-button";
import LogoIcon from "../../assets/logo-icon";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();
  return (
    <>
      <footer
        id="footer"
        className="flex flex-col lg:flex-row bg-black w-full h-auto lg:px-40 lg:py-26 py-12 px-8 lg:justify-between">
        <div className="flex flex-col w-full lg:items-start lg:justify-start items-center justify-center">
          <IconButton icon={<LogoIcon color="white" />} />
          <p className="text-(--secondary-font-color) text-sm py-6 text-center lg:text-left">
            {t("footer.developedBy")}{" "}
            <a
              href="https://www.linkedin.com/in/andressa-martins-dev/"
              className="text-(--primary-color) underline"
              target="_blank"
              rel="noopener noreferrer">
              Andressa Martins
            </a>{" "}
            {" "}{t("footer.portfolioPurpose")}
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
            <h6 className="text-(--primary-color) pb-5">{t("footer.services")}</h6>
            <div className="text-sm text-(--secondary-font-color) gap-4 justify-between flex flex-col items-center lg:items-start">
              <p>{t("footer.bonusProgram")}</p>
              <p>{t("footer.giftCards")}</p>
              <p>{t("footer.creditPayment")}</p>
              <p>{t("footer.serviceContracts")}</p>
              <p>{t("footer.nonCashAccount")}</p>
              <p>{t("footer.payment")}</p>
            </div>
          </div>

          <div className="lg:w-full items-center justify-between flex flex-col lg:items-start p-3">
            <h6 className="text-(--primary-color) pb-5">
              {t("footer.buyerAssistance")}
            </h6>
            <div className="text-sm text-(--secondary-font-color) gap-4 justify-between flex flex-col items-center lg:items-start">
              <p>{t("footer.findOrder")}</p>
              <p>{t("footer.deliveryTerms")}</p>
              <p>{t("footer.exchangeReturns")}</p>
              <p>{t("footer.guarantee")}</p>
              <p>{t("footer.faq")}</p>
              <p>{t("footer.termsOfUse")}</p>
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
