import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import TextStyler from './pages/TextStyler'
import BoxShadow from './pages/BoxShadow'
import BorderRadius from './pages/BorderRadius'
import FlexboxBuilder from './pages/FlexboxBuilder'
import ButtonGenerator from './pages/ButtonGenerator'
import BoxModel from './pages/BoxModel'
import LayoutBuilder from './pages/LayoutBuilder'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="text-styler" element={<TextStyler />} />
          <Route path="box-shadow" element={<BoxShadow />} />
          <Route path="border-radius" element={<BorderRadius />} />
          <Route path="flexbox" element={<FlexboxBuilder />} />
          <Route path="button" element={<ButtonGenerator />} />
          <Route path="box-model" element={<BoxModel />} />
          <Route path="layout-builder" element={<LayoutBuilder />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
