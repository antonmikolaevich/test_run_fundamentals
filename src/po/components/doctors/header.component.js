const BaseComponent = require('../common/base.component');


class HeaderComponent extends BaseComponent {

    constructor(){
        super('.specialization-types')
    }

    get addDoctorBtn () {
        return this.rootEl.$('button.e-control');
    }
}

module.exports = HeaderComponent;