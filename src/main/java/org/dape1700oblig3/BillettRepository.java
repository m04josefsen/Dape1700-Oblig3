package org.dape1700oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.spel.ast.BeanReference;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.logging.Logger;

@Repository
public class BillettRepository {

    private static final Logger logger = Logger.getLogger(BillettRepository.class.getName());


    @Autowired
    private JdbcTemplate db;

    public boolean lagreBillett(Billett inn) {
        String sql = "INSERT INTO Billett (film, antall, fornavn, etternavn, telefonnr, epost) VALUES (?, ?, ?, ?, ?, ?)";
        try {
            db.update(sql, inn.getFilm(), inn.getAntall(), inn.getFornavn(), inn.getEtternavn(), inn.getTelefonnr(), inn.getEpost());
            return true;
        } catch (Exception e) {
            logger.severe("Feil i lagreBillett: " + e);
            return false;
        }
    }

    public List<Billett> hentBillett() {
        String sql = "SELECT * FROM Billett ORDER BY etternavn ASC";
        List<Billett> alleBilletter = db.query(sql, new BeanPropertyRowMapper(Billett.class));
        return alleBilletter;
    }

    public boolean slettBillett() {
        String sql = "DELETE FROM Billett";
        try {
            db.update(sql);
            return true;
        } catch (Exception e) {
            logger.severe("Feil i slettBillett: " + e);
            return false;
        }
    }

    public Billett hentEnBillett(int id) {
        String sql = "SELECT * FROM Billett WHERE id = ?";
        return db.queryForObject(sql, BeanPropertyRowMapper.newInstance(Billett.class), id);
    }

    public void oppdaterEnBillet(Billett innBillett) {
        String sql = "UPDATE Billett SET film = ?, antall = ?, fornavn = ?, etternavn = ?, telefonnr = ?, epost = ? WHERE id = ?";
        db.update(sql, innBillett.getFilm(), innBillett.getAntall(), innBillett.getFornavn(), innBillett.getEtternavn(), innBillett.getTelefonnr(), innBillett.getEpost(), innBillett.getId());
    }

    public void slettEnBillett(int id) {
        String sql = "DELETE FROM Billett WHERE id = ?";
        db.update(sql, id);
    }
}
