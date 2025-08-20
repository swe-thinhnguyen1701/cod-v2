interface NavLink {
    name: string,
    path: string
}
interface SubMenu {
    name: string,
    nav_links: [NavLink]
}

export interface Menu {
    link: NavLink,
    subMenu?: SubMenu
}

const MENU = [
    {
        name: "home",
        path: "/"
    },
    {
        name: "Heroes",
        path: "/heroes"
    }
];

export default MENU;