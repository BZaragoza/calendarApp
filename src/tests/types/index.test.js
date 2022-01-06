import { types } from '../../redux/types/index';
 
describe('Tests on action\'s types', () => {

  test('Types should match', () => {
    expect(types).toEqual({
      uiOpenModal: 'uiOpenModal',
      uiCloseModal: 'uiCloseModal',
    
      eventLogout: 'eventLogout',
    
      eventSetEvents: 'eventSetEvents',
      eventAddNew: 'eventAddNew',
      eventSetActive: 'eventSetActive',
      eventClearActive: 'eventClearActive',
      eventUpdate: 'eventUpdate',
      eventDeleted: 'eventDeleted',
    
      authCheckingFinished: 'authCheckingFinished',
      authLogin: 'authLogin',
      authRegister: 'authRegister',
      authStartTokenRenew: 'authStartTokenRenew',
      authLogout: 'authLogout',
    })
  })
})