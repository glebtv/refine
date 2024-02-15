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
    Flex,
    Box
} from "@mantine/core";

import { IconList, IconPower, IconDashboard } from "@tabler/icons";

import { ThemedTitleV2 as DefaultTitle } from "@components";
import { useThemedLayoutContext } from "@hooks";

import { RefineThemedLayoutV2SiderProps } from "../types";
import { useColorScheme, useMediaQuery } from "@mantine/hooks";

const defaultNavIcon = <IconList size={20} />;

export const ThemedSiderV2: React.FC<RefineThemedLayoutV2SiderProps> = ({
    render,
    meta,
    Title: TitleFromProps,
    activeItemDisabled = false,
}) => {
    const { siderCollapsed } =
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

    const colorScheme = useColorScheme();

    const borderColor =
        colorScheme === "dark"
            ? 'var(--mantine-color-dark-6)'
            : 'var(--mantine-color-gray-2)';

    const isDesktop = useMediaQuery('(min-width: 62em)');
    const collapsedLayout = (isDesktop && siderCollapsed) || false

    const commonNavLinkStyles =
        {
            display: "flex",
            marginTop: "12px",
            justifyContent:
                collapsedLayout
                    ? "center"
                    : "flex-start",
        };

    const commonTooltipProps: Partial<TooltipProps> = {
        disabled: collapsedLayout,
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
                activeItemDisabled && isSelected
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
                                collapsedLayout
                                    ? null
                                    : label
                            }
                            leftSection={icon ?? defaultNavIcon}
                            active={isSelected}
                            childrenOffset={
                                collapsedLayout ? 0 : 12
                            }
                            defaultOpened={defaultOpenKeys.includes(
                                item.key || "",
                            )}
                            pl={collapsedLayout ? "18px" : "12px"}
                            style={[commonNavLinkStyles, disablePointerStyle]}
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
                        collapsedLayout
                            ? null
                            : t("dashboard.title", "Dashboard")
                    }
                    leftSection={<IconDashboard size={20} />}
                    pl={collapsedLayout ? "18px" : "12px"}
                    component={Link as any}
                    to="/"
                    active={selectedKey === "/"}
                    style={commonNavLinkStyles}
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
                    collapsedLayout
                        ? null
                        : t("buttons.logout", "Logout")
                }
                leftSection={<IconPower size={20} />}
                pl={collapsedLayout ? "18px" : "12px"}
                onClick={handleLogout}
                style={commonNavLinkStyles}
            />
        </Tooltip>
    );

    const renderSider = () => {
        if (render) {
            return render({
                dashboard,
                logout,
                items,
                collapsed: collapsedLayout,
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
        <>
            <Flex
                h="64px"
                pl={collapsedLayout ? 0 : "16px"}
                align="center"
                justify={collapsedLayout ? "center" : "flex-start"}
                style={{
                    borderBottom: `1px solid ${borderColor}`,
                }}
            >
                <RenderToTitle collapsed={collapsedLayout} />
            </Flex>
            <Box
                mod={'grow'}
                component={ScrollArea}
                mx="-xs"
                px="xs"
            >
                {renderSider()}
            </Box>
        </>
    );
};
