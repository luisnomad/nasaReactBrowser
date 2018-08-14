import { SET_CRITERIA } from '../../actions/types';
import uiState from '../../reducers';

describe('uiState reducer', () => {
  it('handles actions of type SET_CRITERIA', () => {
    const action = {
      type: SET_CRITERIA,
      payload: 'earth'
    };

    const newState = uiState(
      {}, // Initial state
      action // test action
    );

    expect(newState.ui).toEqual({ searchCriteria: 'earth' });
  });
});
