import jwt from "jsonwebtoken";
import { loginUser } from "../../middlewares/auth";
import { requireAuth } from "../../middlewares/middleware";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      const user = await loginUser(email, password);
      const token = jwt.sign(
        { userId: user.user_id, profile: user.profile },
        process.env.JWT_SECRET
      );
      res.status(200).json({ token, profile: user.profile });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
  }
}

export async function getServerSideProps(context) {
  await requireAuth(context.req, context.res);
  return {
    props: {},
  };
}
