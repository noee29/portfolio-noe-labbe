import { Link } from 'react-router-dom';

export default function PageDashboardAdmin() {
  return (
    <div>
      <h1>Dashboard Admin</h1>
      <nav>
        <ul>
          <li><Link to="/admin/projets">Projets</Link></li>
          <li><Link to="/admin/competences">Compétences</Link></li>
          <li><Link to="/admin/formations">Formations</Link></li>
          <li><Link to="/admin/contacts">Contacts</Link></li>
          <li><Link to="/admin/cv">CV</Link></li>
        </ul>
      </nav>
    </div>
  );
}
