const { pages } = require('../po/index');

describe('Module 7: Advanced Configuration', () => {
    beforeEach(async () => {
      await pages('dashboard').open();
    });
  
  it('should open page - checking the page title of Doctors Page', async () => {
      const pageTitle = await browser.getTitle();
      expect(pageTitle).toEqual('Appointment Planner - Syncfusion Angular Components Showcase App');
    });
  

  it('should open modal', async () => {
      await pages('dashboard').sideMenu.item('doctors').click();
      await pages('doctors').doctorListHeader.addDoctorBtn.click();
      await expect(pages('doctors').addDoctorPopup.rootEl).toBeDisplayed();
    });
  
  it('should add doctor', async () => {
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
  
  it('should close modal while creating the Doctors Card', async () => {
      await pages('dashboard').sideMenu.item('doctors').waitForDisplayed();
      await pages('dashboard').sideMenu.item('doctors').click();
      await pages('doctors').doctorListHeader.addDoctorBtn.click();
      await pages('doctors').addDoctorPopup.cancelButton.click();
      await expect(pages('doctors').addDoctorPopup.rootEl).not.toBeDisplayed();
    });

    it('create the doctor appointment', async () => {
      // Test implementation for creating a doctor appointment
    });
  });