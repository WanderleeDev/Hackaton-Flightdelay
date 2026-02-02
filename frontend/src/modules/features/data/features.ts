import {
  Brain,
  Bell,
  ShieldCheck,
  CloudSun,
  MessageSquare,
} from "lucide-react";

export const features = [
  {
    icon: Brain,
    title: "MCP Integration",
    description:
      "Creation of our own MCP, use our services with your favorite AI provider",
    bg: "bg-sky-600",
    image: "/feature-mcp.png",
  },
  {
    icon: MessageSquare,
    title: "AI Chatbot Assistant",
    description:
      "24/7 intelligent assistance for flight queries, rebooking, and personalized travel updates.",
    bg: "bg-violet-600",
    image: "/feature-chatbot.png",
  },
  {
    icon: Bell,
    title: "Real-time Notifications",
    description:
      "Receive instant notifications for flight delays, cancellations, and other critical updates.",
    bg: "bg-red-500",
    image: "/feature-notifications.png",
  },
  {
    icon: ShieldCheck,
    title: "User & Role Management",
    description:
      "Secure authentication and granular role-based access control for all users.",
    bg: "bg-emerald-500",
    image: "/feature-security.png",
  },
  {
    icon: CloudSun,
    title: "Automated Weather Alerts",
    description:
      "Hyper-local forecasts and automated flight plan adjustments for severe weather.",
    bg: "bg-indigo-500",
    image: "/feature-weather.png",
  },
];
