/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as HomeImport } from './routes/home'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const HomeRoute = HomeImport.update({
  id: '/home',
  path: '/home',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/home': {
      id: '/home'
      path: '/home'
      fullPath: '/home'
      preLoaderRoute: typeof HomeImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/home': typeof HomeRoute
  '/login': typeof LoginRoute
}

export interface FileRoutesByTo {
  '/home': typeof HomeRoute
  '/login': typeof LoginRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/home': typeof HomeRoute
  '/login': typeof LoginRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/home' | '/login'
  fileRoutesByTo: FileRoutesByTo
  to: '/home' | '/login'
  id: '__root__' | '/home' | '/login'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  HomeRoute: typeof HomeRoute
  LoginRoute: typeof LoginRoute
}

const rootRouteChildren: RootRouteChildren = {
  HomeRoute: HomeRoute,
  LoginRoute: LoginRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/home",
        "/login"
      ]
    },
    "/home": {
      "filePath": "home.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
