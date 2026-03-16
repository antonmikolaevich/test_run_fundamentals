const DashboardPage = require('./dashboard.page');
const DoctorsPage = require('./doctors.page');

/**
 *
 *
 * @param {string} parameter {'dashboard' | 'doctors'}
 * @return {object} {DashboardPage | DoctorsPage }
 */
function pages(parameter){
    const items = {
        dashboard: new DashboardPage(),
        doctors: new DoctorsPage()
    }
    return items[parameter.toLowerCase()];
}

module.exports = {
    DashboardPage,
    DoctorsPage,
    pages
}