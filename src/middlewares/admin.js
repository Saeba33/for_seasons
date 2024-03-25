import { getUserById } from "@/middlewares/auth";

export async function checkAdmin(req, res, next) {
  const { userId } = req.user;
  try {
    const user = await getUserById(userId);
    if (user && user.profile === "administrator") {
      req.user.isAdmin = true;
    } else {
      req.user.isAdmin = false;
    }
    next();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "An error occurred while checking admin status" });
  }
}


