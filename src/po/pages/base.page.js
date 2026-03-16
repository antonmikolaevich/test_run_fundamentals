const {HeaderSection, SideMenu} = require('../components/index')

class BasePage {

    constructor(url){
        this.url = url;
        this.headerSection = new HeaderSection();
        this.sideMenu = new SideMenu();
    }

    open(){
        return browser.url(this.url);
    }

}

module.exports = BasePage;