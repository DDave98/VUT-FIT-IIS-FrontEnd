-- pro opakovani skriptu se smazou tabulky
DROP TABLE users;

-- tabulka uživatelé
CREATE TABLE `epiz_30046706_IISD`.`iis_users` ( 
    `login` VARCHAR(40) NOT NULL, 
    `heslo` TEXT NOT NULL , 
    `jmeno` TEXT NOT NULL , 
    `prijmeni` TEXT NOT NULL , 
    `opravneni` TEXT NOT NULL , 
    PRIMARY KEY (`login`(40))
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_czech_ci; 

-- tabulka pro rozvrh
CREATE TABLE `epiz_30046706_IISD`,'time_table' (
	'od' data
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_czech_ci; 

-- tabulka pro prezentace
CREATE TABLE `davidmichali6241`.`iis_prez` (
    `pid` INT NOT NULL AUTO_INCREMENT , 
    `nazev` TEXT NOT NULL , 
    `popis` TEXT NULL , 
    `tagy` TEXT NULL , 
    `foto` TEXT NULL , 
    `schvaleno` VARCHAR(20) NOT NULL , 
    `prezentaceurl` TEXT NULL , 
    `prednasejici` INT NOT NULL , 
    `konference` INT NOT NULL , 
    PRIMARY KEY (`pid`)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_czech_ci; 

-- tabulka pro konference
CREATE TABLE `davidmichali6241`.`iis_conf` (
    `cid` INT NOT NULL AUTO_INCREMENT , 
    `nazev` TEXT NOT NULL , 
    `popis` TEXT NULL , 
    `tema` TEXT NULL , 
    `adresa` TEXT NOT NULL , 
    `vstupne` DECIMAL NOT NULL DEFAULT '0' , 
    `kapacita` INT NOT NULL DEFAULT '1000' , 
    `od` DATETIME NOT NULL , 
    `do` DATETIME NOT NULL , 
    `poradatel` VARCHAR(40) NOT NULL , 
    PRIMARY KEY (`cid`)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_czech_ci; 

-- tabulka pro mistnost

-- tabulka pro rezervace
CREATE TABLE `davidmichali6241`.`iis_rezerv` ( 
    `registrovany` VARCHAR(40) NOT NULL , 
    `konference` INT NOT NULL , 
    `stav` TEXT NOT NULL , 
    `zaplaceno` BOOLEAN NOT NULL DEFAULT FALSE , 
    `pocet` INT NOT NULL DEFAULT '1' , 
    PRIMARY KEY (`registrovany`, `konference`)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_czech_ci; 

-- tabulka pro konf&rooms
CREATE TABLE `davidmichali6241`.`iis-conf&rooms` (
    `cid` INT NOT NULL , 
    `rid` INT NOT NULL , 
    PRIMARY KEY (`cid`, `rid`)
) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_czech_ci; 



-- RELACE MEZI TABULKAMA --

ALTER TABLE `iis_time` ADD CONSTRAINT `rozvrh-prezentace` FOREIGN KEY (`pid`)               -- rozvrh -> -prezentace
REFERENCES `iis_prez`(`pid`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `iis_time` ADD CONSTRAINT `rozvrh-mistnost` FOREIGN KEY (`rid`)                 -- rozvrh --> mistnost
REFERENCES `iis_rooms`(`rid`) ON DELETE CASCADE ON UPDATE CASCADE; 

ALTER TABLE `iis_prez` ADD  CONSTRAINT `prezentace-uzivatel` FOREIGN KEY (`prednasejici`)   -- prezentace --> uzivatel
REFERENCES `iis_users`(`login`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `iis_prez` ADD CONSTRAINT `prezentace-konf` FOREIGN KEY (`konference`)           -- prezentace --> konference
REFERENCES `iis_conf`(`cid`) ON DELETE CASCADE ON UPDATE CASCADE; 

ALTER TABLE `iis-conf&rooms` ADD CONSTRAINT `iis-conf&rooms_ibfk_2` FOREIGN KEY (`rid`)     -- conf&rooms --> mistnost
REFERENCES `iis_rooms`(`rid`) ON DELETE CASCADE ON UPDATE CASCADE; 

ALTER TABLE `iis-conf&rooms` ADD CONSTRAINT `iis-conf&rooms_ibfk_1` FOREIGN KEY (`cid`)      -- conf&rooms --> konference
REFERENCES `iis_rooms`(`cid`) ON DELETE CASCADE ON UPDATE CASCADE; 

ALTER TABLE `iis_conf` ADD CONSTRAINT `Konference-uzivatel` FOREIGN KEY (`poradatel`)        -- conference --> uzivatel
REFERENCES `iis_users`(`login`) ON DELETE CASCADE ON UPDATE CASCADE; 

ALTER TABLE `iis_rezerv` ADD CONSTRAINT `rezervace-uzivatel` FOREIGN KEY (`registrovany`)     -- registrace --> uzivatel
REFERENCES `iis_users`(`login`) ON DELETE CASCADE ON UPDATE CASCADE; 

ALTER TABLE `iis_rezerv` ADD CONSTRAINT `rezervace-konference` FOREIGN KEY (`konference`)     -- rezervace --> konference
REFERENCES `iis_conf`(`cid`) ON DELETE CASCADE ON UPDATE CASCADE; 

