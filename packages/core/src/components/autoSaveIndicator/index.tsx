import React from "react";
import { AutoSaveIndicatorProps } from "../../interfaces";
import { useTranslate } from "@hooks/translate";

export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
    status,
    elements: {
        success = <Message tkey="autoSave.success" defaultMessage="saved" />,
        error = (
            <Message tkey="autoSave.error" defaultMessage="auto save failure" />
        ),
        loading = <Message tkey="autoSave.loading" defaultMessage="saving..." />,
        idle = (
            <Message tkey="autoSave.idle" defaultMessage="waiting for changes" />
        ),
    } = {},
}) => {
    switch (status) {
        case "success":
            return <>{success}</>;
        case "error":
            return <>{error}</>;
        case "loading":
            return <>{loading}</>;
        default:
            return <>{idle}</>;
    }
};

const Message = ({
    tkey,
    defaultMessage,
}: {
    tkey: string;
    defaultMessage: string;
}) => {
    const translate = useTranslate();

    return <span>{translate(tkey, defaultMessage)}</span>;
};
