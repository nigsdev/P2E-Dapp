import { handleActions } from 'redux-actions';
import {
  changeThemeToDark,
  changeThemeToLight,
} from '../actions/themeActions';

const defaultState = {
  className: 'theme-dark',
};

export default handleActions(
  {
    [changeThemeToDark]() {
      return { className: 'theme-dark' };
    },
    [changeThemeToLight]() {
      return { className: 'theme-dark' };
    },
  },
  defaultState,
);
