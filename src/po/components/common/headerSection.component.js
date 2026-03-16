const BaseComponent = require('./base.component');

class HeaderSection extends BaseComponent {
    constructor(){
        super('.planner-header')
    }

    get logoutButton(){
        return this.rootEl.$('.logout-icon-container');
    }

}

module.exports = HeaderSection;