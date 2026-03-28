/**
 * SCORING SERVICE
 * Discount % calculate karna — yahi player ka score hai
 * Jitna zyada discount, utna better rank
 */

/**
 * Discount percent calculate karo
 * Formula: (listedPrice - finalPrice) / listedPrice * 100
 */
const calculateDiscountPercent = ({ listedPrice, finalPrice }) => {
  if (!listedPrice || listedPrice <= 0) return 0;
  const discount = ((listedPrice - finalPrice) / listedPrice) * 100;
  return parseFloat(discount.toFixed(2));
};

/**
 * Score ke basis pe performance label do
 * Frontend pe badge dikhane ke liye
 */
const getPerformanceLabel = (discountPercent) => {
  if (discountPercent >= 30) return { label: "Legendary Negotiator", emoji: "🏆" };
  if (discountPercent >= 20) return { label: "Master Dealer", emoji: "🥇" };
  if (discountPercent >= 15) return { label: "Sharp Negotiator", emoji: "🥈" };
  if (discountPercent >= 10) return { label: "Decent Haggler", emoji: "🥉" };
  if (discountPercent >= 5)  return { label: "Rookie Buyer", emoji: "😅" };
  return { label: "Paid Full Price Energy", emoji: "💸" };
};

/**
 * Complete score summary — acceptDeal ke baad return hota hai
 */
const buildScoreSummary = ({ listedPrice, finalPrice, rounds }) => {
  const discountPercent = calculateDiscountPercent({ listedPrice, finalPrice });
  const savedAmount = parseFloat((listedPrice - finalPrice).toFixed(2));
  const performance = getPerformanceLabel(discountPercent);

  return {
    listedPrice,
    finalPrice,
    savedAmount,
    discountPercent,
    totalRoundsUsed: rounds,
    performance,
  };
};

export { calculateDiscountPercent, getPerformanceLabel, buildScoreSummary };