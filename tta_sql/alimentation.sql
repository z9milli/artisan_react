/* Table catégorie */
CREATE TABLE `categorie` (
    `id_categorie` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nom_categorie` VARCHAR(100) NOT NULL;
);
INSERT INTO `categorie`(`nom_categorie`) VALUES 
('Alimentation'), 
('Bâtiment'),
('Fabrication'),
('Services');

/* Table spécialité */
CREATE TABLE `specialite` (
    `id_specialite` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nom_specialite` VARCHAR(100) NOT NULL,
    `id_categorie` INT NOT NULL,
    FOREIGN KEY (`id_categorie`) 
    REFERENCES `categorie`(`id_categorie`) 
    ON DELETE RESTRICT ON UPDATE RESTRICT;
);
INSERT INTO `specialite`(`nom_specialite`, `id_categorie`) VALUES 
('Boucher', 1),
('Boulanger', 1),
('Chocolatier', 1),
('Traiteur', 1),
('Chauffagiste', 2),
('Electricien', 2),
('Menuisier', 2),
('Plombier', 2),
('Bijoutier', 3),
('Couturier', 3),
('Ferronier', 3),
('Coiffeur', 4),
('Fleuriste', 4),
('Toiletteur', 4),
('Webdesign', 4);

/* Table artisan */
CREATE TABLE `artisan` (
    `id_artisan` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    `nom` VARCHAR(100) NOT NULL, 
    `note` DECIMAL(2,1) NOT NULL, 
    `ville` VARCHAR(100) NOT NULL, 
    `a_propos` TEXT NOT NULL, 
    `email` VARCHAR(150) NOT NULL, 
    `site_web` VARCHAR(250) NOT NULL, 
    `top` BOOLEAN NOT NULL DEFAULT FALSE,
    `id_specialite` INT NOT NULL,
    FOREIGN KEY (`id_specialite`) 
    REFERENCES `specialite`(`id_specialite`)
    ON DELETE RESTRICT ON UPDATE RESTRICT;
);
INSERT INTO `artisan` (`nom`, `note`, `ville`, `a_propos`, `email`, `site_web`, `top`, `id_specialite`) VALUES
('Boucherie Dumont', 4.5, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'boucherie.dumond@gmail.com', NULL, 0, 1),
('Au pain chaud', 4.8, 'Montélimar', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'aupainchaud@hotmail.com', NULL 1, 2 ),
('Chocolaterie Labbé', 4.9, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'chocolaterie-labbe@gmail.com', 'https://chocolaterie-labbe.fr', 1, 3),
('Traiteur Truchon', 4.1, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'contact@truchon-traiteur.fr', 'https://truchon-traiteur.fr', 0, 4),
('Orville Salmons', 5.0, 'Evian', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'o-salmons@live.com', NULL, 1, 5),
('Mont Blanc Eléctricité', 4.5, 'Chamonix', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'contact@mont-blanc-electricite.com', `https://mont-blanc-electricite.com`, 0, 6),
('Boutot & fils', 4.7, 'Bourg-en-bresse', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'boutot-menuiserie@gmail.com', 'https://boutot-menuiserie.com', 0, 7),
('Vallis Bellemare', 4.0, 'Vienne', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'v.bellemare@gmail.com', 'https://plomberie-bellemare.com', 0, 8),
('Claude Quinn', 4.2, 'Aix-les-bains', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'claude.quinn@gmail.com', NULL, 0, 9),
('Amitee Lécuyer', 4.5, 'Annecy', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'a.amitee@hotmail.com', 'https://lecuyer-couture.com', 0, 10),
('Ernest Carignan', 5.0, 'Le Puy-en-Velay', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'e-carigan@hotmail.com', NULL, 0, 11),
('Royden Charbonneau', 3.8, 'Saint-Priest', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'r.charbonneau@gmail.com', NULL, 0, 12),
('Leala Dennis', 3.8, 'Chambéry', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'l.dennis@hotmail.fr', 'https://coiffure-leala-chambery.fr', 0, 12),
('C''est sup''hair', 4.1, 'Romans-sur-Isère', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'sup-hair@gmail.com', 'https://sup-hair.fr', 0, 12),
('Le monde des fleurs', 4.6, 'Annonay', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'contact@le-monde-des-fleurs-annonay.fr', 'https://le-monde-des-fleurs-annonay.fr', 0, 13),
('Valérie Laderoute', 4.5, 'Valence', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'v-laderoute@gmail.com', NULL, 0, 14),
('CM Graphisme', 4.4, 'Valence', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'contact@cm-graphisme.com', 'https://cm-graphisme.com', 0, 15);

