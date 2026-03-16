const BaseComponent = require('./base.component');


class SideMenuComponent extends BaseComponent {

    constructor(){
        super('#plannerSiderBar')
    }

    get name() {
        return this.rootEl.$('.name');
    }

    item(parameter){
        const selector = {
            dashboard: `[routerlink='/dashboard']`,
            schedule: `[routerlink='/calendar']`,
            doctors: `[routerlink='/doctors']`,
            patients: `[routerlink='/patients']`,
            preference: `[routerlink='/preference']`,
            about: `[routerlink='/about']`
        }
        return this.rootEl.$(selector[parameter.toLowerCase()])
    }

}

module.exports = SideMenuComponent;