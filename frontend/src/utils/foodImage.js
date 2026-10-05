export function getFoodImage(food) {
  const foodName = food?.name || "delicious food";
  const category = food?.category?.name || "";

  const prompt = `
realistic professional food photography of ${foodName},
${category} cuisine,
freshly prepared,
served on a beautiful restaurant plate,
appetizing,
natural lighting,
close-up,
no text,
no people
`;

  return `https://gen.pollinations.ai/image/${encodeURIComponent(
    prompt
  )}?model=flux`;
}