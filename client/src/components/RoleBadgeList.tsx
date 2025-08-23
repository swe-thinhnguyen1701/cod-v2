import type RoleEntity from "../entities/RoleEntity";
import RoleBadge from "./RoleBadge";
import { UnorderedList, ListItem } from "@chakra-ui/react";

interface Props {
    roles: RoleEntity[]
    isShorten?: boolean
}

const RoleBadgeList = ({ roles, isShorten }: Props) => {
    return (
        <UnorderedList display="flex" listStyleType="none" padding={0} margin={0} gap={4}>
            {roles.map((role, idx) => (
                <ListItem key={idx}>
                    <RoleBadge role={role} type={idx} isShorten={isShorten} />
                </ListItem>
            ))}
        </UnorderedList>
    )
}

export default RoleBadgeList;