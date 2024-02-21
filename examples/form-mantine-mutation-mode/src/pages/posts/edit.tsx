import { Edit, useForm, useSelect, Select } from "@refinedev/mantine";
import { TextInput, Text } from "@mantine/core";
import MDEditor from "@uiw/react-md-editor";

import { ICategory } from "../../interfaces";

export const PostEdit: React.FC = () => {
    const {
        saveButtonProps,
        getInputProps,
        errors,
        refineCore: { queryResult },
    } = useForm({
        initialValues: {
            title: "",
            status: "",
            category: {
                id: "",
            },
            content: "",
        },
        validate: {
            title: (value) => (value.length < 2 ? "Too short title" : null),
            status: (value) =>
                value?.length <= 0 || !value ? "Status is required" : null,
            category: {
                id: (value) =>
                    value?.length <= 0 || !value
                        ? "Category is required"
                        : null,
            },
            content: (value) =>
                value.length < 10 ? "Too short content" : null,
        },
    });

    const { selectProps } = useSelect<ICategory>({
        resource: "categories",
        defaultValue: queryResult?.data?.data.category.id,
    });

    return (
        <Edit saveButtonProps={saveButtonProps}>
            <form>
                <TextInput
                    mt={8}
                    id="title"
                    label="Title"
                    placeholder="Title"
                    {...getInputProps("title")}
                />
                <Select
                    mt={8}
                    id="status"
                    label="Status"
                    placeholder="Pick one"
                    {...getInputProps("status")}
                    data={[
                        { label: "Published", value: "published" },
                        { label: "Draft", value: "draft" },
                        { label: "Rejected", value: "rejected" },
                    ]}
                />
                <Select
                    mt={8}
                    id="categoryId"
                    label="Category"
                    placeholder="Pick one"
                    {...getInputProps("category.id")}
                    {...selectProps}
                />
                <Text mt={8} fw={500} size="sm" color="#212529">
                    Content
                </Text>
                <MDEditor
                    id="content"
                    data-color-mode="light"
                    {...getInputProps("content")}
                />
                {errors.content && (
                    <Text
                        id="content-error"
                        mt={2}
                        fw={500}
                        size="xs"
                        color="red"
                    >
                        {errors.content}
                    </Text>
                )}
            </form>
        </Edit>
    );
};
