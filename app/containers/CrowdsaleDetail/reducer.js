import produce from 'immer';
import {
  LOAD_CROWDSALE_TRANSACTIONS,
  LOAD_CROWDSALE_TRANSACTIONS_SUCCESS,
  SET_CROWDSALES_TRANSACTIONS_PAGE,
} from './constants';

export const initialState = {
  loading: false,
  transactions: [],
  pageCount: 0,
  currentPage: 1,
  total: 0,
};

const sortDateFordward = array =>
  array.sort((current, previous) => current.blocktime < previous.blocktime);

/* eslint-disable default-case, no-param-reassign */
const crowdsaleTransactionsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_CROWDSALE_TRANSACTIONS:
        draft.loading = true;
        draft.transactions = [];
        draft.pageCount = 0;
        draft.total = 0;
        break;
      case LOAD_CROWDSALE_TRANSACTIONS_SUCCESS:
        draft.transactions = sortDateFordward(action.transactions);
        draft.pageCount = action.pages;
        draft.total = action.total;
        draft.loading = false;
        break;
      case SET_CROWDSALES_TRANSACTIONS_PAGE:
        draft.loading = true;
        draft.currentPage = action.page;
        break;
    }
  });

export default crowdsaleTransactionsReducer;
