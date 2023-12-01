import React from "react";
import { NotificationProvider } from "@refinedev/core";
import {
    showNotification,
    updateNotification,
    hideNotification,
} from "@mantine/notifications";
import { ActionIcon, Box, Group, Text } from "@mantine/core";
import { IconCheck, IconRotate2, IconX } from "@tabler/icons";

import { RingCountdown } from "@components";

export const notificationProvider = (): NotificationProvider => {
    const activeNotifications: string[] = [];

    const isNotificationActive = (key?: string) => {
        return activeNotifications.includes(key as string);
    };

    const addNotification = (key?: string) => {
        if (key) {
            const index = activeNotifications.indexOf(key);
            if (index === -1) {
                activeNotifications.push(key);
            }
        }
    };

    const removeNotification = (key?: string) => {
        if (key) {
            const index = activeNotifications.indexOf(key);
            if (index > -1) {
                activeNotifications.splice(index, 1);
            }
        }
    };

    const notificationProvider: NotificationProvider = {
        open: ({
            message,
            description,
            type,
            undoableTimeout,
            key,
            cancelMutation,
        }) => {
            if (type === "progress") {
                if (isNotificationActive(key)) {
                    updateNotification({
                        id: key!,
                        message: (
                            <Group justify="space-between" wrap="nowrap">
                                <Group gap="xs" justify="center">
                                    <RingCountdown
                                        undoableTimeout={undoableTimeout ?? 0}
                                    />
                                    <Box>
                                        <Text>{message}</Text>
                                        {description && (
                                            <Text>{description}</Text>
                                        )}
                                    </Box>
                                </Group>
                                <ActionIcon
                                    variant="default"
                                    onClick={() => {
                                        cancelMutation?.();
                                        if (key) {
                                            removeNotification(key);
                                            hideNotification(key);
                                        }
                                    }}
                                >
                                    <IconRotate2 size={18} />
                                </ActionIcon>
                            </Group>
                        ),
                        autoClose: false,
                    });
                } else {
                    addNotification(key);
                    showNotification({
                        id: key,
                        message: (
                            <Group justify="space-between" wrap="nowrap">
                                <Group gap="xs" justify="center">
                                    <RingCountdown
                                        undoableTimeout={undoableTimeout ?? 0}
                                    />
                                    <Box>
                                        <Text>{message}</Text>
                                        {description && (
                                            <Text>{description}</Text>
                                        )}
                                    </Box>
                                </Group>
                                <ActionIcon
                                    variant="default"
                                    onClick={() => {
                                        cancelMutation?.();
                                        if (key) {
                                            removeNotification(key);
                                            hideNotification(key);
                                        }
                                    }}
                                >
                                    <IconRotate2 size={18} />
                                </ActionIcon>
                            </Group>
                        ),
                        autoClose: false,
                    });
                }
            } else {
                if (isNotificationActive(key)) {
                    updateNotification({
                        id: key!,
                        color: type === "success" ? "primary" : "red",
                        icon:
                            type === "success" ? (
                                <IconCheck size={18} />
                            ) : (
                                <IconX size={18} />
                            ),
                        message,
                        title: description,
                        autoClose: 5000,
                    });
                } else {
                    addNotification(key);
                    showNotification({
                        color: type === "success" ? "primary" : "red",
                        icon:
                            type === "success" ? (
                                <IconCheck size={18} />
                            ) : (
                                <IconX size={18} />
                            ),
                        message,
                        title: description,
                        onClose: () => {
                            removeNotification(key);
                        },
                        autoClose: 5000,
                    });
                }
            }
        },
        close: (key) => {
            removeNotification(key);
            hideNotification(key);
        },
    };

    return notificationProvider;
};
