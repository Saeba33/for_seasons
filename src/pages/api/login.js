import { loginUser } from "@/middlewares/auth";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      const user = await loginUser(email, password);
      const token = jwt.sign(
        { userId: user.user_id, profile: user.profile },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.setHeader("Set-Cookie", `token=${token}; Path=/; Max-Age=3600`);
      res.status(200).json({ token, profile: user.profile });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
  }
}
