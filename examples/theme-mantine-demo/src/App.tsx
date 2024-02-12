import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { useState } from "react";
import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import {
    ThemedLayoutV2,
    ErrorComponent,
    useNotificationProvider,
    AuthPage,
    RefineThemes,
} from "@refinedev/mantine";
import { Notifications } from "@mantine/notifications";
import {
    MantineProvider,
} from "@mantine/core";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    NavigateToResource,
    CatchAllNavigate,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { IconBrandGoogle, IconBrandGithub } from "@tabler/icons";

import { PostCreate, PostEdit, PostList, PostShow } from "./pages";
import { authProvider } from "./authProvider";
import ThemeSettings from "./components/theme-settings";
import DashboardPage from "./pages/dashboard";

const App: React.FC = () => {
    const [customTheme, setCustomTheme] = useState(RefineThemes.Blue);

    return (
        <BrowserRouter>
            <GitHubBanner />
                <MantineProvider
                    theme={{
                        ...customTheme,
                    }}
                >
                    <ThemeSettings
                        onThemeClick={(theme) => setCustomTheme(theme)}
                    />
                        <Refine
                            routerProvider={routerProvider}
                            authProvider={authProvider}
                            dataProvider={dataProvider(
                                "https://api.fake-rest.refine.dev",
                            )}
                            notificationProvider={useNotificationProvider}
                            resources={[
                                {
                                    name: "posts",
                                    meta: { route: "posts", label: "test label" },
                                    list: "/posts",
                                    show: "/posts/show/:id",
                                    create: "/posts/create",
                                    edit: "/posts/edit/:id",
                                },
                            ]}
                            options={{
                                syncWithLocation: true,
                                warnWhenUnsavedChanges: true,
                            }}
                        >
                            <Routes>
                                <Route
                                    element={
                                        <Authenticated
                                            key="authenticated-routes"
                                            fallback={
                                                <CatchAllNavigate to="/login" />
                                            }
                                        >
                                            <ThemedLayoutV2>
                                                <Outlet />
                                            </ThemedLayoutV2>
                                        </Authenticated>
                                    }
                                >
                                    <Route index element={<DashboardPage />} />

                                    <Route path="/posts">
                                        <Route index element={<PostList />} />
                                        <Route
                                            path="create"
                                            element={<PostCreate />}
                                        />
                                        <Route
                                            path="edit/:id"
                                            element={<PostEdit />}
                                        />
                                        <Route
                                            path="show/:id"
                                            element={<PostShow />}
                                        />
                                    </Route>
                                </Route>

                                <Route
                                    element={
                                        <Authenticated
                                            key="auth-pages"
                                            fallback={<Outlet />}
                                        >
                                            <NavigateToResource resource="posts" />
                                        </Authenticated>
                                    }
                                >
                                    <Route
                                        path="/login"
                                        element={
                                            <AuthPage
                                                type="login"
                                                providers={[
                                                    {
                                                        name: "google",
                                                        label: "Sign in with Google",
                                                        icon: (
                                                            <IconBrandGoogle size="16px" />
                                                        ),
                                                    },
                                                    {
                                                        name: "github",
                                                        label: "Sign in with GitHub",
                                                        icon: (
                                                            <IconBrandGithub size="16px" />
                                                        ),
                                                    },
                                                ]}
                                            />
                                        }
                                    />
                                    <Route
                                        path="/register"
                                        element={
                                            <AuthPage
                                                type="register"
                                                providers={[
                                                    {
                                                        name: "google",
                                                        label: "Sign in with Google",
                                                        icon: (
                                                            <IconBrandGoogle size="16px" />
                                                        ),
                                                    },
                                                    {
                                                        name: "github",
                                                        label: "Sign in with GitHub",
                                                        icon: (
                                                            <IconBrandGithub size="16px" />
                                                        ),
                                                    },
                                                ]}
                                            />
                                        }
                                    />
                                    <Route
                                        path="/forgot-password"
                                        element={
                                            <AuthPage type="forgotPassword" />
                                        }
                                    />
                                    <Route
                                        path="/update-password"
                                        element={
                                            <AuthPage type="updatePassword" />
                                        }
                                    />
                                </Route>

                                <Route
                                    element={
                                        <Authenticated key="catch-all">
                                            <ThemedLayoutV2>
                                                <Outlet />
                                            </ThemedLayoutV2>
                                        </Authenticated>
                                    }
                                >
                                    <Route
                                        path="*"
                                        element={<ErrorComponent />}
                                    />
                                </Route>
                            </Routes>
                            <Notifications />
                            <UnsavedChangesNotifier />
                            <DocumentTitleHandler />
                        </Refine>
                </MantineProvider>
        </BrowserRouter>
    );
};

export default App;
