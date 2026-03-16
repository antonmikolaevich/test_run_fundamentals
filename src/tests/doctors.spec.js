const { pages } = require('../po/index');

describe('Module 7: Advanced Configuration', () => {
    beforeEach(async () => {
      await pages('dashboard').open();
    });
  
  it.only('should open page', async () => {
      const pageTitle = await browser.getTitle();
      expect(pageTitle).toEqual('Appointment Planner - Syncfusion Angular Components Showcase App');
    });
  
    
  it.only('should open modal', async () => {
      await pages('dashboard').sideMenu.item('doctors').click();
      await pages('doctors').doctorListHeader.addDoctorBtn.click();
      await expect(pages('doctors').addDoctorPopup.rootEl).toBeDisplayed();
    });
  
  it.only('should add doctor', async () => {
      await pages('dashboard').sideMenu.item('doctors').waitForDisplayed();
      await pages('dashboard').sideMenu.item('doctors').click();
      await pages('doctors').doctorListHeader.addDoctorBtn.click();
      await pages('doctors').addDoctorPopup.input('name').setValue('John Doe');
      await pages('doctors').addDoctorPopup.input('phone').setValue('1111111111');
      await pages('doctors').addDoctorPopup.input('email').setValue('test@test.com');
      await pages('doctors').addDoctorPopup.input('education').setValue('Basic');
      await pages('doctors').addDoctorPopup.input('designation').setValue('Test');
      await pages('doctors').addDoctorPopup.submitButton.click();
      await expect(pages('doctors').addDoctorPopup.rootEl).not.toBeDisplayed();
  
      await expect(pages('doctors').specialistCard(8).name).toHaveText('Dr. John Doe')
      await expect(pages('doctors').specialistCard(8).education).toHaveText('Basic', {ignoreCase: true})
    });
  
  it.only('should close modal', async () => {
      await pages('dashboard').sideMenu.item('doctors').waitForDisplayed();
      await pages('dashboard').sideMenu.item('doctors').click();
      await pages('doctors').doctorListHeader.addDoctorBtn.click();
      await pages('doctors').addDoctorPopup.cancelButton.click();
      await expect(pages('doctors').addDoctorPopup.rootEl).not.toBeDisplayed();
    });
  });