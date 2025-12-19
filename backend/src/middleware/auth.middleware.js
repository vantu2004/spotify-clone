import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  if (!req.auth.userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};

export const requireAdmin = async (req, res, next) => {
  try {
    const user = await clerkClient.users.getUser(req.auth.userId);

    const isAdmin =
      process.env.ADMIN_EMAIL === user.primaryEmailAddress?.emailAddress;
    if (!isAdmin) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  } catch (error) {
    console.error("Error in requireAdmin middleware", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};
