import { createUser } from "@/middlewares/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
    return;
  }

  try {
    await createUser(email, password);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);

    if (error.code === "ER_DUP_ENTRY") {
      res.status(409).json({ success: false, message: "Email already exists" });
    } else {
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
}







