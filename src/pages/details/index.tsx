import {
  BadgeCheck,
  ChevronRight,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
  Truck,
  Heart,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ProductCarousel } from "../../components/product-carousel";
import { StarRating } from "../../components/star-rating";
import { useAuth } from "../../contexts/AuthContext";
import { useProducts } from "../../contexts/APIContext";
import { api } from "../../services/api";
import { getApiErrorMessage } from "../../services/apiError";
import { useTranslation } from "react-i18next";
import { formatPrice } from "../../utils/formatPrice";

function formatReviewDate(date: string, locale: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return date;

  return parsedDate.toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function PageMessage({ title, children }: { title: string; children: string }) {
  return (
    <main className="mx-auto min-h-[50vh] max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold text-(--primary-font-color)">{title}</h1>
      <p className="mt-2 text-(--terciary-font-color)">{children}</p>
    </main>
  );
}

export function Details() {
  const { t, i18n } = useTranslation();
  const { products, loading, error } = useProducts();
  const { user } = useAuth();
  const userId = user?.id;
  const { id } = useParams();
  const productId = Number(id);
  const location = useLocation();
  const navigate = useNavigate();
  const [wishlistStatus, setWishlistStatus] = useState<{
    productId: number;
    userId: string;
    isFavorite: boolean;
  } | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isUpdatingWishlist, setIsUpdatingWishlist] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<{
    productId: number;
    userId: string;
    message: string;
    hasError: boolean;
  } | null>(null);

  useEffect(() => {
    let isCurrent = true;

    if (!userId || !Number.isInteger(productId) || productId < 1) return;

    api
      .get<{ items: { apiProduct: string }[] }>("/wishlist")
      .then(({ data }) => {
        if (!isCurrent) return;
        const isFavorite = data.items.some(
          (item) => item.apiProduct === String(productId),
        );
        setWishlistStatus({ productId, userId, isFavorite });
      })
      .catch((requestError: unknown) => {
        if (!isCurrent) return;
        setWishlistStatus({ productId, userId, isFavorite: false });
        setActionFeedback({
          productId,
          userId,
          message: getApiErrorMessage(
            requestError,
            t("details.checkWishlistError"),
          ),
          hasError: true,
        });
      });

    return () => {
      isCurrent = false;
    };
  }, [productId, userId, t]);

  if (!Number.isInteger(productId) || productId < 1) {
    return (
      <PageMessage title={t("details.invalidTitle")}>
        {t("details.invalidDescription")}
      </PageMessage>
    );
  }

  const product = products.find((item) => item.id === productId);

  if (loading && !product) {
    return (
      <PageMessage title={t("details.loadingTitle")}>
        {t("details.loadingDescription")}
      </PageMessage>
    );
  }

  if (error && !product) {
    return <PageMessage title={t("details.loadFailureTitle")}>{error}</PageMessage>;
  }

  if (!product) {
    return (
      <PageMessage title={t("details.notFoundTitle")}>
        {t("details.notFoundDescription")}
      </PageMessage>
    );
  }

  const productTitle = t(`products.${product.id}.title`, {
    defaultValue: product.title,
  });
  const productDescription = t(`products.${product.id}.description`, {
    defaultValue: product.description,
  });
  const productCategory = t(`catalog.categories.${product.category}`, {
    defaultValue: product.category.replaceAll("-", " "),
  });
  const normalizedAvailability = product.availabilityStatus
    .toLowerCase()
    .replaceAll(" ", "");
  const availabilityFallback = t(
    `details.availability.${normalizedAvailability}`,
    { defaultValue: product.availabilityStatus || t("details.availabilityVaries") },
  );
  const availabilityStatus = t(`products.${product.id}.availability`, {
    defaultValue: availabilityFallback,
  });
  const locale = i18n.resolvedLanguage ?? i18n.language;

  // A stable reference keeps the type narrowed inside the async event handlers below.
  const selectedProduct = product;
  const reviews = product.reviews ?? [];
  const reviewBreakdown = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => Math.round(review.rating) === rating).length,
  }));
  const hasDiscount = product.discountPercentage > 0 && product.discountPercentage < 100;
  const originalPrice = hasDiscount
    ? product.price / (1 - product.discountPercentage / 100)
    : product.price;
  const recommendations = [
    ...products.filter(
      (item) => item.id !== product.id && item.category === product.category,
    ),
    ...products.filter(
      (item) => item.id !== product.id && item.category !== product.category,
    ),
  ].slice(0, 4);
  const images = product.images?.length ? product.images : [product.thumbnail];
  const currentWishlistStatus =
    wishlistStatus &&
    wishlistStatus.productId === product.id &&
    wishlistStatus.userId === userId
      ? wishlistStatus
      : null;
  const isWishlistLoading = Boolean(userId && !currentWishlistStatus);
  const isFavorited = currentWishlistStatus?.isFavorite ?? false;
  const currentFeedback =
    actionFeedback?.productId === product.id && actionFeedback.userId === userId
      ? actionFeedback
      : null;

  function goToLogin() {
    navigate("/login", { state: { from: location.pathname } });
  }

  async function handleAddToCart() {
    if (!user) {
      goToLogin();
      return;
    }

    setIsAddingToCart(true);
    setActionFeedback(null);

    try {
      await api.post("/cart", { productId: selectedProduct.id, quantity: 1 });
      setActionFeedback({
        productId: selectedProduct.id,
        userId: user.id,
        message: t("details.addCartSuccess"),
        hasError: false,
      });
    } catch (requestError) {
      setActionFeedback({
        productId: selectedProduct.id,
        userId: user.id,
        message: getApiErrorMessage(
          requestError,
          t("details.addCartError"),
        ),
        hasError: true,
      });
    } finally {
      setIsAddingToCart(false);
    }
  }

  async function handleToggleWishlist() {
    if (!user) {
      goToLogin();
      return;
    }

    setIsUpdatingWishlist(true);
    setActionFeedback(null);

    try {
      if (isFavorited) {
        await api.delete(`/wishlist/${selectedProduct.id}`);
        setWishlistStatus({
          productId: selectedProduct.id,
          userId: user.id,
          isFavorite: false,
        });
        setActionFeedback({
          productId: selectedProduct.id,
          userId: user.id,
          message: t("details.removeWishlistSuccess"),
          hasError: false,
        });
      } else {
        await api.post("/wishlist", { productId: selectedProduct.id });
        setWishlistStatus({
          productId: selectedProduct.id,
          userId: user.id,
          isFavorite: true,
        });
        setActionFeedback({
          productId: selectedProduct.id,
          userId: user.id,
          message: t("details.saveWishlistSuccess"),
          hasError: false,
        });
      }
    } catch (requestError) {
      setActionFeedback({
        productId: selectedProduct.id,
        userId: user.id,
        message: getApiErrorMessage(
          requestError,
          t("details.updateWishlistError"),
        ),
        hasError: true,
      });
    } finally {
      setIsUpdatingWishlist(false);
    }
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
      <nav aria-label={t("common.breadcrumb")} className="mb-6 flex min-w-0 items-center gap-2 text-sm text-(--terciary-font-color)">
        <Link to="/" className="shrink-0 transition-colors hover:text-(--primary-font-color)">
          {t("common.home")}
        </Link>
        <ChevronRight aria-hidden="true" size={15} className="shrink-0" />
        <span className="truncate text-(--primary-font-color)">{productTitle}</span>
      </nav>

      <section className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="min-w-0 rounded-3xl border border-slate-200 bg-white p-2 shadow-sm sm:p-5">
          <ProductCarousel key={product.id} images={images} title={productTitle} />
        </div>

        <div className="flex min-w-0 flex-col py-1 sm:py-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold capitalize text-indigo-700">
              {productCategory}
            </span>
            {product.brand && (
              <span className="text-sm text-(--terciary-font-color)">
                {t("details.by")} <span className="font-medium text-(--primary-font-color)">{product.brand}</span>
              </span>
            )}
          </div>

          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-(--primary-font-color) sm:text-4xl">
            {productTitle}
          </h1>

          <a href="#customer-reviews" className="mt-4 inline-flex w-fit items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600">
            <StarRating rating={product.rating} />
            <span className="text-sm font-semibold text-(--primary-font-color)">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-sm text-(--terciary-font-color)">
              ({t("details.review", { count: reviews.length })})
            </span>
          </a>

          <div className="mt-6 border-y border-slate-200 py-5">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="text-4xl font-bold tracking-tight text-(--primary-font-color)">
                {formatPrice(product.price)}
              </p>
              {hasDiscount && (
                <>
                  <p className="text-base text-(--terciary-font-color) line-through">
                    {formatPrice(originalPrice)}
                  </p>
                  <span className="rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">
                    {t("details.savePercent", {
                      percent: Math.round(product.discountPercentage),
                    })}
                  </span>
                </>
              )}
            </div>
            <p className="mt-2 text-sm text-(--terciary-font-color)">
              {t("details.discountNote")}
            </p>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 font-medium text-emerald-800">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-500" />
              {availabilityStatus}
            </span>
            <span className="text-(--terciary-font-color)">
              {t("details.available", { count: product.stock })}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-[minmax(0,1fr)_3.5rem] gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              aria-busy={isAddingToCart}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-(--dark-button-bg) px-5 py-3 font-semibold text-(--primary-color) transition-colors hover:bg-(--light-button-bg) hover:text-(--primary-font-color) hover:ring-1 hover:ring-slate-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-wait disabled:opacity-70"
            >
              <ShoppingCart size={19} aria-hidden="true" />
              {isAddingToCart ? t("details.adding") : t("details.addToCart")}
            </button>
            <button
              type="button"
              onClick={handleToggleWishlist}
              disabled={isWishlistLoading || isUpdatingWishlist}
              aria-label={
                isFavorited
                  ? t("details.removeFromWishlist")
                  : t("details.addToWishlist")
              }
              aria-pressed={isFavorited}
              aria-busy={isWishlistLoading || isUpdatingWishlist}
              title={
                isFavorited
                  ? t("details.removeFromWishlist")
                  : t("details.addToWishlist")
              }
              className={`flex min-h-12 items-center justify-center rounded-xl border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-wait disabled:opacity-60 ${
                isFavorited
                  ? "border-rose-200 bg-rose-50 text-rose-600"
                  : "border-slate-300 bg-white text-slate-700 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
              }`}
            >
              <Heart
                size={21}
                aria-hidden="true"
                fill={isFavorited ? "currentColor" : "none"}
              />
            </button>
          </div>

          {currentFeedback && (
            <p
              role={currentFeedback.hasError ? "alert" : "status"}
              aria-live={currentFeedback.hasError ? "assertive" : "polite"}
              className={`mt-3 text-sm ${
                currentFeedback.hasError ? "text-rose-700" : "text-emerald-700"
              }`}
            >
              {currentFeedback.message}
            </p>
          )}

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <InfoLine icon={<Truck size={18} />} label={t("details.shipping")} value={t(`products.${product.id}.shipping`, { defaultValue: product.shippingInformation })} />
            <InfoLine icon={<ShieldCheck size={18} />} label={t("details.warranty")} value={t(`products.${product.id}.warranty`, { defaultValue: product.warrantyInformation })} />
            <InfoLine icon={<RotateCcw size={18} />} label={t("details.returns")} value={t(`products.${product.id}.returns`, { defaultValue: product.returnPolicy })} />
            <InfoLine icon={<PackageCheck size={18} />} label={t("details.minimumOrder")} value={t("details.minimumOrder", { count: product.minimumOrderQuantity })} />
          </div>

          {product.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2" aria-label={t("details.productTags")}>
              {product.tags.map((tag) => (
                <span key={tag} className="rounded-md border border-slate-200 px-2.5 py-1 text-xs capitalize text-slate-600">
                  {t(`products.${product.id}.tags.${tag}`, {
                    defaultValue: tag.replaceAll("-", " "),
                  })}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
        <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">{t("details.overview")}</p>
          <h2 className="mt-2 text-2xl font-bold text-(--primary-font-color)">{t("details.aboutProduct")}</h2>
          <p className="mt-4 leading-7 text-slate-600">{productDescription}</p>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-7">
          <div className="flex items-center gap-2 text-indigo-600">
            <BadgeCheck size={20} aria-hidden="true" />
            <p className="text-sm font-semibold uppercase tracking-[0.16em]">{t("details.specifications")}</p>
          </div>
          <h2 className="mt-2 text-2xl font-bold text-(--primary-font-color)">{t("details.productDetails")}</h2>
          <dl className="mt-5 divide-y divide-slate-200">
            <DetailRow label={t("details.brand")} value={product.brand || "—"} />
            <DetailRow label={t("details.sku")} value={product.sku || "—"} />
            <DetailRow label={t("details.category")} value={productCategory} capitalize />
            <DetailRow label={t("details.weight")} value={`${product.weight} g`} />
            <DetailRow label={t("details.dimensions")} value={`${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm`} />
          </dl>
        </article>
      </section>

      <section id="customer-reviews" className="mt-12 scroll-mt-8 lg:mt-16">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">{t("details.customerFeedback")}</p>
            <h2 className="mt-2 text-2xl font-bold text-(--primary-font-color) sm:text-3xl">{t("details.reviewsHeading")}</h2>
          </div>
          <p className="text-sm text-(--terciary-font-color)">
            {t("details.customerReview", { count: reviews.length })}
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          {reviews.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-[15rem_minmax(0,1fr)]">
              <aside className="md:border-r md:border-slate-200 md:pr-7">
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-bold tracking-tight text-(--primary-font-color)">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="pb-1 text-sm text-(--terciary-font-color)">{t("details.outOfFive")}</span>
                </div>
                <StarRating rating={product.rating} />
                <p className="mt-2 text-sm text-(--terciary-font-color)">{t("details.basedOn", { count: reviews.length })}</p>
                <div className="mt-6 space-y-3">
                  {reviewBreakdown.map(({ rating, count }) => (
                    <div key={rating} className="grid grid-cols-[2.5rem_minmax(0,1fr)_2rem] items-center gap-2 text-xs">
                      <span className="text-slate-600">{t("details.stars", { count: rating })}</span>
                      <div
                        role="img"
                        aria-label={t("details.starReviews", { count, rating })}
                        className="h-2 overflow-hidden rounded-full bg-slate-100"
                      >
                        <div
                          className="h-full rounded-full bg-amber-400"
                          style={{ width: `${(count / reviews.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-right text-slate-500">{count}</span>
                    </div>
                  ))}
                </div>
              </aside>

              <div className="divide-y divide-slate-200">
                {reviews.map((review, index) => (
                  <article key={`${review.reviewerEmail}-${review.date}-${index}`} className="py-5 first:pt-0 last:pb-0">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-50 font-semibold text-indigo-700">
                          {review.reviewerName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-semibold text-(--primary-font-color)">{review.reviewerName}</h3>
                          <p className="text-xs text-(--terciary-font-color)">{formatReviewDate(review.date, locale)}</p>
                        </div>
                      </div>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="mt-4 leading-6 text-slate-600">{t(`products.${product.id}.reviews.${index}`, { defaultValue: review.comment })}</p>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <p className="py-5 text-slate-600">{t("details.noReviews")}</p>
          )}
        </div>
      </section>

      <section className="mt-12 pb-8 lg:mt-16">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">{t("details.pickedForYou")}</p>
          <h2 className="mt-2 text-2xl font-bold text-(--primary-font-color) sm:text-3xl">{t("details.youMayAlsoLike")}</h2>
          <p className="mt-2 text-sm text-(--terciary-font-color)">{t("details.recommendationsDescription")}</p>
        </div>

        {recommendations.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {recommendations.map((recommendedProduct) => (
              <Link
                key={recommendedProduct.id}
                to={`/product/${recommendedProduct.id}`}
                className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:p-4"
              >
                <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-3 sm:p-5">
                  <img
                    src={recommendedProduct.thumbnail}
                    alt={t(`products.${recommendedProduct.id}.title`, {
                      defaultValue: recommendedProduct.title,
                    })}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <span className="mt-4 text-xs capitalize text-(--terciary-font-color)">
                  {t(`catalog.categories.${recommendedProduct.category}`, { defaultValue: recommendedProduct.category.replaceAll("-", " ") })}
                </span>
                <h3 className="mt-1 line-clamp-2 min-h-10 text-sm font-semibold text-(--primary-font-color) sm:text-base">
                  {t(`products.${recommendedProduct.id}.title`, { defaultValue: recommendedProduct.title })}
                </h3>
                <div className="mt-3 flex items-center gap-2">
                  <StarRating rating={recommendedProduct.rating} />
                  <span className="text-xs text-(--terciary-font-color)">{recommendedProduct.rating.toFixed(1)}</span>
                </div>
                <p className="mt-3 font-bold text-(--primary-font-color)">
                  {formatPrice(recommendedProduct.price)}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-slate-200 bg-white p-5 text-slate-600">{t("details.noRecommendations")}</p>
        )}
      </section>
    </main>
  );
}

function InfoLine({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-xl bg-slate-50 p-3">
      <span className="mt-0.5 shrink-0 text-indigo-600">{icon}</span>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-(--terciary-font-color)">{label}</p>
        <p className="mt-1 wrap-break-word text-sm font-medium text-(--primary-font-color)">{value}</p>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
  capitalize = false,
}: {
  label: string;
  value: string;
  capitalize?: boolean;
}) {
  return (
    <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-3 first:pt-0 last:pb-0">
      <dt className="text-sm text-(--terciary-font-color)">{label}</dt>
      <dd className={`text-right text-sm font-medium text-(--primary-font-color) ${capitalize ? "capitalize" : ""}`}>
        {value}
      </dd>
    </div>
  );
}
