import { BrowserRouter, Switch, Route } from 'react-router-dom'
import loadable from '@loadable/component'

import Main from '../components/Main'
import Home from '../containers/Home'
import pages, { Page } from './pages'

const PageComponent = loadable((props: any) => import(`../pages${props.path}`))

function getPaths(routes: Page[]):string[] {
  return ([] as string[]).concat(...routes.map(page => page.routes ? getPaths(page.routes) : page.path || '')).filter(Boolean)
}

const createRoutes = () => (
  <BrowserRouter>
    <Main>
      <Switch>
        <Route component={Home} path='/' />
        {
          getPaths(pages).map((path: string, index: number) => (
            <Route
              component={() => <PageComponent path={path} />}
              key={`page-${index}`}
              path={path} />
          ))
        }
      </Switch>
    </Main>
  </BrowserRouter>
)

export default createRoutes
