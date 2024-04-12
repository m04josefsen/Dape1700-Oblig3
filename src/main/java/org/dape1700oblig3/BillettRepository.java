package org.dape1700oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.logging.ErrorManager;

@Repository
public class BillettRepository {

    ErrorManager logger;

    @Autowired
    private JdbcTemplate db;

    public boolean lagreBillett(Billett inn) {
        String sql = "INSERT INTO Billett (film, antall, fornavn, etternavn, telefonnr, epost) VALUES (?, ?, ?, ?, ?, ?)";
        try {
            db.update(sql, inn.getFilm(), inn.getAntall(), inn.getFornavn(), inn.getEtternavn(), inn.getTelefonnr(), inn.getEpost());
            return true;
        } catch (Exception e) {
            logger.error("Feil i lagreBillett: " + e);
            return false;
        }
    }

    public List<Billett> hentBillett() {
        String sql = "SELECT * FROM Billett ORDER BY etternavn ASC";
        List<Billett> alleBilletter = db.query(sql, new BeanPropertyRowMapper(Billett.class));
        return alleBilletter;
    }

    public void slettBillett() {
        String sql = "DELETE FROM Billett";
        db.update(sql);
    }
}
