import React from "react";

// @see https://mantine.dev/guides/jest/
//
import { render, RenderOptions } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
// Import your theme object
import { defaultTheme } from '../src/theme';
import { ITestWrapperProps } from ".";

type Options = RenderOptions<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>

const DefaultWrapper = ({ children }: { children: React.ReactElement }) => {
    return (
      <MantineProvider theme={defaultTheme}>{children}</MantineProvider>
    )
}
// Then
export function customRender(
    ui: React.ReactNode,
    options?: Options,
) {
    let NewWrapper = DefaultWrapper

    if (options) {
        const { wrapper, ...rest } = options;
        if (wrapper) {
            NewWrapper = function NewWrapper(props: ITestWrapperProps & { children: React.ReactElement }) {
                if (typeof wrapper == "undefined") {
                    return DefaultWrapper(props);
                }

                const BaseWrapper = wrapper;
                return (
                  <MantineProvider theme={defaultTheme}>
                    <BaseWrapper {...props} />
                  </MantineProvider>
                )
            }
        }

        return render(<>{ui}</>, {
            ...rest,
            wrapper: NewWrapper
        });
    }

    return render(<>{ui}</>, {
        wrapper: NewWrapper
    });
}
