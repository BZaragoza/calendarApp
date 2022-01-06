import { uiReducer } from '../../redux/reducers/uiReducer';
import { uiOpenModal, uiCloseModal } from '../../redux/actions/ui';

const initState = {
  modalOpen: false
}

describe('Tests on uiReducer', () => {

  test('Should return initial State', () => {
    const state = uiReducer(initState, {});

    expect(state).toEqual(initState);
  })

  test('Should open and close modal', () => {
    
    const stateOpen = uiReducer(initState, uiOpenModal());
    expect(stateOpen).toEqual({modalOpen: true})
    
    const stateClosed = uiReducer(stateOpen, uiCloseModal());
    expect(stateClosed).toEqual({modalOpen: false})

  })
  

})