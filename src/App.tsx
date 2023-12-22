import { Authenticated, Refine } from '@refinedev/core'
import { DevtoolsPanel, DevtoolsProvider } from '@refinedev/devtools'
import { RefineKbar, RefineKbarProvider } from '@refinedev/kbar'

import { useNotificationProvider, ThemedLayoutV2, ErrorComponent } from '@refinedev/antd'
import '@refinedev/antd/dist/reset.css'

import { nhost, nhostAuthProvider, nhostDataProvider } from '@lib'
import { NhostProvider } from '@nhost/react'
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from '@refinedev/react-router-v6'
import { App as AntdApp, ConfigProvider } from 'antd'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import { Header, Inferencer, ResourceTable } from '@components'
import { ColorModeContextProvider } from './contexts/color-mode'
import { useResources } from '@lib/resource'
import { ENABLE_ANTD_INFERENCER, theme } from '@config'
import { RoutePath } from '@consts'
import { Login } from './pages/login'
import { ForgotPassword } from './pages/forgotPassword'
import { Register } from './pages/register'
import { Fragment } from 'react'

function App() {
  const { resources } = useResources()
  return (
    <BrowserRouter>
      <NhostProvider nhost={nhost}>
        <ConfigProvider theme={theme}>
          <RefineKbarProvider>
            <ColorModeContextProvider>
              <AntdApp>
                <DevtoolsProvider>
                  <Refine
                    dataProvider={nhostDataProvider}
                    // liveProvider={liveProvider(webSocketClient)}
                    notificationProvider={useNotificationProvider}
                    routerProvider={routerBindings}
                    authProvider={nhostAuthProvider}
                    options={{
                      syncWithLocation: true,
                      warnWhenUnsavedChanges: true,
                      useNewQueryKeys: true,
                      // projectId: "KtuFKJ-4jJpqg-cYu72x",
                      liveMode: 'auto',
                    }}
                    resources={resources}
                  >
                    <Routes>
                      <Route path={RoutePath.LOGIN} element={<Login />} />

                      <Route path={RoutePath.FORGOT_PASSWORD} element={<ForgotPassword />} />

                      <Route path={RoutePath.REGISTER} element={<Register />} />
                      <Route
                        element={
                          <Authenticated
                            key="authenticated-routes"
                            fallback={<CatchAllNavigate to={RoutePath.LOGIN} />}
                          >
                            <ThemedLayoutV2 Header={() => <Header />} Title={() => <div>贤安智慧消防</div>}>
                              <Outlet />
                            </ThemedLayoutV2>
                          </Authenticated>
                        }
                      >
                        <Route index element={<NavigateToResource resource="departments" />} />
                        {resources.map((resource) => {
                          const routes = ['list', 'edit', 'create', 'show'] as const

                          const genRoute = () => {
                            return routes.map((route) => {
                              return (
                                <Route
                                  key={resource.name}
                                  path={resource[route]}
                                  element={
                                    ENABLE_ANTD_INFERENCER ? (
                                      <Inferencer key={resource.name} action={route} resource={resource.name} />
                                    ) : (
                                      <ResourceTable
                                        {...{
                                          resource: resource.name,
                                          key: resource.name,
                                        }}
                                      />
                                    )
                                  }
                                />
                              )
                            })
                          }

                          return <Fragment key={resource.name}>{genRoute()}</Fragment>
                        })}
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
                        <Route path="*" element={<ErrorComponent />} />
                      </Route>
                    </Routes>
                    <RefineKbar />
                    <UnsavedChangesNotifier />
                    <DocumentTitleHandler />
                  </Refine>
                  <DevtoolsPanel />
                </DevtoolsProvider>
              </AntdApp>
            </ColorModeContextProvider>
          </RefineKbarProvider>
        </ConfigProvider>
      </NhostProvider>
    </BrowserRouter>
  )
}

export default App
