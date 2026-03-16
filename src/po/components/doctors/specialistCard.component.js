const BaseComponent = require("../common/base.component");

class SpecialistCard extends BaseComponent {
    constructor(index){
        super(`#Specialist_${index}`)
    }

    get name(){
        return this.rootEl.$('.name');
    }

    get education(){
        return this.rootEl.$('.education');
    }
}

module.exports = SpecialistCard;