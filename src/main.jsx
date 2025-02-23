import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import AuthLayout from './components/AuthLayout.jsx'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Signup from './Pages/Signup.jsx'
// import AllPost from './Pages/AllPost.jsx'
import AddPost from './Pages/AddPost.jsx'
import EditPost from './Pages/EditPost.jsx'
import Post from './Pages/Post.jsx'
import { meta } from '@eslint/js'

const API_BASE_URL = import.meta.env.VITE_APP_API_URL
// || 'http://localhost:3000';
console.log(API_BASE_URL)

const router = createBrowserRouter([
  {
    path: `${API_BASE_URL}/`,
    element: <App />,
    children: [
      {
        path: `${API_BASE_URL}/`,
        element: <Home />
      }
      ,
      {
        path: `${API_BASE_URL}/signup`,
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path: `${API_BASE_URL}/login`,
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      // {
      //   path: '/all-posts',
      //   element: (
      //     <AuthLayout authentication={true}>
      //       <AllPost />
      //     </AuthLayout>
      //   )
      // },
      {
        path: `${API_BASE_URL}/add-post`,
        element: (
          <AuthLayout authentication={true}>
            <AddPost />
          </AuthLayout>
        )
      },
      {
        path: `${API_BASE_URL}/edit-post/:slug`,
        element: (
          <AuthLayout authentication={true}>
            <EditPost />
          </AuthLayout>
        )
      },
      {
        path: `${API_BASE_URL}/post/:slug`,
        element: <Post />,
      }

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
