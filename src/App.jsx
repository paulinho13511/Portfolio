import { useState } from 'react';
import StatusBar from './components/StatusBar.jsx';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx';
import ProjectDrawer from './components/ProjectDrawer.jsx';
import StackLayers from './components/StackLayers.jsx';
import ApiPlayground from './components/ApiPlayground.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-14 focus:z-[60] focus:rounded focus:bg-accent focus:px-3 focus:py-2 focus:text-ink"
      >
        Pular para o conteúdo
      </a>
      <StatusBar />
      <main id="conteudo" className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <Hero />
        <Projects onSelect={setSelected} />
        <StackLayers />
        <ApiPlayground />
      </main>
      <Footer />
      <ProjectDrawer project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
