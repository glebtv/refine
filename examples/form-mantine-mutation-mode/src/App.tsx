import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { GitHubBanner, MutationMode, Refine } from "@refinedev/core";
import {
    ThemedLayoutV2,
    ErrorComponent,
    useNotificationProvider,
    RefineThemes,
} from "@refinedev/mantine";
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    NavigateToResource,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";

import { PostCreate, PostEdit, PostList } from "./pages";
import { useState } from "react";
import MutationModePicker from "./components/mutation-mode-picker";

const API_URL = "https://api.fake-rest.refine.dev";

const App: React.FC = () => {
    const [mutationMode, setMutationMode] = useState<MutationMode>("undoable");

    return (
        <BrowserRouter>
            <GitHubBanner />
            <MantineProvider
                theme={RefineThemes.Blue}
            >
                <Refine
                    routerProvider={routerProvider}
                    dataProvider={dataProvider(API_URL)}
                    notificationProvider={useNotificationProvider}
                    resources={[
                        {
                            name: "posts",
                            list: "/posts",
                            create: "/posts/create",
                            edit: "/posts/edit/:id",
                            meta: {
                                canDelete: true,
                            },
                        },
                    ]}
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                        mutationMode: mutationMode,
                    }}
                >
                    <Routes>
                        <Route
                            element={
                                <ThemedLayoutV2>
                                    <Outlet />
                                </ThemedLayoutV2>
                            }
                        >
                            <Route
                                index
                                element={
                                    <NavigateToResource resource="posts" />
                                }
                            />

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
                            </Route>

                            <Route path="*" element={<ErrorComponent />} />
                        </Route>
                    </Routes>
                </Refine>
                <Notifications />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
                <MutationModePicker
                    currentMutationMode={mutationMode}
                    onMutationModeChange={setMutationMode}
                />
            </MantineProvider>
        </BrowserRouter>
    );
};

export default App;
