import { HttpError, IResourceComponentsProps } from "@refinedev/core";

import { Create, useForm } from "@refinedev/antd";

import { Form, Input } from "antd";

import {
    CreateCategoryMutation,
    CreateCategoryMutationVariables,
} from "graphql/types";
import { GetFields, GetVariables } from "@refinedev/hasura";
import { CATEGORY_CREATE_MUTATION } from "./queries";

export const CategoryCreate: React.FC<IResourceComponentsProps> = () => {
    const { formProps, saveButtonProps } = useForm<
        GetFields<CreateCategoryMutation>,
        HttpError,
        GetVariables<CreateCategoryMutationVariables>
    >({
        metaData: {
            gqlMutation: CATEGORY_CREATE_MUTATION,
        },
    });

    return (
        <Create saveButtonProps={saveButtonProps}>
            <Form {...formProps} layout="vertical">
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Create>
    );
};
