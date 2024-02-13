import {
    ComboboxData,
    ComboboxItem,
    MultiSelectProps,
    Select as MantineSelect,
    MultiSelect as MantineMultiSelect,
    SelectProps
    } from "@mantine/core";
import { BaseOption } from "@refinedev/core";
import React, { useMemo } from "react";

const isString = (value: any) => typeof value === 'string' || value instanceof String;

const convertOptions = (data: (ComboboxData | undefined)): ComboboxItem[] => {
    const ret: ComboboxItem[] = []
    if (data) {
        data.forEach((opt) => {
            if (isString(opt)) {
                ret.push({
                    label: opt as string,
                    value: opt as string
                } as ComboboxItem)
            } else {
                const o = opt as ComboboxItem;
                ret.push({
                    label: o.label as string,
                    value: o.value.toString() as string
                } as ComboboxItem)
            }

        });


    }

    return ret;
}

export const Select: React.FC<SelectProps> = ({data, value, defaultValue, ...rest}) => {
    const newValue = value ? value.toString() : null;

    const newDefaultValue = defaultValue ? defaultValue.toString() : null;

    const newData = useMemo<ComboboxItem[]>(
        () => convertOptions(data),
        [data]
    );

    return (
        <MantineSelect
            value={newValue}
            data={newData}
            defaultValue={newDefaultValue}
            {...rest}
        />
    );
};


export const MultiSelect: React.FC<MultiSelectProps> = ({data, value, defaultValue, ...rest}) => {
    const newValue = value ? value.map((v) => v.toString()) : undefined;

    const newDefaultValue = defaultValue ? defaultValue.map((v) => v.toString()) : undefined;

    const newData = useMemo<ComboboxItem[]>(
        () => convertOptions(data),
        [data]
    );

    return (
        <MantineMultiSelect
            value={newValue}
            data={newData}
            defaultValue={newDefaultValue}
            {...rest}
        />
    );
};

