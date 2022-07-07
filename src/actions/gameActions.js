export const SEND_GAME_SETUP = "SEND_GAME_SETUP";
export const actionSendGameSetup = () => ({
  type: SEND_GAME_SETUP,
});

export const UPDATE_NEW_GAME_FORM = "UPDATE_NEW_GAME_FORM";
export const updateNewGameForm = (field, value) => ({
  type: UPDATE_NEW_GAME_FORM,
  payload: {
    field: field,
    value: value,
  },
});

export const UPDATE_PALETTE_NEW_GAME_FORM = "UPDATE_PALETTE_NEW_GAME_FORM";
export const updatePaletteNewGameForm = (status, text, index) => ({
  type: UPDATE_PALETTE_NEW_GAME_FORM,
  payload: {
    status: status,
    text: text,
    index: index,
  },
});

export const PALETTE = "PALETTE";
export const addPalette = () => ({
  type: PALETTE,
});

export const UPDATE_PLAYERS_NEW_GAME_FORM = "UPDATE_PLAYERS_NEW_GAME_FORM";
export const updatePlayersNewGameForm = (playerName, index) => ({
  type: UPDATE_PLAYERS_NEW_GAME_FORM,
  payload: {
    playerName,
    index,
  },
});

export const PLAYER = "PLAYER";
export const addPlayer = () => ({
  type: PLAYER,
});

export const CREATE_GAME = "CREATE_GAME";
export const createGame = () => ({
  type: CREATE_GAME,
});

export const UPDATE_GAME_INFO = "UPDATE_GAME_INFO";
export const updateGameInfo = (data) => ({
  type: UPDATE_GAME_INFO,
  payload: {
    data,
  },
});

export const CLEAR_GAME = "CLEAR_GAME";
export const clearGame = () => ({
  type: CLEAR_GAME,
});
