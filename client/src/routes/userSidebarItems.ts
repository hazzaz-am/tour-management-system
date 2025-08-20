
import BookingsPage from "@/pages/user/bookings";

export const userSidebarItems = [
  {
    title: "History",
    items: [
      {
        title: "Bookings",
        url: "/user/bookings",
        component: BookingsPage,
      },
    ],
  }
];
