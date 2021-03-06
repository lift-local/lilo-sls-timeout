import { query, updateActivityFunc, recordRatingDb } from "./functions";

const { cus_id } = process.env;

const recordRating = async (event, context) => {
  //   const { rating, cus_id, device, company } = JSON.parse(event.body);
  const rating = Math.floor(Math.random() * (5 - 1 + 1) + 1);
  const device = "email";

  console.log(rating, device);

  const custInfo = await updateActivityFunc({ cus_id, device, activityType: "Rating", rating });

  console.log("custInfo", custInfo);

  await query(recordRatingDb, [cus_id, rating]);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ message: "Rating has been recorded" }),
  };
};

export const handler = recordRating;
