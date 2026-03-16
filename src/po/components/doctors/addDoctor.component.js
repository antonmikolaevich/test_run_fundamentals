const BaseComponent = require('../common/base.component');


class AddDoctorComponent extends BaseComponent {

    constructor(){
        super('.new-doctor-dialog');
    }

    get submitButton(){
        return this.rootEl.$('button.e-primary');
    }

    get cancelButton(){
        return this.rootEl.$('.button-container button.e-btn:not(.e-primary)');
    }

    /**
     *
     *
     * @param {*} parameter { 'name' | 'phone' | 'email' | 'education' | 'designation' }
     * @return {*} 
     * @memberof AddDoctorComponent
     */
    input(parameter){
        const selector = {
            name: `[name='Name']`,
            phone: '#DoctorMobile',
            email: `[name='Email']`,
            education: `[name='Education']`,
            designation: `[name='Designation']`

        }
        return this.rootEl.$(selector[parameter.toLowerCase()]);
    }

}

module.exports = AddDoctorComponent;