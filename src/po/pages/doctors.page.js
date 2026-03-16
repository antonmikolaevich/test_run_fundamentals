const BasePage = require('./base.page');

const {AddDoctorPop, HeaderDoctor, SpecialistCard } = require('../components/index')


class DoctorsPage extends BasePage {

    constructor(){
        super('/showcase/angular/appointmentplanner/#/doctors');
        this.doctorListHeader = new HeaderDoctor();
        this.addDoctorPopup = new AddDoctorPop();
    }

    specialistCard(id){
        return new SpecialistCard(id);
    }


}

module.exports = DoctorsPage;