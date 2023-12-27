import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import { Fragment } from 'react'
import ChangeTheme from './Components/changeTheme/ChangeTheme'
import { publicRoutes } from './Routes/Routes.js'
import 'prettier'
import DefaultLayout from './layout/mainLayout/DefaultLayout.js'
export default function App() {
    return ( 
    <Router>
        <ChangeTheme>
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
        </ChangeTheme>
    </Router>
  ) 
}

