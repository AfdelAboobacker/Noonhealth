
import { useEffect, useState } from "react";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Pencil,
  X,
  MessageSquare,
  Trash2,
} from "lucide-react";

const ProductViewComponent = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product?.image);
  const [activeTab, setActiveTab] = useState("Product Details");

  // REVIEW STATES
  const [reviews, setReviews] = useState([]);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // GET LOGGED-IN USER
  const getLoggedInUser = () => {
    try {
      return JSON.parse(
        localStorage.getItem("noonHerbUser") ||
        sessionStorage.getItem("noonHerbUser") ||
        "null"
      );
    } catch {
      return null;
    }
  };

  const loggedInUser = getLoggedInUser();

  const currentUserName =
    loggedInUser?.name ||
    loggedInUser?.fullname ||
    loggedInUser?.username ||
    "Guest";

  const currentUserId =
    loggedInUser?.id ||
    loggedInUser?._id ||
    loggedInUser?.email ||
    null;

  // UNIQUE PRODUCT KEY
  const productKey = String(
    product?._id ||
    product?.id ||
    product?.productCode ||
    product?.name ||
    "unknown"
  );

  const storageKey = `noonHerbReviews_${productKey}`;

  const ownerKey = currentUserId
    ? `noonHerbReviewOwner_${productKey}_${currentUserId}`
    : null;

  // LOAD REVIEWS
  useEffect(() => {
    try {
      const savedReviews = JSON.parse(
        localStorage.getItem(storageKey) || "[]"
      );

      setReviews(
        Array.isArray(savedReviews) ? savedReviews : []
      );
    } catch {
      setReviews([]);
    }

    setQuantity(1);
    setActiveImage(product?.image);
    setEditingReviewId(null);
    setShowReviewForm(false);
    setReviewComment("");
    setReviewRating(5);
  }, [storageKey, product?.image]);

  if (!product) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-xl text-gray-500">
          Product not found
        </p>
      </div>
    );
  }

  const images = [product.image];

  // CURRENT USER'S REVIEW ID
  const ownerReviewId = ownerKey
    ? localStorage.getItem(ownerKey)
    : null;

  // QUANTITY
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) =>
      prev > 1 ? prev - 1 : 1
    );
  };

  // ADD TO CART
  const handleAddToCart = () => {
    onAddToCart?.(product, quantity);
  };

  // SAVE REVIEWS
  const saveReviews = (updatedReviews) => {
    localStorage.setItem(
      storageKey,
      JSON.stringify(updatedReviews)
    );

    setReviews(updatedReviews);
  };

  // SUBMIT OR UPDATE REVIEW
  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (!loggedInUser || !currentUserId) {
      alert("Please login to submit a review.");
      return;
    }

    if (!reviewComment.trim()) {
      alert("Please enter your review.");
      return;
    }

    let updatedReviews;

    if (editingReviewId) {
      updatedReviews = reviews.map((review) =>
        review.id === editingReviewId &&
        review.userId === currentUserId
          ? {
              ...review,
              comment: reviewComment.trim(),
              rating: reviewRating,
              updatedAt: new Date().toISOString(),
            }
          : review
      );
    } else {
      // PREVENT MULTIPLE REVIEWS FROM SAME USER
      const existingReview = reviews.find(
        (review) => review.userId === currentUserId
      );

      if (existingReview) {
        alert(
          "You have already reviewed this product. Please edit your existing review."
        );
        return;
      }

      const newReview = {
        id: Date.now().toString(),
        userId: currentUserId,
        name: currentUserName,
        comment: reviewComment.trim(),
        rating: reviewRating,
        date: new Date().toISOString(),
      };

      updatedReviews = [...reviews, newReview];

      localStorage.setItem(ownerKey, newReview.id);
    }

    saveReviews(updatedReviews);

    setReviewComment("");
    setReviewRating(5);
    setEditingReviewId(null);
    setShowReviewForm(false);
  };

  // EDIT REVIEW
  const handleEditReview = (review) => {
    if (review.userId !== currentUserId) return;

    setReviewComment(review.comment);
    setReviewRating(review.rating);
    setEditingReviewId(review.id);
    setShowReviewForm(true);
  };

  // DELETE REVIEW
  const handleDeleteReview = (reviewId) => {
    const reviewToDelete = reviews.find(
      (review) => review.id === reviewId
    );

    if (!reviewToDelete || reviewToDelete.userId !== currentUserId) {
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmDelete) return;

    const updatedReviews = reviews.filter(
      (review) => review.id !== reviewId
    );

    saveReviews(updatedReviews);

    if (reviewId === ownerReviewId) {
      localStorage.removeItem(ownerKey);
    }

    if (editingReviewId === reviewId) {
      handleCancelReview();
    }
  };

  // CANCEL REVIEW
  const handleCancelReview = () => {
    setReviewComment("");
    setReviewRating(5);
    setEditingReviewId(null);
    setShowReviewForm(false);
  };

  // AVERAGE RATING
  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (total, review) =>
              total + Number(review.rating),
            0
          ) / reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <main className="mx-auto max-w-[1200px] px-5 py-8 md:px-8">

      {/* ================= TOP SECTION ================= */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

        {/* PRODUCT IMAGE */}
        <div>
          <div className="flex h-[350px] items-center justify-center rounded-lg border border-gray-200 md:h-[430px]">
            <img
              src={activeImage}
              alt={product.name}
              className="h-full w-full object-contain"
            />
          </div>

          {/* THUMBNAIL */}
          <div className="mt-3 flex gap-3">
            {images.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveImage(image)}
                className={`h-[90px] w-[105px] overflow-hidden rounded-lg border p-1 ${
                  activeImage === image
                    ? "border-[#4b6800]"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="h-full w-full object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCT INFORMATION */}
        <div>
          <h1 className="text-xl font-medium leading-7 text-[#4b6800] md:text-2xl">
            {product.name}
          </h1>

          {/* RATING */}
          <div className="mt-5 flex items-center gap-3">
            <div className="flex text-2xl text-[#ffbd32]">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={21}
                  fill={
                    i < Math.round(Number(averageRating))
                      ? "currentColor"
                      : "none"
                  }
                />
              ))}
            </div>

            <span className="text-sm text-gray-600">
              ({reviews.length} Reviews)
            </span>
          </div>

          {/* PRICE */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="text-xl font-medium text-[#4b6800]">
              ₹ {product.price}
            </span>

            <span className="text-lg text-gray-500 line-through">
              ₹ {product.oldPrice}
            </span>

            <span className="text-red-500">
              {product.discount}% off
            </span>
          </div>

          {/* QUANTITY */}
          <div className="mt-6 flex h-10 w-[128px] overflow-hidden rounded-md">
            <button
              type="button"
              onClick={decreaseQuantity}
              className="flex w-10 items-center justify-center bg-[#4b6800] text-white hover:bg-[#3d5500]"
            >
              <Minus size={17} />
            </button>

            <span className="flex flex-1 items-center justify-center border-y border-gray-300">
              {quantity}
            </span>

            <button
              type="button"
              onClick={increaseQuantity}
              className="flex w-10 items-center justify-center bg-[#4b6800] text-white hover:bg-[#3d5500]"
            >
              <Plus size={17} />
            </button>
          </div>

          {/* BUTTONS */}
          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex h-10 flex-1 items-center justify-center gap-2 rounded-md bg-[#4b6800] text-sm font-medium text-white transition hover:bg-[#3d5500]"
            >
              <ShoppingBag size={18} />
              Add to Cart
            </button>

            <button
              type="button"
              className="flex h-10 w-12 items-center justify-center rounded-md bg-[#4b6800] text-white hover:bg-[#3d5500]"
            >
              <Heart size={22} />
            </button>
          </div>

          <hr className="my-5 border-gray-300" />

          {/* PRODUCT META */}
          <div className="space-y-5 text-gray-600">
            <p>
              <span className="font-medium">Product Code:</span>{" "}
              {product.productCode || "FBB00255"}
            </p>

            <p>
              <span className="font-medium">Availability:</span>{" "}
              {product.availability || "In Stock"}
            </p>

            <p>
              <span className="font-medium">Shipping:</span>{" "}
              {product.shipping || "3 to 4 Days"}
            </p>
          </div>
        </div>
      </div>

      {/* ================= DETAILS SECTION ================= */}
      <div className="mt-10">

        {/* TABS */}
        <div className="flex gap-8 overflow-x-auto border-b border-[#7ca51c]">
          {[
            "Product Details",
            "Information",
            "Reviews",
            "Seller Info",
          ].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap pb-3 text-sm md:text-base ${
                activeTab === tab
                  ? "font-medium text-[#4b6800]"
                  : "text-[#7ca51c]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* PRODUCT DETAILS */}
        {activeTab === "Product Details" && (
          <div className="mt-6 space-y-7 text-gray-600">
            <div>
              <h3 className="font-semibold text-[#4b6800]">
                Nutrient Value & Benefits
              </h3>
              <p className="mt-1 leading-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Nisi, tellus iaculis urna bibendum in lacus, integer.
                Id imperdiet vitae varius sed magnis eu nisi nunc sit.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#4b6800]">
                Storage Tips
              </h3>
              <p className="mt-1 leading-6">
                Nisi, tellus iaculis urna bibendum in lacus, integer.
                Id imperdiet vitae varius sed magnis.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#4b6800]">
                Unit
              </h3>
              <p>{product.unit || "3 units"}</p>
            </div>

            <div>
              <h3 className="font-semibold text-[#4b6800]">
                Seller
              </h3>
              <p>{product.seller || "DMart Pvt. LTD"}</p>
            </div>

            <div>
              <h3 className="font-semibold text-[#4b6800]">
                Disclaimer
              </h3>
              <p className="leading-6">
                Image shown is a representation and may slightly vary
                from the actual product. Every effort is made to
                maintain accuracy of all information displayed.
              </p>
            </div>
          </div>
        )}

        {/* INFORMATION */}
        {activeTab === "Information" && (
          <div className="mt-6 text-gray-600">
            Product information goes here.
          </div>
        )}

        {/* ================= REVIEWS ================= */}
        {activeTab === "Reviews" && (
          <div className="mt-6">

            {/* REVIEW SUMMARY */}
            <div className="mb-7 rounded-lg bg-[#f5f8ed] p-5">
              <h3 className="text-lg font-semibold text-[#4b6800]">
                Customer Reviews
              </h3>

              <div className="mt-3 flex items-center gap-3">
                <span className="text-4xl font-semibold text-[#4b6800]">
                  {averageRating}
                </span>

                <div>
                  <div className="flex text-[#ffbd32]">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        size={20}
                        fill={
                          i < Math.round(Number(averageRating))
                            ? "currentColor"
                            : "none"
                        }
                      />
                    ))}
                  </div>

                  <p className="mt-1 text-sm text-gray-600">
                    Based on {reviews.length} customer reviews
                  </p>
                </div>
              </div>
            </div>

            {/* WRITE REVIEW BUTTON */}
            {!showReviewForm && (
              <button
                type="button"
                onClick={() => {
                  if (!loggedInUser || !currentUserId) {
                    alert("Please login to write a review.");
                    return;
                  }

                  const existingReview = reviews.find(
                    (review) => review.userId === currentUserId
                  );

                  if (existingReview) {
                    alert(
                      "You have already reviewed this product. You can edit your existing review."
                    );
                    return;
                  }

                  setShowReviewForm(true);
                }}
                className="mb-6 flex items-center gap-2 rounded-md bg-[#4b6800] px-5 py-3 text-white hover:bg-[#3d5500]"
              >
                <MessageSquare size={18} />
                Write a Review
              </button>
            )}

            {/* REVIEW FORM */}
            {showReviewForm && (
              <form
                onSubmit={handleReviewSubmit}
                className="mb-8 rounded-lg border border-gray-200 p-5"
              >
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#4b6800]">
                    {editingReviewId
                      ? "Edit Your Review"
                      : "Write Your Review"}
                  </h3>

                  <button
                    type="button"
                    onClick={handleCancelReview}
                    className="text-gray-500 hover:text-red-500"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* LOGGED-IN USER NAME */}
                <div className="mb-5">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Reviewing As
                  </label>

                  <div className="rounded-md border border-gray-200 bg-gray-50 px-4 py-3 text-gray-700">
                    {currentUserName}
                  </div>
                </div>

                {/* STAR RATING */}
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Your Rating
                </label>

                <div className="mb-5 flex gap-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setReviewRating(i + 1)}
                      className="text-[#ffbd32]"
                      aria-label={`Rate ${i + 1} stars`}
                    >
                      <Star
                        size={30}
                        fill={
                          i < reviewRating
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>
                  ))}
                </div>

                {/* REVIEW COMMENT */}
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Your Review
                </label>

                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Share your experience with this product..."
                  rows={4}
                  required
                  className="mb-5 w-full resize-none rounded-md border border-gray-300 px-4 py-3 outline-none focus:border-[#4b6800]"
                />

                {/* FORM BUTTONS */}
                <div className="flex flex-wrap gap-3">
                  <button
                    type="submit"
                    className="rounded-md bg-[#4b6800] px-6 py-3 text-white hover:bg-[#3d5500]"
                  >
                    {editingReviewId
                      ? "Update Review"
                      : "Submit Review"}
                  </button>

                  <button
                    type="button"
                    onClick={handleCancelReview}
                    className="rounded-md border border-gray-300 px-6 py-3 text-gray-600 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* REVIEW LIST */}
            <div className="space-y-5">
              {reviews.length === 0 ? (
                <div className="py-10 text-center text-gray-500">
                  <MessageSquare
                    size={35}
                    className="mx-auto mb-3 text-gray-400"
                  />

                  <p className="font-medium">
                    No reviews yet
                  </p>

                  <p className="mt-1 text-sm">
                    Be the first to review this product!
                  </p>
                </div>
              ) : (
                reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-lg border border-gray-200 p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">

                      {/* CUSTOMER INFO */}
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {review.name}
                        </h4>

                        <div className="mt-1 flex text-[#ffbd32]">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              size={17}
                              fill={
                                i < review.rating
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          ))}
                        </div>

                        <p className="mt-1 text-xs text-gray-500">
                          {new Date(
                            review.updatedAt || review.date
                          ).toLocaleDateString()}
                          {review.updatedAt && " (Edited)"}
                        </p>
                      </div>

                      {/* EDIT AND DELETE */}
                      {review.userId === currentUserId && (
                        <div className="flex gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              handleEditReview(review)
                            }
                            className="flex items-center gap-1 rounded-md border border-[#4b6800] px-3 py-2 text-sm text-[#4b6800] hover:bg-[#f5f8ed]"
                          >
                            <Pencil size={15} />
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteReview(review.id)
                            }
                            className="flex items-center gap-1 rounded-md border border-red-500 px-3 py-2 text-sm text-red-500 hover:bg-red-50"
                          >
                            <Trash2 size={15} />
                            Delete
                          </button>

                        </div>
                      )}
                    </div>

                    {/* CUSTOMER COMMENT */}
                    <p className="mt-4 leading-6 text-gray-600">
                      {review.comment}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* SELLER INFO */}
        {activeTab === "Seller Info" && (
          <div className="mt-6 text-gray-600">
            Seller information goes here.
          </div>
        )}
      </div>
      {/*  */}
    </main>
  );
};

export default ProductViewComponent;
