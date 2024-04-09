import { steamApi } from '../../../shared/steamApi';

const getStats = async (callback: any) => {
  await steamApi.getUserStatsForGame({
    steamid: '76561197963506690', // github
    // steamid: '76561197987151735', // client given
    // steamid: '76561197960435530', // tushar
    appid: 730,
    callback: callback,
  });
};

export const UserStatsForGamesService = {
  getStats,
};
