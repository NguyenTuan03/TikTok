import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { publicRoutes } from './Routes/Routes'
import DefaultLayout from './Components/Layout/DefaultLayout/DefaultLayout'
import { Fragment } from 'react'
export default function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          {publicRoutes.map((item,index) => {
            // const Layout = item.layout === null ? Fragment : HeaderOnly;
            let Layout = DefaultLayout;
            if (item.layout) {
              Layout = item.layout;
            }
            else if (item.layout === null) {
              Layout = Fragment;
            }
            const Page = item.component
            return <Route 
              key={index} 
              path={item.path} 
              element={ <Layout>
                          <Page/>
                        </Layout>
                      }
            />
          })}
        </Routes>
      </div>
    </Router>
  ) 
}

