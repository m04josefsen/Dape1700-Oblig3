package org.dape1700oblig3;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BillettRepository {

    @Autowired
    private JdbcTemplate db;

    public void lagreKunde(Billett inn) {
        String sql = "INSERT INTO Billett (film, antall, fornavn, etternavn, telefonnr, epost) VALUES (?, ?, ?, ?, ?, ?)";
        db.update(sql, inn.getFilm(), inn.getAntall(), inn.getFornavn(), inn.getEtternavn(), inn.getTelefonnr(), inn.getEpost());
    }

    public List<Billett> hentKunder() {
        String sql = "SELECT * FROM Billett";
        List<Billett> alleKunder = db.query(sql, new BeanPropertyRowMapper(Billett.class));
        return alleKunder;
    }

    public void slettKunder() {
        String sql = "DELETE FROM Billett";
        db.update(sql);
    }
}
