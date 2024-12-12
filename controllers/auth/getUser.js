const { ObjectId } = require("mongoose").Types;
const { catchAsync } = require("../../utils/handleFactory");
const passport_jwt = require("passport-jwt");
const Users = require("../../models/user");
const JwtStrategy = passport_jwt.Strategy;

const getUser = catchAsync(async (req, res, next) => {
  let data = "no data";
  if (req.user.role === "user") {
    const id = new ObjectId(req.user._id);
    data = (await Users.findById(id)) ?? "";
  }
  // else if (req.user.role === "admin") {
  // data = await Admin.findById(req.user.id);
  // }

  res.status(200).send({ user: data });
});
const Recommendations = catchAsync(async (req, res, next) => {
  const { BMI, BP, Insulin, glucose, diabetes } = req.body;
  let recommendations = [];

  // BMI Check
  if (BMI < 18.5) {
    recommendations.push(
      "Underweight - Recommendations:\n1. Focus on nutrient-rich foods\n2. Eat more frequent smaller meals\n3. Incorporate moderate exercise to stimulate appetite",
    );
  } else if (BMI > 24.9) {
    recommendations.push(
      "Overweight - Recommendations:\n1. Reduce extra weight by doing some exercise\n2. Eat healthy meals",
    );
  } else {
    recommendations.push("Your BMI value is ideal");
  }

  // Blood Pressure Check
  if (BP < 60) {
    recommendations.push(
      "Low Blood Pressure - Recommendations:\n1. Use more salt\n2. Drink more water\n3. Wear compression stockings\n4. Take fludrocortisone Medicines as prescribed by the Healthcare Physician",
    );
  } else if (BP > 80 && BP <= 89) {
    recommendations.push(
      "High Blood Pressure Stage 1 - Recommendations:\n1. Exercise regularly for 30 mins to lose weight\n2. Healthy diet - [potassium intake (3.5g to 5g) and sodium intake (<2.3g)]\n3. Limit alcohol\n4. Quit smoking\n5. 7 to 9 hours of sleep\n6. Control cholesterol and blood sugar",
    );
  } else if (BP > 90 && BP <= 120) {
    recommendations.push(
      "High Blood Pressure Stage 2 - Recommendations:\n1. Start with medications recommended by the Healthcare physician\n2. Exercise regularly for 45 mins\n3. Monitor your Blood pressure once in every 3 days\n4. Healthy diet (DASH diet) - [potassium intake (3.5g to 5g) and sodium intake (<2.3g)]\n5. Limit alcohol\n6. Quit smoking\n7. 7 to 9 hours of sleep\n8. Control cholesterol and blood sugar",
    );
  } else if (BP > 120) {
    recommendations.push(
      "High Blood Pressure Stage 3 - Recommendations:\nConsult your Healthcare Physician Immediately",
    );
  } else {
    recommendations.push("Your Blood Pressure range is normal");
  }

  // Insulin Check
  if (Insulin > 15) {
    recommendations.push(
      "Hyperinsulinemia - Recommendations:\n1. Diet: Eat whole foods, vegetables, fruits, whole grains, fish, and lean poultry. Limit processed foods, added sugar, and unhealthy fats\n2. Exercise: Get regular moderate-intensity physical activity\n3. Weight loss: Losing weight can improve insulin resistance\n4. Reduce stress\n5. Improve sleep\n6. Consider supplements like berberine and magnesium\n7. Try intermittent fasting\n8. Take medication: Metformin may be recommended",
    );
  } else {
    recommendations.push("Your insulin is of normal range");
  }

  // Glucose Check
  if (glucose < 70) {
    recommendations.push(
      "Low Glucose level - Recommendations:\nConsume 15 grams of fast-acting carbohydrates such as sugar, honey, Glucose Tablet",
    );
  } else if (glucose > 99) {
    if (diabetes >= 100 && diabetes <= 125) {
      recommendations.push(
        "Prediabetes - Recommendations:\n1. Eat healthy foods - A diet high in fruits, vegetables, nuts, whole grains and olive oil\n2. Physical activity (150 minutes of moderate or 75 minutes of vigorous activities)\n3. Lose excess weight (lose 5% to 7% of your body weight)\n4. Stop smoking\n5. Take medications (Glumetza) as recommended by health care provider",
      );
    } else {
      recommendations.push(
        "Diabetes or Type 2 diabetes - Recommendations:\n1. Eat healthy foods - A diet high in fruits, vegetables, nuts, whole grains and olive oil\n2. Physical activity (150 minutes of moderate or 75 minutes of vigorous activities)\n3. Lose excess weight (lose 5% to 7% of your body weight)\n4. Stop smoking\n5. Monitor your blood sugar (Check your blood sugar level once a day)\n6. Diabetes medications (Metformin, Sulfonylureas, Glinides)\n7. Other Treatments such as Insulin therapy, Weight-loss surgery",
      );
    }
  } else {
    recommendations.push("Your glucose and diabetes is in the normal range");
  }

  res.json({ recommendations });
});

const logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 2 * 1000),
    maxAge: -1,
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });
  res.status(200).json({ status: "success" });
};

const passportInit = (passport) => {
  const jwtExtractor = function (req) {
    console.log("here");
    let token = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else if (req.cookies) {
      token = req.cookies["jwt"];
    }
    return token;
  };

  const options = {
    jwtFromRequest: jwtExtractor,
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    //@ts-ignore
    new JwtStrategy(options, (jwtPayload, done) => {
      //@ts-ignore
      Users.findOne({ _id: jwtPayload._id }).then((currUser) => {
        if (currUser) {
          done(null, currUser);
        }
      });
    }),
  );
};
module.exports = { getUser, logout, passportInit, Recommendations };
