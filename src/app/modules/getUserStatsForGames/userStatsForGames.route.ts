import { Router } from 'express';
import { UserStatsForGamesController } from './userStatsForGames.controller';

const router = Router();

router.get('/', UserStatsForGamesController.getStats);

export const UserStatsForGamesRoutes = router;
