const BasePage = require('./base.page');

const {HeaderSection, SideMenu } = require('../components/index')


class DashboardPage extends BasePage {

    constructor(){
        super('/showcase/angular/appointmentplanner/#/dashboard');
        this.sideMenu = new SideMenu();
    }

}

module.exports = DashboardPage;
