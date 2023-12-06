import NavBar from './NavBar';
import Footer  from './Footer';

const LayoutComponent = ({ children }) => {
  return (
    <div className="layout">
      <header>
        <NavBar/>
      </header>
      <main className="main-container">
        {children}
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default LayoutComponent;