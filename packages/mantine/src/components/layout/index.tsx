import React from "react";
import { AppShell } from "@mantine/core";

import { RefineLayoutLayoutProps } from "./types";
import { Sider as DefaultSider } from "./sider";
import { Header as DefaultHeader } from "./header";
import { ThemedLayoutContextProvider } from "../../contexts";

export const Layout: React.FC<RefineLayoutLayoutProps> = ({
    Sider,
    Header,
    Title,
    Footer,
    OffLayoutArea,
    children,
}) => {
    const SiderToRender = Sider ?? DefaultSider;
    const HeaderToRender = Header ?? DefaultHeader;

  return (
    <ThemedLayoutContextProvider>
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
