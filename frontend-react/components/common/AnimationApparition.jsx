// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

/**
 * AnimationApparition - Composant réutilisable pour animer l'apparition d'un élément.
 *
 * Props :
 *  - children : contenu à animer
 *  - delai    : délai avant le début de l'animation (en secondes)
 *  - duree    : durée de l'animation (en secondes)
 *  - direction : "haut" | "bas" | "gauche" | "droite"
 *  - distance : distance du décalage initial en pixels
 *  - className : classes CSS supplémentaires
 */
export default function AnimationApparition(props) {
  const children = props.children;
  const delai = props.delai || 0;
  const duree = props.duree || 0.5;
  const direction = props.direction || 'haut';
  const distance = props.distance || 30;
  const className = props.className || '';

  // Calcul du décalage initial selon la direction
  let decalageX = 0;
  let decalageY = 0;

  if (direction === 'haut') {
    decalageY = distance;
  } else if (direction === 'bas') {
    decalageY = -distance;
  } else if (direction === 'gauche') {
    decalageX = distance;
  } else if (direction === 'droite') {
    decalageX = -distance;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: decalageX, y: decalageY }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: duree, delay: delai, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
