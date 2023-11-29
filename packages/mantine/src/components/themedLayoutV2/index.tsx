import React from "react";
import { AppShell } from "@mantine/core";

import { RefineThemedLayoutV2Props } from "./types";
import { ThemedSiderV2 as DefaultSider } from "./sider";
import { ThemedHeaderV2 as DefaultHeader } from "./header";
import { ThemedLayoutContextProvider } from "../../contexts";

export const ThemedLayoutV2: React.FC<RefineThemedLayoutV2Props> = ({
    Sider,
    Header,
    Title,
    Footer,
    OffLayoutArea,
    initialSiderCollapsed,
    children,
}) => {
    const SiderToRender = Sider ?? DefaultSider;
    const HeaderToRender = Header ?? DefaultHeader;

  return (
    <ThemedLayoutContextProvider
        initialSiderCollapsed={initialSiderCollapsed}
        >
          <AppShell
            header={{ height: 50 }}
            navbar={{ width: 200, breakpoint: 'sm', collapsed: { mobile: true } }}
            padding="md"
          >

            <HeaderToRender />

            <SiderToRender Title={Title} />

            <AppShell.Main>
              {children}

              {Footer && <Footer />}
            </AppShell.Main>

            {OffLayoutArea && <OffLayoutArea />}
          </AppShell>
        </ThemedLayoutContextProvider>
      )
};
