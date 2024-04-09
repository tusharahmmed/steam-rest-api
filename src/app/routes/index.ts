import express from 'express';
import { UserStatsForGamesRoutes } from '../modules/getUserStatsForGames/userStatsForGames.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user-stats-for-games',
    route: UserStatsForGamesRoutes,
  },
  // {
  //   path: '/auth',
  //   route: AuthRoutes,
  // },
  // {
  //   path: '/profile',
  //   route: ProfileRoutes,
  // },
  // {
  //   path: '/users',
  //   route: UserRoutes,
  // },
  // {
  //   path: '/trucks',
  //   route: TruckRoutes,
  // },
  // {
  //   path: '/quotes',
  //   route: QuoteRoutes,
  // },
  // {
  //   path: '/drivers',
  //   route: DriverRoutes,
  // },
  // {
  //   path: '/customers',
  //   route: CustomerRoutes,
  // },
  // {
  //   path: '/reviews',
  //   route: ReviewRoutes,
  // },
];

moduleRoutes.forEach(module => router.use(module.path, module.route));
export const applicationRoutes = router;
