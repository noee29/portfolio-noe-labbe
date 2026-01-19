import SectionAccueil from '../components/home/SectionAccueil.jsx';
import SectionAPropos from '../components/home/SectionAPropos.jsx';
import SectionProjets from '../components/home/SectionProjets.jsx';
import SectionCompetences from '../components/home/SectionCompetences.jsx';
import SectionFormations from '../components/home/SectionFormations.jsx';
import SectionContact from '../components/home/SectionContact.jsx';

export default function Home() {
  return (
    <>
      <SectionAccueil />
      <SectionAPropos />
      <SectionProjets />
      <SectionCompetences />
      <SectionFormations />
      <SectionContact />
    </>
  );
}
