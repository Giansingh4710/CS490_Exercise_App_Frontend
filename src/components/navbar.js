import { Link } from 'react-router-dom'
import './styles.css'

export default function Navbar() {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navbarUl}>
        <ATag href='/'>Landing Page</ATag>
        <ATag href='/other'>Other Page</ATag>
      </ul>
    </nav>
  )
}

function ATag({ href, children }) {
  return (
    <li>
      <Link to={href} style={styles.navLink} className='linkATag'>
        {children}
      </Link>
    </li>
  )
}

const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '10px',
  },
  navbarUl: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    padding: '0',
  },
  navLink: {
    textDecoration: 'none',
    color: '#fff',
    margin: '0 15px',
  },
}
