const initalState = {
    theme: localStorage.getItem("theme") != null ? localStorage.getItem("theme") : "",
    currentIndex: 0,
    openItem: ['dashboard'],
    defaultId: 'dashboard',
    openComponent: 'buttons',
    drawerOpen: false,
    componentDrawerOpen: true
}

export default function SettingsReducer(settings = initalState, action) {

    switch (action.type) {

        case "CHANGE_LAYOUT":

            return action.payload;

        case "CHANGE_THEME":

            return action.payload;

        case "CHANGE_INDEX":

            return action.payload;

        default:
            return settings;
    }

};