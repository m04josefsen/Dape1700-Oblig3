CREATE TABLE Billett
(
    id int AUTO_INCREMENT NOT NULL,
    film varchar(255) NOT NULL,
    antall int NOT NULL,
    fornavn varchar(255) NOT NULL,
    etternavn varchar(255) NOT NULL,
    telefonnr int NOT NULL,
    epost varchar(255) NOT NULL,
    PRIMARY KEY(id)
);