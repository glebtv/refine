import React, { CSSProperties } from "react";
import {
    CanAccess,
    ITreeMenu,
    useIsExistAuthentication,
    useLink,
    useLogout,
    useMenu,
    useActiveAuthProvider,
    useRefineContext,
    useRouterContext,
    useRouterType,
    useTitle,
    useTranslate,
    useWarnAboutChange,
} from "@refinedev/core";
import {
    AppShell,
    NavLink,
    ScrollArea,
    Tooltip,
    TooltipProps,
    useMantineTheme,
    Flex,
} from "@mantine/core";

import { IconList, IconPower, IconDashboard } from "@tabler/icons";

import { ThemedTitle as DefaultTitle } from "@components";
import { useThemedLayoutContext } from "@hooks";

import { RefineThemedLayoutSiderProps } from "../types";

const defaultNavIcon = <IconList size={20} />;

export const ThemedSider: React.FC<RefineThemedLayoutSiderProps> = ({
    render,
    meta,
    Title: TitleFromProps,
}) => {
    const theme = useMantineTheme();
    const { siderCollapsed, mobileSiderOpen, setMobileSiderOpen } =
        useThemedLayoutContext();

    const routerType = useRouterType();
    const NewLink = useLink();
    const { Link: LegacyLink } = useRouterContext();
    const Link = routerType === "legacy" ? LegacyLink : NewLink;

    const { defaultOpenKeys, menuItems, selectedKey } = useMenu({ meta });
    const TitleFromContext = useTitle();
    const isExistAuthentication = useIsExistAuthentication();
    const t = useTranslate();
    const { hasDashboard } = useRefineContext();
    const authProvider = useActiveAuthProvider();
    const { warnWhen, setWarnWhen } = useWarnAboutChange();
    const { mutate: mutateLogout } = useLogout({
        v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
    });

    const RenderToTitle = TitleFromProps ?? TitleFromContext ?? DefaultTitle;

    const drawerWidth = () => {
        if (siderCollapsed) return 80;
        return 200;
    };

    const commonTooltipProps: Partial<TooltipProps> = {
        disabled: !siderCollapsed || mobileSiderOpen,
        position: "right",
        withinPortal: true,
        withArrow: true,
        arrowSize: 8,
        arrowOffset: 12,
        offset: 4,
    };

    const renderTreeView = (tree: ITreeMenu[], selectedKey?: string) => {
        return tree.map((item) => {
            const { icon, label, route, name, children } = item;

            const isSelected = item.key === selectedKey;
            const isParent = children.length > 0;

            const additionalLinkProps = isParent
                ? {}
                : { component: Link as any, to: route };

            const disablePointerStyle: CSSProperties =
                isSelected
                    ? { pointerEvents: "none" }
                    : {};

            return (
                <CanAccess
                    key={item.key}
                    resource={name.toLowerCase()}
                    action="list"
                    params={{
                        resource: item,
                    }}
                >
                    <Tooltip label={label} {...commonTooltipProps}>
                        <NavLink
                            key={item.key}
                            label={
                                siderCollapsed && !mobileSiderOpen
                                    ? null
                                    : label
                            }
                            leftSection={icon ?? defaultNavIcon}
                            active={isSelected}
                            childrenOffset={
                                siderCollapsed && !mobileSiderOpen ? 0 : 12
                            }
                            defaultOpened={defaultOpenKeys.includes(
                                item.key || "",
                            )}
                            pl={
                                siderCollapsed || mobileSiderOpen
                                    ? "12px"
                                    : "18px"
                            }
                            style={disablePointerStyle}
                            {...additionalLinkProps}
                        >
                            {isParent && renderTreeView(children, selectedKey)}
                        </NavLink>
                    </Tooltip>
                </CanAccess>
            );
        });
    };

    const items = renderTreeView(menuItems, selectedKey);

    const dashboard = hasDashboard ? (
        <CanAccess resource="dashboard" action="list">
            <Tooltip
                label={t("dashboard.title", "Dashboard")}
                {...commonTooltipProps}
            >
                <NavLink
                    key="dashboard"
                    label={
                        siderCollapsed && !mobileSiderOpen
                            ? null
                            : t("dashboard.title", "Dashboard")
                    }
                    leftSection={<IconDashboard size={20} />}
                    component={Link as any}
                    to="/"
                    active={selectedKey === "/"}
                />
            </Tooltip>
        </CanAccess>
    ) : null;

    const handleLogout = () => {
        if (warnWhen) {
            const confirm = window.confirm(
                t(
                    "warnWhenUnsavedChanges",
                    "Are you sure you want to leave? You have unsaved changes.",
                ),
            );

            if (confirm) {
                setWarnWhen(false);
                mutateLogout();
            }
        } else {
            mutateLogout();
        }
    };

    const logout = isExistAuthentication && (
        <Tooltip label={t("buttons.logout", "Logout")} {...commonTooltipProps}>
            <NavLink
                key="logout"
                label={
                    siderCollapsed && !mobileSiderOpen
                        ? null
                        : t("buttons.logout", "Logout")
                }
                leftSection={<IconPower size={20} />}
                pl={siderCollapsed || mobileSiderOpen ? "12px" : "18px"}
                onClick={handleLogout}
            />
        </Tooltip>
    );

    const renderSider = () => {
        if (render) {
            return render({
                dashboard,
                logout,
                items,
                collapsed: siderCollapsed,
            });
        }
        return (
            <>
                {dashboard}
                {items}
                {logout}
            </>
        );
    };

    return (
        <AppShell.Navbar>
            <Flex
                h="64px"
                pl={siderCollapsed ? 0 : "16px"}
                align="center"
                justify={siderCollapsed ? "center" : "flex-start"}
                // style={{
                     // borderBottom: `1px solid ${borderColor}`,
                // }}
            >
                <RenderToTitle collapsed={siderCollapsed} />
            </Flex>
            <AppShell.Section
                grow
                component={ScrollArea}
                mx="-xs"
                px="xs"
                // sx={{
                //     ".mantine-ScrollArea-viewport": {
                //         borderRight: `1px solid ${borderColor}`,
                //         borderBottom: `1px solid ${borderColor}`,
                //     },
                // }}
            >
                {renderSider()}
            </AppShell.Section>
        </AppShell.Navbar>
    );
};
