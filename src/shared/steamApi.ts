// import steam from 'steam-web';

import steam from 'steam-web';
import config from '../config';

export const steamApi = new steam({
  apiKey: config.steam.apiKey,
  format: 'json',
});
