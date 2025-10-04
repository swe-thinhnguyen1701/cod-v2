import { Avatar, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useAuthStore } from "../state-management/authStore";
import { Link } from "react-router-dom";


const UserMenu = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    if (!user)
        return;

    return (
        <Menu>
            <MenuButton>
                <Avatar name={user.name} src={user.image ?? ""} />
            </MenuButton>
            <MenuList>
                <MenuItem>
                    <Link to="/profile">
                        Profile
                    </Link>
                </MenuItem>
                {user.isAdmin &&
                    <MenuItem>
                        <Link to="/admin">
                            Admin Management
                        </Link>
                    </MenuItem>
                }
                <MenuItem onClick={logout}>
                    Logout
                </MenuItem>
            </MenuList>
        </Menu>
    )
}

export default UserMenu;